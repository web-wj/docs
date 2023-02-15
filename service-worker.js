/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "dfb5ebaf46250a9f643e51b05d2a9782"
  },
  {
    "url": "assets/css/0.styles.d2cb8686.css",
    "revision": "048aa0422cec1436a39be01bb2dc8f25"
  },
  {
    "url": "assets/img/block-tree1.a594ffde.png",
    "revision": "a594ffde169b6c52cbef1771f6517a09"
  },
  {
    "url": "assets/img/block-tree2.cc4c279b.png",
    "revision": "cc4c279b7aa21857499d2283e855d62b"
  },
  {
    "url": "assets/img/cache1.51974299.png",
    "revision": "51974299a81b20d5b04e1384e8e472af"
  },
  {
    "url": "assets/img/cache2.f7247369.png",
    "revision": "f724736970eb8022aa366d2bcf2daf38"
  },
  {
    "url": "assets/img/cache3.b1f1be9b.png",
    "revision": "b1f1be9bda85928bb4c00bd3b2869b67"
  },
  {
    "url": "assets/img/cache4.ca7e0dbb.png",
    "revision": "ca7e0dbbda1930ed57ca99933d7d945d"
  },
  {
    "url": "assets/img/cache5.692bffb8.png",
    "revision": "692bffb899c466653c44d2b283f0668d"
  },
  {
    "url": "assets/img/chunk-assets.71b92a8b.png",
    "revision": "71b92a8ba4f13029f43a5200b25d4eb2"
  },
  {
    "url": "assets/img/chunk-assets2.a2749993.png",
    "revision": "a27499936776a854bacdcd0817820b19"
  },
  {
    "url": "assets/img/chunk-hash.c6f7a04b.png",
    "revision": "c6f7a04b4b190f9a755a6e18cc7d02dc"
  },
  {
    "url": "assets/img/chunks.f31fc40e.png",
    "revision": "f31fc40ee92e5c4aeff72635a382be06"
  },
  {
    "url": "assets/img/chunks2.0cf79306.png",
    "revision": "0cf793068c62a1a71d17ead977088e90"
  },
  {
    "url": "assets/img/clipboard.ca153dc5.png",
    "revision": "ca153dc5cf1dfc0805af2b4ce338946b"
  },
  {
    "url": "assets/img/error1.6b23ea87.png",
    "revision": "6b23ea876277b9ee5862f0444877d5b9"
  },
  {
    "url": "assets/img/error2.808d15cc.png",
    "revision": "808d15ccdfb03142a33e5acc414da87f"
  },
  {
    "url": "assets/img/gzip1.8fb3e5bc.png",
    "revision": "8fb3e5bc3d230ddf14240dc31e258d8c"
  },
  {
    "url": "assets/img/gzip2.7e700ea9.png",
    "revision": "7e700ea9fb937b12953c124288d46fe1"
  },
  {
    "url": "assets/img/hmr1.3b23c829.png",
    "revision": "3b23c829e210c403f510cd00dd28806f"
  },
  {
    "url": "assets/img/hmr2.85a0d873.png",
    "revision": "85a0d8734ad9aac2cc8371f2da5f9ca2"
  },
  {
    "url": "assets/img/https.01168c2f.png",
    "revision": "01168c2fd4ae655f6c2c24c8835a346b"
  },
  {
    "url": "assets/img/https2.92cad70c.png",
    "revision": "92cad70c5866335fc3444d8f28365b78"
  },
  {
    "url": "assets/img/https3.e29d0462.png",
    "revision": "e29d046252d4bbe692f4c298fd167977"
  },
  {
    "url": "assets/img/https4.a13ee18c.png",
    "revision": "a13ee18cec26166dd32d766b77aebf49"
  },
  {
    "url": "assets/img/loaders.d43fb4cd.png",
    "revision": "d43fb4cd92ce2d9a6aedd5fb6cd55003"
  },
  {
    "url": "assets/img/output.ec041911.png",
    "revision": "ec041911eb4c03dd395a6bce394f859f"
  },
  {
    "url": "assets/img/patchflag.4bd07f3e.png",
    "revision": "4bd07f3e89a3a5305e1ff02f87f889de"
  },
  {
    "url": "assets/img/plugin1.cf3be9c0.png",
    "revision": "cf3be9c0bc3210af6d0381bf163fbf86"
  },
  {
    "url": "assets/img/plugin2.238d5e6d.png",
    "revision": "238d5e6da4c379f6a0bafb0dfbe9332e"
  },
  {
    "url": "assets/img/res1.5944090a.png",
    "revision": "5944090a90a9f30de69e3be0d42adc89"
  },
  {
    "url": "assets/img/res2.f31fc40e.png",
    "revision": "f31fc40ee92e5c4aeff72635a382be06"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/img/subcontract1.ef8e646e.png",
    "revision": "ef8e646e1ff69b9465a62083dad3d4fc"
  },
  {
    "url": "assets/img/v-model.0e2af74d.png",
    "revision": "0e2af74d063829482d989f145fb0145c"
  },
  {
    "url": "assets/img/vite.141cf0b0.png",
    "revision": "141cf0b0c92e856120008661fc082bd7"
  },
  {
    "url": "assets/img/vue2-vnode.d7afdc47.png",
    "revision": "d7afdc471779dbccf9a1ddf833ba5406"
  },
  {
    "url": "assets/img/vue2-vue3.caf0d50e.png",
    "revision": "caf0d50e9e6316bb69a9b62b16421daa"
  },
  {
    "url": "assets/img/vue3-vnode.b3bc8172.png",
    "revision": "b3bc81728a15df9e4f2b909b4cdc9ba1"
  },
  {
    "url": "assets/img/webpack.3a2cd108.png",
    "revision": "3a2cd108966dc64d6413b859f4f585e4"
  },
  {
    "url": "assets/js/10.9e342d30.js",
    "revision": "b3ee64654c71c5edf88cae91f6867748"
  },
  {
    "url": "assets/js/11.f40a53da.js",
    "revision": "4ad84e2b7844742f3ae477111debfa3c"
  },
  {
    "url": "assets/js/12.16498b95.js",
    "revision": "c9ac6550d981fbb1c56ab21a71de6599"
  },
  {
    "url": "assets/js/13.b3f6806f.js",
    "revision": "1b1d2f406e6fee8f859e823673589b1a"
  },
  {
    "url": "assets/js/14.cdfce6cd.js",
    "revision": "006ed337faea13288cb0605ae387ffc9"
  },
  {
    "url": "assets/js/15.56907925.js",
    "revision": "e1e22758d05da73d08020a9a074a46b5"
  },
  {
    "url": "assets/js/16.4ddad054.js",
    "revision": "95df3ac827879ef0c88a05430a83348e"
  },
  {
    "url": "assets/js/17.3540b6fb.js",
    "revision": "4de384a747796499481533e75d289301"
  },
  {
    "url": "assets/js/18.79300792.js",
    "revision": "acb1dd8f73f53701d815a4cb45473b9c"
  },
  {
    "url": "assets/js/19.03ad5bb0.js",
    "revision": "ecb78533186b974869fda9739498c088"
  },
  {
    "url": "assets/js/2.ce1bac44.js",
    "revision": "24a65b84d3b887370105063582a09e77"
  },
  {
    "url": "assets/js/20.ded21212.js",
    "revision": "109e201fed0846bd94cce84d1d51762d"
  },
  {
    "url": "assets/js/21.e657d943.js",
    "revision": "eb85961b602e3ff2b0eb892f0c1af9dc"
  },
  {
    "url": "assets/js/22.a7839767.js",
    "revision": "9fa092be6b78783d6aff495ca69cbbe0"
  },
  {
    "url": "assets/js/23.a8f18f0b.js",
    "revision": "5b7d63b0cc05c0c9e65d66bdbf2b6cf5"
  },
  {
    "url": "assets/js/24.c9254768.js",
    "revision": "6219b8f6856bf1d414aba3b98bc0adf1"
  },
  {
    "url": "assets/js/25.d08eb9b8.js",
    "revision": "101186a5d48cabc11add478d480f7554"
  },
  {
    "url": "assets/js/26.16666ea5.js",
    "revision": "aab601c810bb0b0bd40fdb76ae37ad95"
  },
  {
    "url": "assets/js/27.5acfebc6.js",
    "revision": "af5b3599bb9fca1daa56686d06f747e0"
  },
  {
    "url": "assets/js/28.ebe9596b.js",
    "revision": "3d8f3f439cb8d24dbc524e6d259044ca"
  },
  {
    "url": "assets/js/29.47fa60b8.js",
    "revision": "c3b3152fc68ec481d7c9e49d8b048ff8"
  },
  {
    "url": "assets/js/3.de591152.js",
    "revision": "ce6986242ba559871cedee20a820926d"
  },
  {
    "url": "assets/js/30.3d29431d.js",
    "revision": "92fb946668bd25a9988339d1ab965745"
  },
  {
    "url": "assets/js/31.1eabdbb0.js",
    "revision": "ff3464292902886c96b8a650df87004d"
  },
  {
    "url": "assets/js/32.9005245e.js",
    "revision": "b0c56957fc91243fed4bd83219825920"
  },
  {
    "url": "assets/js/33.b62a5685.js",
    "revision": "ea8c30224aecd99b2b1a7c0046598db2"
  },
  {
    "url": "assets/js/34.8c2c84ea.js",
    "revision": "24d648d411e95e1a051207d893aa0d3f"
  },
  {
    "url": "assets/js/35.9336b5cb.js",
    "revision": "94db9a1c699e9d4d7501737e92c3e437"
  },
  {
    "url": "assets/js/36.97a3cc76.js",
    "revision": "1deb8fded9c4bc71d662b6ec44bac3e3"
  },
  {
    "url": "assets/js/37.66398741.js",
    "revision": "bfc4239a4ca4a97bdfcc86ff60cbe476"
  },
  {
    "url": "assets/js/38.9d8de1d8.js",
    "revision": "486a8f1d949f950882750cc9401cac5f"
  },
  {
    "url": "assets/js/39.8f67c036.js",
    "revision": "bdc3738c90fc51fd8ed648c56d520045"
  },
  {
    "url": "assets/js/4.f5f9c22c.js",
    "revision": "b5886ef206e08db5daad66dbedad4a1d"
  },
  {
    "url": "assets/js/40.e98a9424.js",
    "revision": "db0724d67a1240114d7c51a0f8b1e3f1"
  },
  {
    "url": "assets/js/41.226b689f.js",
    "revision": "d9a8bee30aecb98e76081921e92890d4"
  },
  {
    "url": "assets/js/42.6d8e3c92.js",
    "revision": "6c9201b0730a6d4bf545dcbb8c167eec"
  },
  {
    "url": "assets/js/43.b09bfbcd.js",
    "revision": "9d98210da45f98cc13d62c78cc1c28fa"
  },
  {
    "url": "assets/js/44.110861cb.js",
    "revision": "22ae8bfc94f922053cb183b70e2c1432"
  },
  {
    "url": "assets/js/45.1361df68.js",
    "revision": "8a67ff03370dc622243e5b2232f68107"
  },
  {
    "url": "assets/js/46.0825a84a.js",
    "revision": "1176802363a43624b7166c93386905a9"
  },
  {
    "url": "assets/js/47.7eed1a37.js",
    "revision": "4dd4ed3c2c02be6d9d73747aba2cb2b8"
  },
  {
    "url": "assets/js/48.314fd5a1.js",
    "revision": "3c658c19649771b2fa37a4631ce5da12"
  },
  {
    "url": "assets/js/49.09c0dc2c.js",
    "revision": "69786e03a8336802b0a5d03d797a2bf4"
  },
  {
    "url": "assets/js/5.bc5eb3ee.js",
    "revision": "30f71d0c06e536d02dde1e82c6d13ac6"
  },
  {
    "url": "assets/js/50.14490fbe.js",
    "revision": "28ed9a705336c3d9807483aef13f74ea"
  },
  {
    "url": "assets/js/51.10b8fc7a.js",
    "revision": "c58631676c8cabde06adcec6220f8528"
  },
  {
    "url": "assets/js/52.a3add2d1.js",
    "revision": "958669106a41fae6cabd63c19af68123"
  },
  {
    "url": "assets/js/53.c4ce192c.js",
    "revision": "fa40f38edd1a73142ea76637f684e41a"
  },
  {
    "url": "assets/js/54.5cd22bdd.js",
    "revision": "74aa6b6affe1c729d36eb40207f54e0c"
  },
  {
    "url": "assets/js/55.9fe70fbb.js",
    "revision": "f2edeec5bbab28f2ffb3756f6fbfe8fb"
  },
  {
    "url": "assets/js/56.829f69ec.js",
    "revision": "2ab263ce6290b7b1d86732107dd6a56b"
  },
  {
    "url": "assets/js/57.97f358a1.js",
    "revision": "4d6c65f39f12c414a29fb21db43158a2"
  },
  {
    "url": "assets/js/58.11cbfa72.js",
    "revision": "ded443bd9f32211f710c03eeb60b9da8"
  },
  {
    "url": "assets/js/59.8200c4ed.js",
    "revision": "aef6a87c12bfd667e90e90ac1efe094f"
  },
  {
    "url": "assets/js/6.232177ed.js",
    "revision": "81622b49d6f3c324a150a2872b7e4346"
  },
  {
    "url": "assets/js/60.db894496.js",
    "revision": "744f8c95ae26810e7712708d9083b213"
  },
  {
    "url": "assets/js/61.d80fbdff.js",
    "revision": "3abd572d96f4f44244829c36d5d44bb5"
  },
  {
    "url": "assets/js/62.2a66782f.js",
    "revision": "af1ba3c873b3fe0451e0070496eada3d"
  },
  {
    "url": "assets/js/7.f3e6aa45.js",
    "revision": "2a8959bd27a149d720dbad44342ee5f9"
  },
  {
    "url": "assets/js/8.78886e18.js",
    "revision": "52f6ee5ef475f1f94f0bf9b4b3f8f6ae"
  },
  {
    "url": "assets/js/9.de6828aa.js",
    "revision": "58704cdbefbeb6d5a4fb8bcead876c29"
  },
  {
    "url": "assets/js/app.84b26931.js",
    "revision": "23f708b4a7382b38d3f6cf2ed9cd166d"
  },
  {
    "url": "backend/NodeJs/express.html",
    "revision": "d4b633fecf505fc569ad85ecea8e9eba"
  },
  {
    "url": "backend/NodeJs/index.html",
    "revision": "338baf038452b96cd2549570fbd81ea8"
  },
  {
    "url": "backend/服务端渲染/index.html",
    "revision": "65867bf140e3664a17e9e22a760994c6"
  },
  {
    "url": "frontend/ES6/index.html",
    "revision": "b97a4d924d90d5673828870b1b3e4877"
  },
  {
    "url": "frontend/ES6/promise.html",
    "revision": "8ab93e0f87002d5cbd7cc24ee0a32bdf"
  },
  {
    "url": "frontend/HTML&CSS/index.html",
    "revision": "3feb5a629e59abaaf4af1dfd44c5be6f"
  },
  {
    "url": "frontend/HTML5&CSS3/index.html",
    "revision": "22284bbcdbb6702e29d7be23b1f3a787"
  },
  {
    "url": "frontend/HTML5&CSS3/stylus.html",
    "revision": "531ba6632ce69d759b3442927b3d2648"
  },
  {
    "url": "frontend/JavaScript/index.html",
    "revision": "5f5d7be00b8a948a65bb4459a5b0d017"
  },
  {
    "url": "frontend/JavaScript/throttled&debounce.html",
    "revision": "24a60471f1f615717e4433094c3fa970"
  },
  {
    "url": "frontend/minPrograms/index.html",
    "revision": "21c51649918e95375090b238bb0c00a6"
  },
  {
    "url": "frontend/minPrograms/tabbar&navigator-bar.html",
    "revision": "dfa12cc5b188295769added20c4c0d44"
  },
  {
    "url": "frontend/minPrograms/uniapp.html",
    "revision": "e74071d47227d9a54a44479727562dae"
  },
  {
    "url": "frontend/minPrograms/wx-uniapp.html",
    "revision": "2a20a6a4918b5228708bfd1241b68cbc"
  },
  {
    "url": "frontend/Network/http-https.html",
    "revision": "ea85d1b7ec1e252e4677d6e872f4b175"
  },
  {
    "url": "frontend/Network/index.html",
    "revision": "17e9995ee2459ff49ff929b6cba9648a"
  },
  {
    "url": "frontend/Network/JWT.html",
    "revision": "e031876d40c095d12a3494507790d2a5"
  },
  {
    "url": "frontend/Network/websocket.html",
    "revision": "87120f4c372e5b653f6d195092498fef"
  },
  {
    "url": "frontend/Network/鉴权.html",
    "revision": "bf99e260b245e2faf2480ee7f0af16f0"
  },
  {
    "url": "frontend/ng1/index.html",
    "revision": "06b9f9053f0d8483145617c59440fa6d"
  },
  {
    "url": "frontend/react/index.html",
    "revision": "7bbd8468c196a69c3c4471c019812322"
  },
  {
    "url": "frontend/TypeScript/index.html",
    "revision": "a1d21d12f249b8e847523670e9b77a3f"
  },
  {
    "url": "frontend/VUE/ES6 module.html",
    "revision": "7aa869492614c96a5ce1dd2c96b25c9f"
  },
  {
    "url": "frontend/VUE/index.html",
    "revision": "daac4c44b61332fd4573830e5d056fc8"
  },
  {
    "url": "frontend/VUE/vue2.html",
    "revision": "d9fd041860fc31b015162b2724d2b664"
  },
  {
    "url": "frontend/VUE/vue3.html",
    "revision": "540e303e9732d1b9bb12bed0861591dd"
  },
  {
    "url": "frontend/VUE/vuex.html",
    "revision": "ed23db35a11b85c37d6c1810e2e4d141"
  },
  {
    "url": "frontend/VUE/权限控制.html",
    "revision": "0946b7c181523c930be51420991a1f42"
  },
  {
    "url": "frontend/webpack/commonTools.html",
    "revision": "f123292233257f14cf9e227bb29e03ae"
  },
  {
    "url": "frontend/webpack/css工程化.html",
    "revision": "657937f294dac1e851b788cf4c7eebe3"
  },
  {
    "url": "frontend/webpack/index.html",
    "revision": "547a810fa06544e17d26c869713e6111"
  },
  {
    "url": "frontend/webpack/js兼容性.html",
    "revision": "fb2264a4f40c5b5a1e7a84186e9ad205"
  },
  {
    "url": "frontend/webpack/性能优化-传输.html",
    "revision": "27ab703c6804dc595cb74dbd516a9259"
  },
  {
    "url": "frontend/webpack/性能优化-构建.html",
    "revision": "6fd1c1beb7a401cc0533ce3679fab467"
  },
  {
    "url": "frontend/webpack/性能优化-运行.html",
    "revision": "47c4e7542d5369c47c3fb200a08894f4"
  },
  {
    "url": "images/forbidden-city.jpg",
    "revision": "991ad2ae789cfcda2857b40ba5fabcd2"
  },
  {
    "url": "images/programmer.gif",
    "revision": "d0c60459431b6ffaecf92fc902ca996d"
  },
  {
    "url": "index.html",
    "revision": "b198984277b039afee8204b5d03168f7"
  },
  {
    "url": "interview/base/index.html",
    "revision": "fa79d543cf2f673ebbb70adb4ec875a3"
  },
  {
    "url": "interview/base/性能优化.html",
    "revision": "14eddcab81dddfdaa5d6cc29be04f679"
  },
  {
    "url": "interview/base/润和软件.html",
    "revision": "38ac4140b6516cc5cd9d0d63e0a0c849"
  },
  {
    "url": "interview/base/算法.html",
    "revision": "bc2a23922b37090617334467500e43d6"
  },
  {
    "url": "interview/projects/index.html",
    "revision": "8e297cfa75e95cdfe22f29552efe9ac6"
  },
  {
    "url": "reading/index.html",
    "revision": "d35b9ba5da8e23e45b7281c5e696f70b"
  },
  {
    "url": "reading/vue2.html",
    "revision": "d3f6ad2ad3965197056368492a7ca906"
  },
  {
    "url": "tools/axios/index.html",
    "revision": "0d16a38d042ac754a1f56e03dba60525"
  },
  {
    "url": "tools/cli/index.html",
    "revision": "acfb28ac14326c4d4b86da52de0350b0"
  },
  {
    "url": "tools/cli/portal-cli.html",
    "revision": "b56374fd0065a830ea21f915ec0c0fb6"
  },
  {
    "url": "tools/devtools/index.html",
    "revision": "0c27268556cf09c614840c6d5b166748"
  },
  {
    "url": "tools/GIT/index.html",
    "revision": "859038fbb6fc5574fc2e8b4cbca0b7a4"
  },
  {
    "url": "tools/linux/index.html",
    "revision": "95dbca16765cea87c87f7cbfd68c0762"
  },
  {
    "url": "tools/vscode/index.html",
    "revision": "047207a925471d4efb5da14aa8c3052b"
  },
  {
    "url": "tools/vuepress/channing-cyan.html",
    "revision": "3af26bfe8228afb9713c034beee140da"
  },
  {
    "url": "tools/vuepress/index.html",
    "revision": "5359e24fef5be82c16b5980255c04c71"
  },
  {
    "url": "tools/包管理工具/index.html",
    "revision": "9d8e5e66ca08966c0f649f302705d22e"
  },
  {
    "url": "tools/小工具/index.html",
    "revision": "ad1abffe5b10dd745c7e09b8148b35b0"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
