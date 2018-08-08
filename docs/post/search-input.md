# 快速开始  
建议docsify-cli全局安装，这有助于在本地初始化和预览网站。  
```
npm i docsify-cli -g  
```
## 下载推送  
>详细见GitLab CI/CD   

## 更新内容  
>在文件列表./docs子目录。   
- `index.html` 作为条目文件  
- `README.md`作为主页  
- `.nojekyll` 阻止GitHub页面忽略以下划线开头的文件  
>文件列表拓展：需要更多页面，只需在docsify目录中创建更多markdown文件即可。如下是此网站的大致文件构成。
```
.
└── docs
    ├── README.md
    ├── navbar.md      //设置导航栏
	├── _coverpage.md  //设置首页
    ├── _sidebar.md    //设置侧边栏
    └── post		   
        ├── zhinan.md  
        └── start.md  
	└── project       //项目文档 
        └── start.md 
	└── _media
```  
- 在project文件夹下新建markdown文件，并将此文件在_sidebar.md下路径调用。  
  例` * [指南](post/zhinan.md)`  
- [markdown书写规范参考](https://www.jianshu.com/p/c4e93e97143c)。
## 网站预览  
使用运行本地服务器docsify serve。您可以在浏览器中预览您的网站http://localhost:3000。
```
docsify serve docs
```  
有关更多用例docsify-cli,请访问官方[docsify-cli文档](https://github.com/docsifyjs/docsify-cli)。
