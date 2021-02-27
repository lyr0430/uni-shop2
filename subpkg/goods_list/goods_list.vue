<template>
	<view>
		<view class="goods-list">
			<view v-for="item in goods_list" :key="item.goods_id" @click="gotoDetail(item)">
				<my-goods :goods="item"></my-goods>
			</view>
			<view class="tipMsg" v-if="showTipMsg">
				到底了...
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				goods_list: [],
				total: 0,
				isLoading: false,
				showTipMsg: false

			}
		},
		methods: {
			async getGoodsList(cb) {
				this.isLoading = true
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				if (res.meta.status !== 200) return uni.$showMsg()
				this.goods_list = [...res.message.goods, ...this.goods_list]
				this.total = res.message.total
				this.isLoading = false
				cb && cb()
			},
			gotoDetail(item) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			}
		},
		onLoad(options) {
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			this.getGoodsList()
		},
		onReachBottom() {
			if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) {
				this.showTipMsg = true
				return uni.$showMsg('数据加载完毕')
			}
			if (this.isLoading) return
			this.queryObj.pagenum++
			this.getGoodsList()
		},
		onPullDownRefresh() {
			this.queryObj.pagenum = 1
			this.total = 0
			this.isLoading = false
			this.goods_list = []
			this.showTipMsg = false
			this.getGoodsList(() => uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">
	.tipMsg {
		text-align: center;
		height: 30px;
		line-height: 30px;
	}
</style>
