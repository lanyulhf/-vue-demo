<template>
	<div class="shoplist_container">
		<ul  type="1" v-if= "shopListArr.length">
			<router-link  v-for="item in shopListArr" tag='li' :key="item.id" class="shop_li" :to="{path: '/shop', query:{geohash, id: item.id}}">
				<section>
					<img :src="imgBaseUrl+item.image_path" class="shop_img">
				</section>
				<hgroup class="shop_right">
					<header class="shop_detail_header">
						<h4  class="shop_title ellipsis">{{item.name}}</h4>
						<ul class="shop_detail_ul">
							<li v-for="item in item.supports" :key="item.id"  class="supports">{{item.icon_name}}</li>
						</ul>
					</header>
					<h5 class="rating_order_num">
						<section class="rating_order_num_left">
							<section class="rating_section">
								<rating-star :rating='item.rating'></rating-star>
								<span class="rating_num">{{item.rating}}</span>
							</section>
							<section class="order_section">
								月售{{item.recent_order_num}}单
							</section>
						</section>
						<section class="rating_order_num_right">
							<span class="delivery_style delivery_left" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>
							<span class="delivery_style delivery_right" v-if="zhunshi(item.supports)">准时达</span>
						</section>
					</h5>
					<h5 class="fee_distance">
						<p class="fee">
							¥{{item.float_minimum_order_amount}}起送
							<span class="segmentation">/</span>
						{{item.piecewise_agent_fee.tips}}
						</p>
						<p class="distance_time">
							<!-- <span>
								<span class="segmentation">/</span>
							</span> -->
             <span v-if="Number(item.distance)">{{item.distance > 1000? (item.distance/1000).toFixed(2) + 'km': item.distance + 'm'}}
							<span class="segmentation">/</span>
              </span>
              <span v-else>{{item.distance}}</span>
							<span class="order_time">{{item.order_lead_time}}</span>
						</p>
					</h5>
				</hgroup>
			</router-link>
		</ul>
		<ul class="animation_opactiy" v-else>
			<li class="list_back_li" >
				<img src="../../images/shopback.svg" class="list_back_svg">
			</li>
		</ul>
		<p v-if="touchend" class="empty_data">没有更多了</p>
		<aside class="return_top" @click="backtop" v-if="showBackStatus">
			<svg class="back_top_svg">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
			</svg>
		</aside>
		<div ref="abc" style="background-color: red;"></div>
		<transition name="loading">
			<loading v-show="showLoading"></loading>
		</transition>
	</div>
</template>

<script>

import {mapState} from 'vuex'
import {shopList} from '../../service/getData.js'
// import {imgBaseUrl} from 'src/config/env'
// import {showBack, animate} from 'src/config/mUtils'
// import {loadMore, getImgPath} from './mixin'
import loading from './loading'
import ratingStar from './ratingStar'
export default {
	props: ['restaurantCategoryId', 'restaurantCategoryIds', 'sortByType', 'deliveryMode', 'supportIds', 'confirmSelect', 'geohash'],
	data(){
		return {
			offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
			shopListArr:[], // 店铺列表数据
			preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
			showBackStatus: false, //显示返回顶部按钮
			showLoading: false, //显示加载动画
			touchend: false, //没有更多数据
			imgBaseUrl:'//elm.cangdu.org/img/'
		}
  },
  components:{ loading , ratingStar},
  methods:{
    async initData() {
      let res = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
			this.shopListArr = res.data;
			if(res.data.length<30){
				this.touchend = true;
			}
    },
    zhunshi(supports){
      let supStatus = false;
      if(supports instanceof Array && supports.length){
        supports.forEach((item)=>{
          if(item.icon_name==="准"){
              supStatus=true;
          }
        })
      }else{
        supStatus = false;
      }
      return supStatus;
    },
		backtop(){
			window.scrollTo(0,0);
		},
		listenerToTop(){
			window.addEventListener("scroll",this.scrollTop);
		},
		scrollTop(){
			if(document.documentElement.scrollTop>=400){
				this.showBackStatus = true;
			}else{
				this.showBackStatus = false;
			}
		}
  },
  mounted(){
    this.initData();
    this.listenerToTop();
  },
  computed:{
     ...mapState(['latitude','longitude'])
  },
  
}
</script>

