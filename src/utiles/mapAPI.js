import axios from "axios"

const BMap = window.BMap

// 封装  获取当前定位城市的数据 
const getCurrentCity = callback => {
  //数据类型转换
  const curCity = JSON.parse(localStorage.getItem('hkzf_city'))

  if (!curCity) {
    // 如果没有
    return new Promise((reslove, reject) => {
      const myCity = new window.BMap.LocalCity()
      myCity.get(async result => {
        // 地图定位城市名称
        const cityName = result.name

        try {
          // 调用接口， 获取我们项目中所有有房源的信息
          const res = await axios.get('http://localhost:8080/area/info', {
            params: {
              name: cityName
            }
          })
          //添加数据
          const { label, value } = res.data.body
          // 获取数据成功，调用reslove 将城市数据信息传递出去
          reslove({ label, value })

          // 把h获取到的当前城市数据缓存到本地浏览器中
          localStorage.setItem('hkzf_city', JSON.stringify({ label, value }))
        } catch (e) {
          // 接口处理失败， 就直接返回默认城市数据

        }
      })
    })
  } else {
    // 有   因为本地存储中没有当前定位城市的情况，返回都是promise. 为了保证当前返回的一致性，所以这里将返回promise
    // 打印结果  console.log((resolve, resject)=>resolve())

    //promise.revole()  会直接返回一个成功的promise对象
    return Promise.resolve(curCity)
  }
}
//  导出结果
export { getCurrentCity }