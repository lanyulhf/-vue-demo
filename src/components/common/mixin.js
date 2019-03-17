export const getImgPath = {
  methods: {
    getImgPath (path) {
      let suffix
      if (!path) {
        return '//elm.cangdu.org/img/default.jpg'
      }
      if (path.indexOf('jpeg') !== -1) {
        suffix = '.jpeg'
      } else {
        suffix = '.png'
      }
      let url = path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix
      return 'https://fuss10.elemecdn.com/' + url
    }
  }

}
// export const getImgPath = {
//   methods: {
//     // 传递过来的图片地址需要处理后才能正常使用
//     getImgPath (path) {
//       let suffix
//       if (!path) {
//         return '//elm.cangdu.org/img/default.jpg'
//       }
//       if (path.indexOf('jpeg') !== -1) {
//         suffix = '.jpeg'
//       } else {
//         suffix = '.png'
//       }
//       let url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix
//       return 'https://fuss10.elemecdn.com' + url
//     }
//   }
//   // https://fuss10.elemecdn.com/b/ff/533cf9617bd57fe1dfb05603bebcfpng.png
// }
