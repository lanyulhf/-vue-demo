<template>
   <div class="">
     <div id="select_frame">
    <div ref="select_frame" class="box">
        将文件拖拽到这里
    </div>
    <div class="filebox">
        <p v-if="fileList.length<1">暂无文件</p>
        <ol>
            <li v-for="item in fileList">{{item.name}}</li>
            <img src="" id= "img" alt="tupian">
        </ol>
    </div>
    <button style="outline:none;float:right;"  type="submit" class="btn btn-primary">解 析</button>
</div>
   </div>
</template>

<script type="text/ecmascript-6">
export default{
  name: 'patchCheck',
  data() {
    return {
      infoshow: false,
      fileList: [],
    };
  },
  mtehods: {

  },
  components: {
    // layout: Layout,
  },
  mounted() {
    this.$refs.select_frame.ondragleave = (e) => {
      e.preventDefault();  //阻止离开时的浏览器默认行为
    };
    this.$refs.select_frame.ondrop = (e) => {
      e.preventDefault();    //阻止拖放后的浏览器默认行为
      const data = e.dataTransfer.files;  // 获取文件对象
      if (data.length < 1) {
        return;  // 检测是否有文件拖拽到页面     
      }
      console.log(e.dataTransfer.files);
      const formData = new FormData();
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        console.log(e.dataTransfer.files[i]);
        // if (e.dataTransfer.files[i].name.indexOf('map') === -1) {
        //   alert('只允许上传.map文件');
        //   return;
        // }
        formData.append('uploadfile', e.dataTransfer.files[i], e.dataTransfer.files[i].name);
      }
      this.fileList = this.fileList.concat(e.dataTransfer.files[0]);
      document.getElementById("img").src=`${e.dataTransfer.files[0].name }`;
      console.log(e.dataTransfer.files[0].name);
       
    }

    this.$refs.select_frame.ondragenter = (e) => {
      e.preventDefault();  //阻止拖入时的浏览器默认行为
      this.$refs.select_frame.border = '2px dashed red';
    };
    this.$refs.select_frame.ondragover = (e) => {
      e.preventDefault();    //阻止拖来拖去的浏览器默认行为
    };
  },

};

</script>

<style scoped lang="scss">
</style>
