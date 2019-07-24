// 导入组件
import React from "react"
//组件
import { Carousel, Flex, Grid, WingBlank, Result } from 'antd-mobile';
//路由组件
import { Link } from "react-router-dom"
//样式导入
import "./index.css"

//导入封装的地图定位
import { getCurrentCity } from "../../utiles/mapAPI.js"

// 图片引入 
import nav1 from '../../assets/nav-1.png'
import nav2 from "../../assets/nav-2.png"
import nav3 from "../../assets/nav-3.png"
import nav4 from "../../assets/nav-4.png"

//导入 axios
import axios from "axios"
// import BaseComponent from "rmc-input-number/lib/base";

//租房合租链接数据
const FLEXITEM = [
  { id: 1, url: "/home/HouseList", img: nav1, text: "整租" },
  { id: 2, url: "/home/HouseList", img: nav2, text: "合租" },
  { id: 3, url: "/map", img: nav3, text: "地图找房" },
  { id: 4, url: "/rent/add", img: nav4, text: "去出租" },
]



//创建组件
export default class Index extends React.Component {
  state = {
    //轮播图
    swipers: [],
    //住房小组
    grid: [],
    //最新资讯
    news: [],

    // 城市过度
    cityName: '定位..',
    imgHeight: 212,
    isSwiperLoading: true
  }

  // axios获取轮播图数据
  async getSwipers() {
    const res = await axios.get('http://localhost:8080/home/swiper')
    // console.log(res)

    //数据更新
    this.setState({
      swipers: res.data.body,

      isSwiperLoading: false
    })
  }

  //租房小组
  async getgrid() {
    const item = await axios.get('http://localhost:8080/home/groups?area=AREA%7C88cff55c-aaa4-e2e0')
    // console.log(item)

    // 数据更新
    this.setState({
      grid: item.data.body
    })
  }

  //最新资讯
  async getNews() {
    const item = await axios.get('http://localhost:8080/home/news?area=AREA%7C88cff55c-aaa4-e2e0')
    // console.log(item)
    // 数据更新
    this.setState({
      news: item.data.body,
    })
  }

  //租房合租链接数据 封装渲染
  renderflexItem = () => {
    return FLEXITEM.map(item => (
      <Flex.Item key={item.id}>
        <Link to={item.url}>
          <img src={item.img} />
          <p>{item.text}</p>
        </Link>
      </Flex.Item>
    ))
  }

  // 进入页面是挂载
  async componentDidMount() {
    // 轮播图
    this.getSwipers()
    // 租房小组
    this.getgrid()
    //最新资讯
    this.getNews()

    // 调用封装地图API
    const { label } = await getCurrentCity()
    this.setState({
      cityName: label
    })
  }

  //轮播图
  renderSwipers() {
    return this.state.swipers.map(item => (

      <a
        key={item.id}
        href="http://itcast.cn"
        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
      >
        <img
          src={`http://localhost:8080${item.imgSrc}`}
          alt=""
          style={{ width: '100%', verticalAlign: 'top' }}
          onLoad={() => {
            // fire window resize event to change height
            window.dispatchEvent(new Event('resize'));
            this.setState({ imgHeight: 'auto' });
          }}
        />
      </a>
    ))
  }

  // 最新资讯
  renderNewa() {
    return this.state.news.map(item => (
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img src={`http://localhost:8080${item.imgSrc}`} alt="图片加载失败" />
        </div>
        <div className="content">
          <h3 className="title">置业选择 | 安贞西里 三室一厅 河间的古雅别院</h3>
          <Flex className="info" justify="between">
            <span>新华网</span>
            <span>两天前</span>
          </Flex>
        </div>
      </div>
    ))
  }

  render() {
    return (
      <div className="index">
        {/* 轮播图 */}
        <div className="swiper">
          {/* 搜索框 */}
          <Flex className="seach">
            <Flex className="seach-left">
              <div className="location" onClick={() => this.props.history.push("/CityList")}>
                <span>{this.state.cityName}</span>
                <i className="iconfont icon-arrow"></i>
              </div>
              <div className="search-form" onClick={() => this.props.history.push("/seach")}>
                <i className="iconfont icon-seach"></i>
                <span>请输入小区或者地址</span>
              </div>
            </Flex>
            <i className="iconfont icon-map icon-top" onClick={() => this.props.history.push("/map")}></i>
          </Flex>

          {this.state.isSwiperLoading ? null : (
            <Carousel autoplay={true} infinite autoplayInterval={5000}>
              {this.renderSwipers()}
            </Carousel>
          )}
        </div>
        {/* 租房合租链接数据 */}
        <Flex className="flexItem">
          {this.renderflexItem()}
        </Flex>
        <div className="Grid ">
          <Flex justify="between" className="Grid-text">
            <h3>租房小组</h3>
            <span>更多</span>
          </Flex>
          <Grid data={this.state.grid} activeStyle={true}
            className="Grid-data"
            columnNum={2}
            hasLine={false}
            square={false} renderItem={item => (
              <Flex className="grid-item" justify="between">
                <div>
                  <p>{item.title}</p>
                  <span>{item.desc}</span>
                </div>
                <div>
                  <img src={`http://localhost:8080${item.imgSrc}`} />
                </div>
              </Flex>
            )} />
        </div>

        {/* 最新资讯 */}
        <div className="news">
          <h3 className="new-title">最新资讯</h3>

          <WingBlank size="md">
            {this.renderNewa()}
          </WingBlank>
        </div>
      </div>
    )
  }
}