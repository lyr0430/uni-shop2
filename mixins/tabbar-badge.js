import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {

			};
		},
		computed: {
			...mapGetters('m_cart', ['total'])
		},
		onShow(){
			this.setBadge()
		},
		methods:{
			setBadge(){
				if(this.total!==0){
					uni.setTabBarBadge({
						index:2,
						text:this.total + ''
					})
				}
				
			}
		},
		watch:{
			total(){
				this.setBadge()
			}
		}
	}