import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const userInfo = {
  state: {
    uid: 'sec99',
    uidImgUrl: 'http://pic.wangez.cn/markdown/2.jpg',
    uidBgUrl: 'http://pic.wangez.cn/second-market/userbg.jpeg'
  },
  mutations: {},
  actions: {},
  getters: {},
  modules: {}
}

// const menu = {
//   state: {
//     products: {}
//     //GLOBAL_CONFIG: GLOBAL_CONFIG["GLOBAL_CONFIG"]
//   },
//   mutations: {
//     get_product: function(state, products) {
//       //商品列表
//       state.products = products;
//       for (let i = 0; i < state.products.length; i++) {
//         if (state.products[i]["image"] != null) {
//           // state.products[i]['image'] = state.GLOBAL_CONFIG['base64Header'] + state.products[i]['image'];
//           //下载图片到本地
//           this.commit("imgCache", state.products[i]);
//         } else {
//           //添加默认图片
//           state.products[i]["image"] = require("../assets/file.png");
//         }
//       }
//     },
//     imgCache: function(state, imgObj) {
//       mui.plusReady(function() {
//         // 1. 转换网络图片地址为本地缓存图片路径，判断该图片是否存在本地缓存
//         // http://...jpg -> md5
//         // 缓存目录 _downloads/image/(md5).jpg
//         let image_url = imgObj.image;
//         let image_md5 = md5(image_url);
//         // 缓存本地图片url
//         let local_image_url = "_downloads/image/" + image_md5 + ".jpg";
//         // 平台绝对路径
//         let absolute_image_path = plus.io.convertLocalFileSystemURL(
//           local_image_url
//         );
//         console.log(absolute_image_path);
//         // 判断本地是否存在该文件，存在就就直接使用，否则就下载
//         plus.io.resolveLocalFileSystemURL(
//           absolute_image_path,
//           function(entry) {
//             if (entry) {
//               imgObj.image = plus.io.convertLocalFileSystemURL(local_image_url);
//             } else {
//               download_img();
//             }
//           },
//           function(e) {
//             console.log("Resolve file URL failed: ");
//             download_img();
//           }
//         );
//         function download_img() {
//           // filename:下载任务在本地保存的文件路径
//           let download_task = plus.downloader.createDownload(
//             image_url,
//             {
//               filename: local_image_url
//             },
//             function(download, status) {
//               // 下载失败,删除本地临时文件
//               if (status != 200) {
//                 console.log("下载失败,status" + status);
//                 if (local_image_url != null) {
//                   plus.io.resolveLocalFileSystemURL(local_image_url, function(
//                     entry
//                   ) {
//                     entry.remove(
//                       function(entry) {
//                         console.log("临时文件删除成功" + local_image_url);
//                         // 重新下载图片
//                         download_img();
//                       },
//                       function(e) {
//                         console.log("临时文件删除失败" + local_image_url);
//                       }
//                     );
//                   });
//                 }
//               } else {
//                 // 把下载成功的图片显示
//                 // 将本地URL路径转换成平台绝对路径
//                 console.log("下载成功" + local_image_url);
//                 imgObj.image = plus.io.convertLocalFileSystemURL(
//                   local_image_url
//                 );
//               }
//             }
//           );
//           download_task.start();
//         }
//       });
//     }
//   },
//   actions: {}
// };

const contactInfo = {
  state: {
    contactObj: {
      uid: '1',
      toId: '3',
      toUidImgUrl: '2',
      readState: '1',
      shopImgUrl: '1',
      message: '嗯',
      timesStamp: '2019-01-01'
    }
  },
  mutations: {
    setInfo: (state, payload) => {
      state.contactObj.uid = payload.uid
      state.contactObj.toId = payload.toId
      state.contactObj.toUidImgUrl = payload.toUidImgUrl
      state.contactObj.readState = payload.readState
      state.contactObj.shopImgUrl = payload.shopImgUrl
      state.contactObj.message = payload.message
      state.contactObj.timesStamp = payload.timesStamp
    }
  },
  actions: {},
  getters: {}
}

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    contactInfo,
    userInfo
  }
})
