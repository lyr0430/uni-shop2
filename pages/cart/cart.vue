<template>
	<block>
		<view class="cart-container" v-if="cart.length !== 0">
			<view class="cart-title">
				<uni-icons type="shop" size="18"></uni-icons>
				<text class="cart-title-text">购物车</text>
			</view>
			
			<uni-swipe-action>
				<block v-for="(goods,i) in cart" :key="i">
					<uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(goods)">
						<my-goods :goods="goods" :showRadio="true" @radio-change="radioChangeHandler" :showNum="true" @num-change="numberChangeHandler"></my-goods>
					</uni-swipe-action-item>
				</block>
			</uni-swipe-action>
			<my-address></my-address>
			<my-settle></my-settle>
		</view>
		<!-- 空白购物车区域 -->
		  <view class="empty-cart" v-else>
		    <image src="/static/cart_empty@2x.png" class="empty-img"></image>
		    <text class="tip-text">空空如也~</text>
		  </view>
	</block>
	
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				options: [{
					show:'right',
					text: '删除',
					style: {
						backgroundColor: '#C00000'
					}
				}]
			};
		},
		mixins: [badgeMix],
		computed: {
			...mapState('m_cart', ['cart'])
		},
		methods: {
			...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
			radioChangeHandler(e) {
				// console.log(e)
				this.updateGoodsState(e)
			},
			numberChangeHandler(e) {
				this.updateGoodsCount(e)
			},
			swipeActionClickHandler(goods) {
				// console.log(goods)
				this.removeGoodsById(goods.goods_id)
			}
		}
	}
</script>

<style lang="scss">
	.cart-container{
		padding-bottom: 100rpx;
	}
	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		font-size: 14px;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;

		.cart-title-text {
			margin-left: 10px;
		}
	}
	.empty-cart {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  padding-top: 150px;
	
	  .empty-img {
	    width: 90px;
	    height: 90px;
	  }
	
	  .tip-text {
	    font-size: 12px;
	    color: gray;
	    margin-top: 15px;
	  }
	}
</style>
