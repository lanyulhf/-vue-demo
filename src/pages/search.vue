<template>
  	<div class="paddingTop search_page">
        <head-top head-title="搜索" goBack="true" class="headTop"></head-top>
        <form class="search_form">
            <input type="search" name="search" placeholder="请输入商家或美食名称" class="search_input" v-model="searchValue" @input="checkInput">
            <input type="submit" name="submit" class="search_submit" @click.prevent="searchTarget('')">
        </form>
        <section v-if="restaurantList.length">
            <h4 class="title_restaurant">商家</h4>
            <ul class="list_container">
                <router-link :to="{path:'/shop', query:{id:item.id}}" tag="li" v-for="item in restaurantList" :key="item.id" class="list_li">
                    <section class="item_left">
                        <img :src="imgBaseUrl + item.image_path" class="restaurant_img">
                    </section>
                    <section class="item_right">
                        <div class="item_right_text">
                            <p>
                                <span>{{item.name}}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="14" class="pay_icon">
                                    <polygon points="0,14 4,0 24,0 20,14" style="fill:none;stroke:#FF6000;stroke-width:1" />
                                    <line x1="1.5" y1="12" x2="20" y2="12" style="stroke:#FF6000;stroke-width:1.5"/>
                                    <text x="3.5" y="9" style="fill:#FF6000;font-size:9;font-weight:bold;">支付</text>
                                </svg>
                            </p>
                            <p>月售 {{item.month_sales||item.recent_order_num}} 单</p>
                            <p>{{item.delivery_fee||item.float_minimum_order_amount}} 元起送 / 距离{{item.distance}}</p>
                        </div>
                        <ul class="item_right_detail">
                            <li v-for="activities in item.restaurant_activity" :key="activities.id">
                                <span :style="{backgroundColor: '#' + activities.icon_color}" class="activities_icon">{{activities.icon_name}}</span>
                                <span>{{activities.name}}</span>
                                <span class="only_phone">(手机客户端专享)</span>
                            </li>
                        </ul>
                    </section>
                </router-link>
            </ul>
        </section>
        <section class="search_history" v-if="searchHistory.length&&showHistory">
            <h4 class="title_restaurant">搜索历史</h4>
            <ul>
                <li v-for="(item, index) in searchHistory" :key="index" class="history_list">
                    <span class="history_text ellipsis" @click="searchTarget(item)">{{item}}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="delete_icon" @click="deleteHistory(index)">
                        <line x1="8" y1="8" x2="18" y2="18" style="stroke:#999;stroke-width:3" />
                        <line x1="18" y1="8" x2="8" y2="18" style="stroke:#999;stroke-width:3" />
                    </svg>
                </li>
            </ul>
            <footer class="clear_history" @click="clearAllHistory">清空搜索历史</footer>
        </section>
        <div class="search_none" v-if="emptyResult">很抱歉！无搜索结果</div>
        <foot-guide></foot-guide>
    </div>
</template>

<script>
import headTop from '../components/header/head'
import footGuide from '../components/common/footGuide'
import {searchRestaurant} from '../service/getData.js'
// import {imgBaseUrl} from '../../config/env'
import {getStorage, setStorage} from '../config/comutils.js'

export default {
	data(){
        return {
            geohash: '', // msite页面传递过来的地址信息
            searchValue: '', // 搜索内容
            restaurantList: [], // 搜索返回的结果
            imgBaseUrl : '//elm.cangdu.org/img/', // 图片域名地址
            searchHistory: [], // 搜索历史记录
            showHistory: true, // 是否显示历史记录，只有在返回搜索结果后隐藏
            emptyResult: false, // 搜索结果为空时显示
        }
    },
    mounted(){
        this.geohash = this.$route.params.geohash;
        this.searchHistory= JSON.parse(getStorage('searchHistory'));
    },
    components:{
        headTop,
        footGuide,
    },
    methods:{
      async searchTarget(historyValue){
        if(historyValue){
          this.searchValue = historyValue
        }else if(!this.searchValue){
          return;
        }
        this.showHistory = false;
        // this.emptyResult = !this.restaurantList.length;
        let searchRes = await searchRestaurant(this.geohash, this.searchValue);
        //判断请求是否成功
        if(searchRes.data.status==0){
          this.emptyResult = true;
        }
        let histoty = getStorage('searchHistory');
        if(histoty){
          this.searchHistory= JSON.parse(histoty);
          let checkGFlag = false;
          this.searchHistory.forEach((item)=>{
            if(item==this.searchValue){
              checkGFlag = true;
            }
          })
          if(checkGFlag==false){
            this.searchHistory.push(this.searchValue);
          }
        }else{
          this.searchHistory.push(this.searchValue);
        }
        //将数据保存到本地
        setStorage('searchHistory',this.searchHistory);
      },
      checkInput(){
         if (this.searchValue === '') {
                this.showHistory = true; //显示历史记录
                this.restaurantList = []; //清空搜索结果
                this.emptyResult = false; //隐藏搜索为空提示
            } 
      },
      deleteHistory(index){
        this.searchHistory.splice(index,1);
        setStorage('searchHistory',this.searchHistory);
      },
      clearAllHistory(){
        this.searchHistory = [];
        setStorage('searchHistory',this.searchHistory);
      }
    }
}

