import React from "react"
import ReactDOM from "react-dom"

//第三方组件库样式
import 'antd-mobile/dist/antd-mobile.css'

// 导入字体图标库的样式
import './assets/fonts/iconfont.css'

// 公共样式
import "./base.css"


//导入根组件
import App from "./App"



//根组件渲染
ReactDOM.render(<App />,document.getElementById("root"))