import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-type'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // payload添加新商品
      // let oldProduct = null
      // for (const item of state.cartList) {
      //   if (item.iid === payload.iid){
      //     oldProduct = item
      //   }
      // }

      // 查找之前数组中是否有该商品
      let oldProduct =
        context.state.cartList.find(item => item.iid === payload.iid)

      // 判断oldProduct
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve('成功再次添加商品')
      } else {
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
        resolve('添加购物车成功')
      }
    })
  }
}