 <template>
    <div class="alet_container">
	    <section class="tip_text_container">
            <div class="tip_icon">
                <span></span>
                <span></span>
            </div>
            <p class="tip_text">{{alertText}}</p>
            <div class="confrim"  @click="closeTip">确认</div>
        </section>
    </div>
</template>

<script>

export default {
  props:['showAlert','alertText'],
  data(){
    return{
        positionY: 0,
        timer: null,
    }
  },
  methods:{
    closeTip(){
      this.$emit("closeTip",false);
    }
  }
    
}
</script>

<style lang="scss" scoped>
@keyframes tipMove{
       0%   { transform: scale(1) }
       35%  { transform: scale(.8) }
       70%  { transform: scale(1.1) }
       100% { transform: scale(1) }
    }
   .alet_container{
     position:relative;
     left:0.5rem;
     top:-1rem;
     width:2.6rem;
     height:2rem;
     border-radius:0.1rem;
     background:#fff;
     z-index:1;
     .tip_text_container{
      padding-top:0.1rem;
      border-top-left-radius: 0.1rem;
      border-top-right-radius: 0.1rem;
      animation: tipMove .4s ;
      .tip_icon{
        width:0.8rem;
        height:0.8rem;
        border:3px solid #f8cb86;
        border-radius:50%;
        margin:0 auto;
        margin-bottom:0.2rem;
        span:nth-child(1){
          display: block;
          width:0.04rem;
          height:0.4rem;
          background:#f8cb86 ;
          margin:0 auto;
          margin-bottom:0.1rem;
          margin-top:0.1rem;
        }
        span:nth-child(2){
          display: block;
          width:0.06rem;
          height:0.06rem;
          background:#f8cb86 ;
          margin:0 auto;
          border-radius:50%;
        }
      }
      .tip_text{
        line-height:0.46rem;
        text-align:center;
      }
      .confrim{
        width:2.6rem;
        height:0.4rem;
        background-color: green;
        border-bottom-left-radius: 0.06rem;
        border-bottom-right-radius: 0.06rem;
        text-align:center;
      }
     }
   }
    
</style>
