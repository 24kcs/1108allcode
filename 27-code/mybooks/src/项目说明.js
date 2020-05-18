/**
static 目录  静态资源,如:图片
src  程序的主入口目录
运行npm run dev   产生dist目录----微信小程序需要用到的目录
components目录放的是组件,由于开发的是微信小程序(微信的小程序使用的组件的目录是pages,所以,components目录可以不要)

App.vue中只有js和css 相当于微信小程序中的app.js和app.wxss文件
app.json就相当于微信小程序中的app.json
utils目录存放的一般都是工具类的对象或者方法(暂时无用)
pages目录和微信小程序中的pages目录一样

index目录中有三个文件:
1. index.vue----html和js和css ------微信小程序中的.wxml和.wxss和.js
2. main.js---作用:引入组件,并且实例化对象,然后挂载到主的程序中(父级组件中)
3. main.json---就相当于微信小程序中.json文件

app.json 中的pages,引入的是main

*/
