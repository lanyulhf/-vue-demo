import Vue from 'vue'
import axios from 'axios'
import { getStorage } from '../config/comutils'
Vue.prototype.$axios = axios
export const cityGuess = () => axios.get('/api/v1/cities?type=guess')
export const hotcity = () => axios.get('/api/v1/cities?type=hot')
export const groupcity = () => axios.get('/api/v1/cities?type=group')
export const searchplace = (cityid, value) => axios.get('/api/v1/pois?type=search&city_id=' + cityid + '&keyword=' + value)
export const currentcity = (cityid) => {
  return axios.get('/api/v1/cities/' + cityid)
}
// 获取验证码
export const getcaptchas = () => {
  return axios({
    method: 'POST',
    url: '/api/v1/captchas'
  })
}
// 账号密码登录
export const accountLogin = (username, password, captcha_code) => {
  return axios({
    method: 'POST',
    url: '/api/v2/login',
    data: {
      username: username,
      password: password,
      captcha_code: captcha_code
    }
  })
}
// 修改密码
export const changePassword = (username, oldpassWord, newpassword, confirmpassword, captcha_code) => {
  return axios({
    method: 'POST',
    url: '/api/v2/changepassword',
    data: {
      username: username,
      oldpassWord: oldpassWord,
      newpassword: newpassword,
      confirmpassword: confirmpassword,
      captcha_code: captcha_code
    }
  })
}
/**
 * 检测帐号是否存在
 */

export const checkExsis = (checkNumber, type) => {
  return axios({
    method: 'GET',
    url: '/api/v1/users/exists',
    data: {
      type: checkNumber
    }
  })
}
// 获取用户信息
export const getUser = () => axios.get('/api/v1/user/?user_id=' + getStorage('user_id'))

/**
 * 获取msite页面食品分类列表
 */

// http: //localhost:8000/v2/index_entry?geohash=34.251834,108.947035&group_type=1&flags[]=F
export const msiteFoodTypes = (geohash) => axios.get('/api/v2/index_entry?geohash=' + geohash + '&group_type=1&flags[]=F')

/**
 * 获取msite页面地址信息
 */

export const msiteAddress = (geohash) => axios.get('/api/v2/pois/' + geohash)

/**
 * 获取msite商铺列表
 */

export const shopList = (latitude, longitude, offset, restaurant_category_id = '', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []) => {
  let supportStr = ''
  support_ids.forEach(item => {
    if (item.status) {
      supportStr += '&support_ids[]=' + item.id
    }
  })
  let data = {
    latitude,
    longitude,
    offset,
    limit: '20',
    'extras[]': 'activities',
    keyword: '',
    restaurant_category_id,
    'restaurant_category_ids[]': restaurant_category_ids,
    order_by,
    'delivery_mode[]': delivery_mode + supportStr
  }
  return axios.get('/api/shopping/restaurants', {params: data})
}

/**
 * 获取food页面的 category 种类列表
 */

export const foodCategory = (latitude, longitude) => axios.get('/api/shopping/v2/restaurant/category?latitude=' + latitude + '& longitude =' + longitude)

/**
 * 获取food页面的配送方式
 */

export const foodDelivery = (latitude, longitude) => axios.get('/api/shopping/v1/restaurants/delivery_modes?latitude=' + latitude + '&longitude=' + longitude + '&kw=""')
/**
 * 获取food页面的商家属性活动列表
 */

export const foodActivity = (latitude, longitude) => axios.get('/api/shopping/v1/restaurants/activity_attributes?latitude=' + latitude + '&longitude=' + longitude + '&kw=""')

/**
 * 获取search页面搜索结果
 */

export const searchRestaurant = (geohash, keyword) => axios.get('/api/v4/restaurants', {params: {
  'extras[]': 'restaurant_activity',
  geohash,
  keyword,
  type: 'search'
}})
