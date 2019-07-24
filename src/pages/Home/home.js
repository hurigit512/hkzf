//导入组件
import React from "react"
import { Route } from 'react-router-dom'
// 样式引入
import "./home.css"

//底部组件
import { TabBar } from 'antd-mobile';

//导入路由
// import { Route } from 'react-router-dom'
import HouseList from "../HouseList/HouseList.js"
import Index from "../Index/index.js"
import News from "../News/News.js"
import profile from "../Profile/Profile.js"


// 菜单数据封装
const TABBARLIST = [
  { title: '首页', icon: 'icon-ind', path: '/home' },
  { title: '找房', icon: 'icon-findHouse', path: '/home/HouseList' },
  { title: '资讯', icon: 'icon-infom', path: '/home/news' },
  { title: '我的', icon: 'icon-my', path: '/home/profile' }
]

//创建组件
export default class Home extends React.Component {

  state = {
    selectedTab: this.props.location.pathname,
    hidden: false,
    fullScreen: true,
  };


 
  // 显示高亮需要在更新阶段执行所以利用componentDidUpdate钩子函数，在拿到地址栏的值之后进行判断，如果地址栏的值发生
  // 变化就出发数据更新
  componentDidUpdate(prevProps) {
    // 获取地址栏的值
   const pathName = this.props.location.pathname
   const prevPathName = prevProps.location.pathname

    if (pathName !== prevPathName) {
      this.setState({
        selectedTab: pathName
      })
    }
  }



  // 导航菜单遍历数据渲染TabBar
  renderTabBarItems = () => {
    return TABBARLIST.map(item => (
      <TabBar.Item
        title={item.title}
        key={item.path}
        icon={<i className={`iconfont ${item.icon}`} />}
        selectedIcon={<i className={`iconfont ${item.icon}`} />}
        selected={this.state.selectedTab === item.path}
        onPress={() => {
          this.props.history.push(item.path)
          // this.setState({
          //   selectedTab: item.path,
          // });
        }}
      />
    ))
  }

  render() {
    return (
      <div className="home">
        {/* index首页   component ：注意大小写*/}
        <Route exact path="/home" component={Index} />
        {/* HouseList找房 */}
        <Route path="/home/HouseList" component={HouseList} />
        {/* News这是咨询页面 */}
        <Route path="/home/News" component={News} />
        {/* profile 我的页面 */}
        <Route path="/home/profile" component={profile} />


        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
          tabBarPosition="bottom"
        >
          {this.renderTabBarItems()}
        </TabBar>
      </div>
    )
  }
}