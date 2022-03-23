# vue use

## vue使用less-loader出现TypeError:this.getOptions is not a function的错误解决

当我们直接去安装less-loader模块之后，可能会出现下面的错误，

<a data-fancybox title="错误信息图片：" href="https://img-blog.csdnimg.cn/20210512163333510.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxMTA4OTcy,size_16,color_FFFFFF,t_70">![错误信息图片：](https://img-blog.csdnimg.cn/20210512163333510.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxMTA4OTcy,size_16,color_FFFFFF,t_70)</a>

那么这个原因是我们直接 npm install less-loader 的时候，下载的版本太高，无法去兼容 getOptions 函数方法，这个时候只需要把版本降级就好了。这个就会发现已经是不会有报错的。