</script>

<style lang="scss" scoped>
    .search_page{
        margin-bottom: 0.2rem;
    }
    .paddingTop {
        padding-top:0.5rem;
        .headTop{
            padding-top:0.1rem;
        }
    }
    .search_form{
        background-color: #fff;
        padding: 0.05rem;
        display: flex;
        input{
            height: 0.35rem;
        }
        .search_input{
            flex: 4;
            border: 0.0025rem solid #e4e4e4;
            font-size:0.14rem;
            color:#333;
            // @include sc(0.65rem, #333);
            border-radius: 0.0125rem;
            background-color: #f2f2f2;
            font-weight: bold;
            padding: 0 0.025rem;
        }
        .search_submit{
            flex: 1;
            border: 0.025rem solid #3190e8;
            margin-left: .1rem;
            font-size:0.14rem;
            color:#fff;
            // @include sc(0.65rem, #fff);
            border-radius: 0.025rem;
            background-color: #3190e8;
            font-weight: bold;
            padding: 0 0.025rem;
        }
    }
    .title_restaurant{
        font-size: 0.14rem;
        line-height: 0.24rem;
        text-indent: 0.05rem;
        font-weight: bold;
        color: #666;
    }
    .list_container{
        background-color: #fff;
    }
    .list_li{
        display: flex;
        justify-content: 'center';
        padding: 0.5rem;
        border-bottom: 0.025rem solid #e4e4e4;
        .item_left{
            margin-right: 0.25rem;
            .restaurant_img{
                width:0.3rem;
                height:0.3rem;
                // @include wh(1.7rem, 1.7rem);
            }
        }
        .item_right{
            font-size: 0.55rem;
            flex: 1;
            .item_right_text{
                padding-bottom: 0.25rem;
                border-bottom: 0.025rem solid #e4e4e4;
                p{
                    line-height: .9rem;
                }
                .pay_icon{
                    margin-bottom: -0.08rem;
                }
            }
            .item_right_detail{
                margin-top: 0.25rem;
                li{
                    font-size: 0;
                    span{
                        font-size: .5rem;
                        vertical-align: middle;
                        display: inline-block;
                        margin-bottom: 0.2rem;
                    }
                    .activities_icon{
                        font-size:0.14rem;
                         color:#fff;
                        // @include sc(.5rem, #fff);
                        font-weight: bold;
                        padding: .04rem;
                        border-radius: 0.15rem;
                        margin-right: 0.125rem;
                    }
                    .only_phone{
                        color: #FF6000;
                    }
                }
            }
        }
    }
    .search_history{
        .history_list{
            background-color: #fff;
            border-bottom: 0.0025rem solid #e4e4e4;
            font-size:0.12rem;
            line-height:0.4rem;
            // @include font(0.7rem, 2rem);
            padding: 0 0.4rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .history_text{
                display: inline-block;
                width: 80%;
            }
            .delete_icon{
               width:0.2rem;
              height:0.2rem;
                // @include wh(1rem, 1rem);
            }
        }
        .clear_history{
            background-color: #fff;
            color: #3190e8;
            font-size:0.12rem;
            line-height:0.24rem;
            // @include font(.7rem, 2rem);
            font-weight: bold;
            text-align: center;
        }
    }
    .search_none{
        margin: 0 auto;
        font-size:0.12rem;
          line-height:0.24rem;
        // @include font(0.65rem, 1.75rem);
        color: #333;
        background-color: #fff;
        text-align: center;
        margin-top: 0.125rem;
    }
</style>
