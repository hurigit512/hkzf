import React from "react"

import "./map.css"

const BMap = window.BMap
console.log(BMap)
export default class map extends React.Component {
  componentDidMount() {
    //创建百度对象，参数：表示地图容器ID值
    const map = new BMap.Map('container')
    // 地图的坐标
    const point = new BMap.Point(121.61833152747242, 31.040108832402957)
  //控件
   map.addControl(new BMap.MapTypeControl()); 
    // 地图坐标初始化
    map.centerAndZoom(point, 18)
  }

  render() {
    return (
      <div className="map">
        {/* 地图容器： */}
        <div id="container" className="container" />
      </div>
    )
  }
}