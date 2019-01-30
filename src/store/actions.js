// 通过mutation间接更新state对象   异步请求
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutation-types'

import {
  reqAddress,
  reqFoodCategorys,
  reqUserInfo,
  reqLogout,
  reqShopInfo,
  reqShopRatings,
  reqShopGoods,
  reqSearchShop
} from '../api'
export default {
  // 异步获取地址
  async getAddress ({
    commit,
    state
  }) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, {
        address
      })
    }  
  },
  // 异步获取食品分类列表
  async getCategorys ({
    commit
  }) {
    const result = await reqFoodCategorys()
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, {
        categorys
      })
    }
  },
  // 异步获取商家列表
  async getShops ({
    commit,
    state
  }) {
    const {
      longitude,
      latitude
    } = state
    const result = await reqSearchShop(longitude, latitude)
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, {
        shops
      })
    }
  },
  // 同步记录用户信息
  recorderUser ({
    commit
  }, userInfo) {
    commit(RECEIVE_USER_INFO, {
      userInfo
    })
  },

  async getUserInfo ({
    commit
  }) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, {
        userInfo
      })
    }
  },

  async logout ({
    commit
  }) {
    const result = await reqLogout()
    if (result.code === 0) {
      // 重置用户信息
      commit(RESET_USER_INFO)
    }
  },

  async getShopInfo ({
    commit
  }) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, {
        info
      })
    }
  },

  async getShopGoods ({
    commit
  }, callback) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {
        goods
      })
      callback && callback()
    }
  },

  async getShopRatings ({
    commit
  }, callback) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {
        ratings
      })
      callback && callback()
    }
  },
  // 同步更新food中的count值
  updateFoodCounts ({
    commit
  }, {
    isAdd,
    food
  }) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, {
        food
      })
    } else {
      commit(DECREMENT_FOOD_COUNT, {
        food
      })
    }
  },

  clearCart ({commit}) {
    commit(CLEAR_CART)
  },
  // 异步获取商家商品列表
  async searchShops ({commit, state}, keyword) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqSearchShop(geohash, keyword)
    if (result.code === 0) {
      const searchShops = result.data
      commit(RECEIVE_SEARCH_SHOPS, {searchShops})
    }
  }

}
