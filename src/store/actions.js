// 通过mutation间接更新state对象   异步请求
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO
} from './mutation-types'

import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopInfo,
  reqShopRatings,
  reqShopGoods
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
    const result = await reqShops(longitude, latitude)
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
  }) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {
        goods
      })
    }
  },

  async getShopRatings ({
    commit
  }) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {
        ratings
      })
    }
  }

}
