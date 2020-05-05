module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui", // 
        "styleLibraryName": "theme-chalk" // 组件样式
      }
    ]
  ]
}
