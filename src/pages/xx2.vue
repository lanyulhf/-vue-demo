<template>
   <!-- merchant-商家 -->
<div class="merchant">
<div class="message">
<span>手机号码</span>
<span>会员类型</span>
<span>奖金</span>
<span>在邀商家</span>
<span>会员类型</span>
<span>奖金</span>
</div>
<div class="message_box1" v-for="item in info" :key="item.id">
    <div class="message_box">
    <div class="message_one">
    <span>{{item.phone}}</span>
    <span>{{item.membType1}}</span>
    <span>{{item.reward1}}</span>
    <span>{{item.Businesses}}</span>
    <span>{{item.membType2}}</span>
    <span>{{item.reward2}}</span>
    <span id="inv"></span>
    <span id="bonus"></span>
    <span id="inv"></span>
    <span id="invitee"></span>
    </div>
</div>
</div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
   name: '',
   data() {
       return {
         info: [
            {
            "phone": "AQ",
            "membType1": "0556",
            "reward1": 1,
            "Businesses": true,
            "membType2": 30.54294,
            "reward2":1,
            "id": 11
            },
            {
            "phone": "bQ",
            "membType1": "1111",
            "reward1": 1,
            "Businesses": 333,
            "membType2": 1,
            "reward2": 1,
            "id": 13
            }
        ],
        // stn : [
        // {'ipone':13526286136,'qian':2,'jiangjin':2},
        // {'ipone':13526286136,'qian':2,'jiangjin':2},
        // {'ipone':13526286136,'qian':2,'jiangjin':2},
        // {'ipone':13526286136,'qian':2,'jiangjin':2},
        // ],
        // n1:0,
        // n2:0,
        // n3:0
        info: [
        {
        phone: "13526286136",
        membType1: "0556",
        reward1: "70",
        BusinessesP: 13654896232,
        membType2: 30.5,
        reward2: 117.0,
        id: 11
        },
        {
    phone: "13526286136",
    membType1: "1111",
    reward1: "222",
    BusinessesP: 15236548569,
    membType2: 4443,
    reward2: 55,
    id: 12
    },
    {
    phone: "13526286136",
    membType1: "1112",
    reward1: "223",
    BusinessesP: 13645862131,
    membType2: 4442,
    reward2: 55,
    id: 13
    }
    ],
    Inv_reward1: 0,
    Inv_reward2: 0,
    Inv_rewardzong: 0

       }   
   },
   mounted(){
       this.get();
   },
    methods:{
    //     get(){
    //     for(var i=0;i<this.stn.length;i++){
    //     this.n1 = this.stn[i].qian + this.n1;//用户本身钱的总和
    //     this.n2 = this.stn[i].jiangjin + this.n2;//邀请人本身钱的总和
    //     }
    //     this.n3 = this.n2*0.5;//邀请人的百分比
    //     alert(this.n1+this.n3);
    //  }
    get() {
        for (var i = 0; i <=this.info.length; i++) {
        this.Inv_reward1 += Number(this.info[i].reward1); //用户本身钱的总和
        this.Inv_reward2 += Number(this.info[i].reward2); //邀请人本身钱的总和
        }
        this.Inv_rewardzong = Number(this.Inv_reward1) + Number(this.Inv_reward2); //邀请人的百分比
        document.getElementById("inv").innerHTML = Inv_reward1;
        document.getElementById("bonus")[0].innerHTML = this.Inv_rewardzong;
        document.getElementById("inv")[0].innerHTML = this.Inv_reward1;
        document.getElementById("invitee")[0].innerHTML = this.Inv_reward2;
        console.log(this.Inv_reward1);
        console.log(this.Inv_reward2);
        console.log(Number(this.Inv_reward1) + Number(this.Inv_reward2));
        }
 }
}
</script>

<style scoped lang="scss">
</style>
