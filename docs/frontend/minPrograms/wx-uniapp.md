# 微信小程序转 uniapps

1. 利用 minprogram-to-uniapp 迁移代码
2. 处理一些常见错误，例如：this.data.xxx -> this.xxx
3. 重写页面和组件的一些东西
4. 封装请求

## 重新封装页面和组件

- 为了更好地快速适配小程序，将页面和组件做了一定的封装。

```js
export const MaiPage = function (config) {
  const vueProperties = [
    'data',
    'created',
    'methods',
    'preLoad',
    'preUnload',
    'install',
    'onLoad',
    'onUnload',
    'onShow',
    'onHide',
    'onShareAppMessage',
  ];

  config.preLoad = [];
  config.preUnload = [];
  config.components = {};
  const { onLoad = () => {}, onUnload = () => {}, onShow = () => {}, onHide = () => {} } = config;

  for (const module of modules) {
    if (module.install) {
      module.install({
        page: config,
        app: appCtx,
      });
    }
  }

  const methods = {};
  for (const property in config) {
    if (vueProperties.includes(property)) {
      continue;
    }
    const propertyValue = config[property];
    if (typeof propertyValue === 'function') {
      methods[property] = propertyValue;
    }
  }
  config.methods = methods;

  const dataObject = config.data;
  const dataFunction = function () {
    const allData = {
      navigationBarHeight,
      statusBarHeight,
      productImageMode,
      themeVars: '',
      pageColorStyle: '',
      themeColor: '',
      mainColor: 'main-color',
      mainBorderColor: 'main-border-color',
      mainBgColor: 'main-bg-color',
      mainCaretColor: 'main-caret-color',
      mainBgColorOpacity1: 'main-bg-color-opacity-1',
      mainBgColorOpacity2: 'main-bg-color-opacity-2',
      mainBgColorOpacity5: 'main-bg-color-opacity-5',
      subColor: 'sub-color',
      subBgColor: 'sub-bg-color',
    };
    Object.assign(allData, dataObject);
    return allData;
  };
  config.data = dataFunction;

  config.onLoad = async function (options) {
    // 记录扫码进入的页面
    if (options.scene) {
      const routes = getCurrentPages();
      const { route } = routes[routes.length - 1];
      Setting._options.scanQrcodePage = route;
    } else {
      delete Setting._options.scanQrcodePage;
    }

    this.options = options;
    config.hasLoaded = false;
    const splashPath = Engine.getSplashPage();

    // #ifndef MP_TOUTIAO || MP-WEIXIN
    // if (appCtx.pageScene !== 1154 && this.route !== splashPath && !mai.member?.getOpenId()) {
    if (this.route !== splashPath && !mai.member.getOpenId()) {
      const redirectUrl = `/${this.route}?${qs.stringify(options)}`; // eslint-disable-next-line no-console

      // eslint-disable-next-line no-console
      console.debug(`no oauth url, redirect to: ${redirectUrl}`);
      MaiUNI.redirectTo({
        url: `/${splashPath}?redirectUrl=${encodeURIComponent(redirectUrl)}`,
      });
      return;
    } // 统一处理扫码逻辑
    // #endif

    const qrCodeDetail = await Setting.getOptions(options.scene);
    const qrCodeOptions = qrCodeDetail.options; // 将 B 类码携带的 UTM 参数设置到 maijs

    mai.memberEvent.setUtmProperties(qrCodeOptions);

    // eslint-disable-next-line no-param-reassign
    options = { ...qrCodeOptions, ...options }; // 从不同的门店进来时需要将缓存的门店清除

    // if (options.storeId && Stores.getStoreId() !== options.storeId) {
    //   Stores.setCurrentStore({});
    // }
    // deleted

    const themeColors = await getThemeColors();
    if (themeColors) {
      this.setData({ ...themeColors });
    }

    this.setData({
      currency: Setting.getCurrency(),
      i18n: Setting.replaceSpecificText(this.i18n),
    });
    if (typeof this.getTabBar === 'function') {
    // eslint-disable-next-line no-unused-expressions
    this.getTabBar()?.refresh();
    }

    for (const key of Object.keys(options)) {
      options[key] = decodeURIComponent(options[key]);
    }

    for (const preLoad of config.preLoad) {
      preLoad.call(this, options);
    }

    const params = MaiUNI._routeData[this.__route__]; // this.route 没有，改为 this.__route__。如后续该属性变更导致无法获取到参数，再做更改

    const newOptions = _.merge(options, params);

    this.options = newOptions;

    // eslint-disable-next-line no-console
    console.log('----------Options', newOptions);
    config.hasLoaded = true;
    onLoad.call(this, newOptions);

    // eslint-disable-next-line no-console
    console.debug('Page.Load', {
      routeData: MaiUNI._routeData,
      params,
      path: this.__route__,
      options: newOptions,
    });
  };

  config.onShow = function (options) {
    const params = MaiUNI._routeData[this.__route__];

    const newOptions = _.merge(options, params);

    let timer = null; // 由于 onLoad 中有异步请求，确保 onShow 在 onLoad 之后执行

    const polling = () => {
      if (!config.hasLoaded) {
        timer = setTimeout(() => {
          polling();
        }, 100);
        return;
      }

      onShow.call(this, newOptions);
      clearTimeout(timer);
    };

    polling();

    // eslint-disable-next-line no-console
    console.debug('Page.onShow', {
      routeData: MaiUNI._routeData,
      params,
      path: this.__route__,
      options: newOptions,
    });
  };

  //   config.onHide = function (options) {
  //     delete MaiUNI._routeData[this.__route__];
  //     onHide.call(this, options);
  //   };
  config.onHide = function (options) {
    if (this.__route__ !== 'mall/pages/bind-phone/index') {
      Setting._phoneBindStatus = '';
    }
    if (_.isNumber(config._maiLastViewedAt)) {
      mai.memberEvent.traffic.logPageLeave({
        durationInSeconds: Math.round((moment().valueOf() - config._maiLastViewedAt) / 1000),
      });
      config._maiLastViewedAt = null;
    }
    delete MaiUNI._routeData[this.route];
    onHide.call(this, options);
  };

  config.onUnload = function (options) {
    if (this.__route__ !== 'mall/pages/bind-phone/index') {
      Setting._phoneBindStatus = '';
    } // new
    config._maiLastViewedAt = null; // new
    for (const preUnload of config.preUnload) {
      preUnload.call(this, options);
    }

    if (onUnload) {
      onUnload.call(this, options);
    }
  };

  config.onLoad.bind(this); // 判断上滑/下滑，swipeUp: true 为上滑

  config.methods.onTouchStart = function ({ changedTouches }) {
    this.lastClientY = changedTouches[0].clientY;
  };

  config.methods.onTouchEnd = function ({ changedTouches }) {
    const { lastClientY } = this;
    const { clientY } = changedTouches[0];

    if (Math.abs(clientY - lastClientY) > 20) {
      this.setData({
        swipeUp: clientY < lastClientY,
      });
    }

    clearTimeout(this.swipeTimer); // 1s 没有操作则认为静止状态，恢复默认值

    this.swipeTimer = setTimeout(() => {
      this.setData({
        swipeUp: false,
      });
    }, 1000);
  };

  if (config.onShareAppMessage) {
    const { onShareAppMessage } = config;

    config.onShareAppMessage = function (options) {
      const { path, title, query = {}, imageUrl } = onShareAppMessage.call(this, options);
      let result = null; // 如果页面中的 onShareAppMessage 返回空对象，则分享小程序首页

      if (!path && !title && !imageUrl) {
        result = Setting.getDefaultShareConf(defaultShareQuery);
      } else {
        query.inviterMemberId = mai.member.getMemberId();
        query.inviterOpenId = mai.member.getOpenId();
        query.inviterName = mai.member.getNickname();
        query.promoterMemberId = mai.member.getMemberId();
        query.accountId = Engine.getMaiAccountId();

        const newQuery = _.merge(query, defaultShareQuery);

        for (const key of Object.keys(newQuery)) {
          if (newQuery[key] === undefined || newQuery[key] === null) {
            delete newQuery[key];
          }
        }

        const queryString = qs.stringify(newQuery, `${path}?`);
        result = {
          title,
          imageUrl,
          path: queryString,
        };
      }

      result.path = getShareCustomizePath(result.path);

      // eslint-disable-next-line no-console
      console.debug('onShareAppMessage result', result);
      logPageShare({ ...result, ...options });
      return result;
    };
  } else {
    config.onShareAppMessage = function (options) {
      const result = Setting.getDefaultShareConf(defaultShareQuery);
      result.path = getShareCustomizePath(result.path);

      // eslint-disable-next-line no-console
      console.debug('onShareAppMessage result', result);
      logPageShare({ ...result, ...options });
      return result;
    };
  }

  return config;
};
export const MaiComponent = function (config) {
  config.preAttached = [];
  config.preDetached = [];
  config.props = config.properties;

  const dataObject = config.data;
  const dataFunction = function () {
    const allData = {
      navigationBarHeight,
      statusBarHeight,
      productImageMode,
      themeVars: '',
      pageColorStyle: '',
      themeColor: '',
      mainColor: 'main-color',
      mainBorderColor: 'main-border-color',
      mainBgColor: 'main-bg-color',
      mainCaretColor: 'main-caret-color',
      mainBgColorOpacity1: 'main-bg-color-opacity-1',
      mainBgColorOpacity2: 'main-bg-color-opacity-2',
      mainBgColorOpacity5: 'main-bg-color-opacity-5',
      subColor: 'sub-color',
      subBgColor: 'sub-bg-color',
    };
    Object.assign(allData, dataObject);
    return allData;
  };
  config.data = dataFunction;

  const props = {};
  const properties = config.properties || {};
  Object.keys(properties).forEach((_) => {
    props[_] = {
      ...properties[_],
      default: properties[_].value,
    };
    const { observer } = properties[_];
    if (observer && typeof observer === 'function') {
      config.watch = config.watch || {};
      config.watch[_] = {
        handler: properties[_].observer,
        deep: properties[_].deep || false,
        immediate: true,
      };
    }
  });
  config.props = props;

  const { attached, detached } = config;

  for (const module of modules) {
    if (module.install) {
      module.install({
        component: config,
        app: appCtx,
      });
    }
  }

  config.mounted = async function () {
    const themeColors = await getThemeColors();
    if (themeColors) {
      this.setData({ ...themeColors });
    }
    console.log('=====================>config.preAttached', config.preAttached);
    for (const preAttached of config.preAttached) {
      preAttached.call(this);
    }

    if (attached) {
      attached.call(this);
    }
  };

  config.unmounted = function () {
    for (const preDetached of config.preDetached) {
      preDetached.call(this);
    }

    if (detached) {
      detached.call(this);
    }
  };

  config.methods = config.methods || {};
  config.methods.triggerEvent = function (eventName, eventParams, event) {
    // eslint-disable-next-line no-console
    console.log('========= positioning triggerEvent', eventName);
    this.$emit(eventName, { detail: eventParams, event });
  };

  return config;
};
```
