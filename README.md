# easyPagination
## what

一个简单的分页js，简单配置后即可使用

## how

- 在新建页面中引入css中的easyPagination.css和js文件中的easyPagination.js
- 创建
 ```
 <div id='easyPagination'>
 </div>
 ``` 
 - 初始化配置
 ```
  easyPagination.init();
  你也可以自己配置相关的数据
  easyPagination.init({
        model: 'link',//模式分为link和click 模式，link 为直接跳转，click你可以自己设置clickType函数进行自定义跳转
        hrefPrev:'pagePre_',//跳转链接前部的设置
        hrefLatter:'_pageLast'//跳转链接后部设置 ，通过这两个设置我们会得到pagePre_n_pageLast n为跳转页数
        showHeader: true,//是否设置向前和首页按钮
        clickType: function (n) {
            console.log(n + '1123');//click模式下可以用
        }，
        lang:{
        语言包。自己看着用
        }
    });
  ```
  - 给出的index.html测试可用
  
   ![image](https://github.com/henrY2Young/easyPagination/blob/master/test.png)
