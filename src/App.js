//根组件   配置路由

// 导入react组件
import React from 'react'

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

//导入页面组件
import Home from "./pages/Home/home.js"
import CityList from "./pages/CityList/CityList.js"
import Map from "./pages/Map/map.js"



//创建组件App
const App = () => {
  return (
    <Router>
      <div className="App">

        {/* 设置路由   最外层路由设置 */}
          {/* 路由定向需要导入Redirect； 需要加精准路由exact  */}

         <Route exact path="/" render={()=><Redirect to="/home"/>}/>
        {/* 首页 */}
        <Route path="/home" component={Home} />
         {/* 城市你选择页面 */}
        <Route path="/CityList" component={CityList} />
        {/* 地图页面 */}
          <Route path="/map" component={Map} />
      </div>
    </Router>
  )
}
//导出组件
export default App