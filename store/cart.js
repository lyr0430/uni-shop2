export default {
	// 为当前模块开启命名空间
	namespaced: true,

	// 模块的 state 数据
	state: () => ({
		// 购物车的数组，用来存储购物车中每个商品的信息对象
		// 每个商品的信息对象，都包含如下 6 个属性：
		// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
	}),

	// 模块的 mutations 方法
	mutations: {
		addToCart(state, goods) {
			const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)
			if (!findResult) {
				state.cart.push(goods)
				uni.showToast({
					title: '添加成功',
					duration: 1000
				})
			} else {
				findResult.goods_count++
				uni.showToast({
					// title:`当前${goods.goods_name}的数量为${findResult}`,
					title: `当前商品数量为${findResult.goods_count}`,
					duration: 1000,
					icon: 'none'
				})
				// console.log(findResult.goods_count)
			}
			this.commit('m_cart/saveToStorage')
		},
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		updateGoodsState(state, goods) {
			const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)
			if (findResult) {
				findResult.goods_state = goods.goods_state
				this.commit('m_cart/saveToStorage')
			}
		},
		updateGoodsCount(state, goods) {
			const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)
			if (findResult) {
				findResult.goods_count = goods.goods_count
				this.commit('m_cart/saveToStorage')
			}
		},
		removeGoodsById(state, goods_id) {
			// 调用数组的 filter 方法进行过滤
			state.cart = state.cart.filter(x => x.goods_id !== goods_id)
			// 持久化存储到本地
			this.commit('m_cart/saveToStorage')
		},
		updateAllGoodsState(state, newState) {
			state.cart.forEach(x => x.goods_state = newState)
			this.commit('m_cart/saveToStorage')
		}
	},

	// 模块的 getters 属性
	getters: {
		total(state) {
			// 购物车里所有商品的数量总数
			let c = 0
			state.cart.forEach(goods => c += goods.goods_count)
			// 购物车中商品种类数量
			// let c = state.cart.length
			return c
		},
		checkedCount(state) {
			// 先使用 filter 方法，从购物车中过滤器已勾选的商品
			// 再使用 reduce 方法，将已勾选的商品总数量进行累加
			// reduce() 的返回值就是已勾选的商品的总数量
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
		},
		checkedGoodsAmount(state) {
			// 先使用 filter 方法，从购物车中过滤器已勾选的商品
			// 再使用 reduce 方法，将已勾选的商品数量 * 单价之后，进行累加
			// reduce() 的返回值就是已勾选的商品的总价
			// 最后调用 toFixed(2) 方法，保留两位小数
			return state.cart.filter(x => x.goods_state)
				.reduce((total, item) => total += item.goods_count * item.goods_price, 0)
				.toFixed(2)
		}
	},
}