<style lang="scss" scoped>
	.shoplist_container{
		background-color: #fff;
		margin-bottom: 0.2rem;
	}
	.shop_li{
		display: flex;
		border-bottom: 0.025rem solid #f1f1f1;
		padding: 0.07rem 0.04rem;
	}
	.shop_img{
        width:0.7rem;
        height:0.7rem;
		// @include wh(2.7rem, 2.7rem);
		display: block;
		margin-right: 0.04rem;
	}
	.list_back_li{
		height: 2rem;
		.list_back_svg{
        width:100%;
        height:100%;
			// @include wh(100%, 100%)
		}
	}
	.shop_right{
		flex: auto;
		.shop_detail_header{
      display: flex;
	    justify-content: space-between;
			// @include fj;
			align-items: center;
			.shop_title{
				width: 0.8rem;
				color: #333;
				padding-top: .01rem;
        font-size:0.14rem;
				// @include font(0.65rem, 0.65rem, 'PingFangSC-Regular');
				font-weight: 700;
			}
			.premium::before{
				content: '品牌';
				display: inline-block;
				font-size: 0.5rem;
				line-height: .24rem;
				color: #333;
				background-color: #ffd930;
				padding: 0 0.1rem;
				border-radius: 0.1rem;
				margin-right: 0.1rem;
			}
			.shop_detail_ul{
				display: flex;
				transform: scale(.6);
				margin-right: -0.1rem;
				.supports{
          font-size:0.14rem;
          color:#999;
					// @include sc(0.5rem, #999);
					border: 0.025rem solid #f1f1f1;
					padding: 0 0.04rem;
					border-radius: 0.08rem;
					margin-left: 0.05rem;
				}
			}
		}
		.rating_order_num{
       display: flex;
	    justify-content: space-between;
			// @include fj(space-between);
			height: 0.02rem;
			margin-top: 0.022rem;
			.rating_order_num_left{
       display: flex;
	    justify-content: flex-start;
				// @include fj(flex-start);
				.rating_section{
					display: flex;
					.rating_num{
            font-size:0.12rem;
            color:#ff6000;
						// @include sc(0.4rem, #ff6000);
						margin: 0 0.06rem;
					}
				}
				.order_section{
					transform: scale(.8);
					margin-left: -0.12rem;
          font-size:0.1rem;
            color:#666;
					// @include sc(0.4rem, #666);
				}
			}
			.rating_order_num_right{
				display: flex;
				align-items: center;
				transform: scale(.5);
				min-width: 0.3rem;
				justify-content: flex-end;
				margin-right: -0.06rem;
				.delivery_style{
					font-size: 0.12rem;
					padding: 0.04rem 0.06rem 0;
					border-radius: 0.08rem;
					margin-left: 0.06rem;
					border: 1px;
				}
				.delivery_left{
					color: #fff;
					background-color: skyblue;
					border: 0.025rem solid skyblue;
				}
				.delivery_right{
					color:skyblue;
					border: 0.025rem solid skyblue;
				}
			}
		}
		.fee_distance{
			margin-top: 0.052rem;
      display: flex;
	    justify-content: space-between;
			// @include fj;
      font-size:0.14rem;
      color:#333;
			// @include sc(0.5rem, #333);
			.fee{
				transform: scale(.9);
        font-size:0.12rem;
        color:#666;
				// @include sc(0.5rem, #666);
			}
			.distance_time{
				transform: scale(.7);
				span{
					color: #999;
				}
				.order_time{
					color: shyblue;
				}
				.segmentation{
					color: #ccc;
				}
			}
		}
	}
	.loader_more{
    font-size:0.14rem/0.24rem;
		// @include font(0.6rem, 3);
		text-align: center;
    color: #999;
	}
	.empty_data{
     font-size:0.14rem;
    color:#666;
		// @include sc(0.5rem, #666);
		text-align: center;
		line-height: 2rem;
	}
	.return_top{
		position: fixed;
		bottom: 0.1rem;
		right: 0.1rem;
		z-index:2;
		.back_top_svg{
      width:0.6rem;
      height:0.6rem;
			// @include wh(2rem, 2rem);
		}
	}
	.loading-enter-active, .loading-leave-active {
		transition: opacity 1s
	}
	.loading-enter, .loading-leave-active {
		opacity: 0
	}
</style>
