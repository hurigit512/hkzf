// 导入组件
import React from "react"
//组件导入
import { NavBar, Icon, List } from 'antd-mobile';

// 样式引入
import "./CityList.css"

// 导入axios数据
import axios from "axios"

// 导入获取定位城市数据的方法
import { getCurrentCity } from "../../utiles/mapAPI"

// 第三步：封装一个函数专门处理城市列表数据
const formatCityList = list => {
  //第四步： 创建一个空对象用于存储过滤的数据
  const cityList = {}

  //第四步： 遍历所有接口获取到的城市数据
  list.forEach(item => {
    const firstLetter = item.short.substr(0, 1)

    // 第六步： 判断对象中是否包含索引
    if (firstLetter in cityList) {
      cityList[firstLetter].push(item)
    } else {
      cityList[firstLetter] = [item]
    }
  })

  //第五步： 获取当前城市所有的索引
  const cityIndex = Object.keys(cityList).sort()

  return {
    cityList,
    cityIndex
  }
}


//创建组件
export default class CityList extends React.Component {

  //进入页面触发钩子函数
  componentDidMount() {
    this.fetchCityList()
  }

  // 第一步：获取整个页面的城市列表的所有数据
  async fetchCityList() {
    const res = await axios.get('http://localhost:8080/area/city?level=1')
    // console.log("获取所有城市列表数据", res)

    //第二步：拿到所有城市列表的数据进行处理  写方法
    const { cityList, cityIndex } = formatCityList(res.data.body)
    // console.log(CityList, cityIndex)

    //热门城市: 再获取到所有热门城市的数据
    const hotRes = await axios.get('http://localhost:8080/area/hot')
    // console.log("热门城市数据",hotRes)

    //热门城市： 约定使用hot来作为热门城市的索引
    cityIndex.unshift('hot')
    cityList['hot'] = hotRes.data.body;


    // 获取当前城市的定位
    const curCity = await getCurrentCity()
    // console.log( cityList,cityIndex)
    // 添加当前定位城市
    cityIndex.unshift('#')
    cityList['#'] = [curCity]

    this.setState({
      cityList,
      cityIndex
    })
  }



  render() {
    return (
      <div className="cityList">
        <NavBar
          className="topBar"
          mode="light"
          icon={<i className="iconfont icon-back iconBack"></i>}
          onLeftClick={() => this.props.history.goBack()}
        >城市选择</NavBar>
      </div>
    )
  }
}