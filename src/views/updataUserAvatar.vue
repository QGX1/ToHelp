<template>
  <div id="updateUserAvatar">
    <HeaderTop title="修改个人头像">
      <!-- title为岗位 -->
      <router-link slot="left" class="left" to="/mine/updateInfo">
        <span>
          <i class="iconfont icon-fanhui1"></i>
        </span>
      </router-link>
      <div slot="right" class="right" @click="toMore">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </HeaderTop>
    <div class="userAvatar">
      <img :src="imgUrl" style="width: 80%;" id="img">
    </div>
    <div class="mineCell">
      <!-- <mt-button @click.native="flag = true" size="large">选择用户头像</mt-button> -->
      <mt-actionsheet :actions="actions" v-model="userStatusVisible"></mt-actionsheet>
      <!-- 修改头像选择框 -->
      <input
        type="file"
        ref="fileInput"
        class="file"
        accept="image/*"
        @change="change($event)"
        style="display: none"
      >
    </div>
  </div>
</template>

<script>
import HeaderTop from "../components/HeaderTop";
import { mapState } from "Vuex";
import { updateUserInfo } from "../api/index";
import mineCell from "../components/mine/mineCell";
import Cropper from "cropperjs";
import Exif from "exif-js";
import { showLoading, hideLoading } from "../api/loading";
import { MessageBox, Toast } from "mint-ui";
export default {
  name: "updateUserAvatar",
  components: {
    HeaderTop
  },
  data() {
    return {
      userStatusVisible: false,
      // 定义的宽高比
      widthRate: {
        type: Number,
        default: 1
      },
      // 定义的宽高比
      heightRate: {
        type: Number,
        default: 1
      },
      imgUrl: String,
      actions: [
        {
          name: `从手机相册选择`,
          method: this.galleryImg // 调用methods中的函数
        }
      ]
    };
  },
  mounted() {
    //console.log(this.userInfo)
    //   console.log(this.$route.params)
    this.imgUrl = this.userInfo.user_avatar
      ? "http://39.101.193.187:8080/pictures/" + this.userInfo.user_avatar
      : "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png";
  },
  computed: {
    ...mapState(["userInfo"])
  },
  beforeRouteLeave(to, from, next) {
    hideLoading();
    next();
  },
  methods: {
    toMore() {
      this.userStatusVisible = true;
    },
    open() {
      this.$confirm("选择头像无效，是否重新选择?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.getAvatar(); //重新选择头像
        })
        .catch(() => {});
    },
    galleryImg() {
      //   判断是否存在plus
      this.$refs.fileInput.click();
      //   if (window.plus) {
      //     plusReady();
      //   } else {
      //     document.addEventListener("plusready", plusReady, false);
      //   }
      //   console.log(2222, "从手机获取图片");
      //   let This = this;
      //   // console.log("从相册中选择图片:");
      //   plus.gallery.pick(
      //     function(path) {
      //       //从相册中选择图片
      //       This.imgSrc = path;
      //       alert(path);
      //     },
      //     function(e) {
      //       //取消选择图片
      //       //  console.log( "取消选择图片" );
      //     },
      //     { filter: "image" }
      //   );
    },
    change(event) {
      let image = document.getElementById("img"); //预览对象
      this.clip(event, {
        resultObj: image, //图片信息
        aspectWithRatio: Number(this.widthRate),
        aspectHeightRatio: Number(this.heightRate)
      });
    },
    //初始化方法
    initilize(opt) {
      let self = this;
      this.options = opt;
      //创建dom
      this.createElement();
      this.resultObj = opt.resultObj;
      //初始化裁剪对象
      this.cropper = new Cropper(this.preview, {
        aspectRatio: opt.aspectWithRatio / opt.aspectHeightRatio,
        // aspectRatio: 1/1,
        autoCropArea: opt.autoCropArea || 0.8,
        viewMode: 1,
        guides: true,
        cropBoxResizable: true, //是否通过拖动来调整剪裁框的大小
        cropBoxMovable: true, //是否通过拖拽来移动剪裁框。
        dragCrop: false,
        dragMode: "move", //‘crop’: 可以产生一个新的裁剪框3 ‘move’: 只可以移动3 ‘none’: 什么也不处理
        center: true,
        zoomable: true, //是否允许放大图像。
        zoomOnTouch: true, //是否可以通过拖动触摸来放大图像。
        scalable: true,
        // maxCropBoxHeight: 200,
        // maxCropBoxWidth: 200,
        background: false,
        checkOrientation: true,
        checkCrossOrigin: true,
        zoomable: false,
        zoomOnWheel: false,
        center: false,
        toggleDragModeOnDblclick: false,
        ready: function() {
          // console.log(self.cropper.rotate(90))
          if (opt.aspectRatio == "Free") {
            let cropBox = self.cropper.cropBox;
            cropBox.querySelector("span.cropper-view-box").style.outline =
              "none";
            self.cropper.disable();
          }
        }
      });
    },
    //创建一些必要的DOM，用于图片裁剪
    createElement() {
      //初始化图片为空对象
      this.preview = null;
      let str =
        '<div><img id="clip_image" src="originUrl"></div><button type="button" id="cancel_clip">取消</button><button type="button" id="clip_button">确定</button>';
      str +=
        '<div class="crop_loading"><div class="crop_content"><div class="crop_text">图片修剪中...</div></div></div>';
      str +=
        '<div class="crop_success"><div class="crop_success_text">上传成功</div></div></div>';

      let body = document.getElementsByTagName("body")[0];
      this.reagion = document.createElement("div");
      this.reagion.id = "clip_container";
      this.reagion.className = "container";
      this.reagion.innerHTML = str;
      //添加创建好的DOM元素
      body.appendChild(this.reagion);
      this.preview = document.getElementById("clip_image");

      //绑定一些方法
      this.initFunction();
    },
    //初始化一些函数绑定
    initFunction() {
      let self = this;
      this.clickBtn = document.getElementById("clip_button");
      this.cancelBtn = document.getElementById("cancel_clip");
      //确定事件
      this.addEvent(this.clickBtn, "click", function() {
        self.crop();
      });
      //取消事件
      this.addEvent(this.cancelBtn, "click", function() {
        self.destoried();
      });
      //清空input的值
      this.addEvent(this.fileObj, "click", function() {
        this.value = "";
      });
    },
    //获取图片信息的方法
    clip(e, opt) {
      let self = this;

      this.fileObj = e.srcElement;

      let files = e.target.files || e.dataTransfer.files;

      if (!files.length) return this.open(); //不是图片弹出提示框

      //调用初始化方法
      this.initilize(opt);

      //获取图片文件资源
      this.picValue = files[0];

      //去获取拍照时的信息，解决拍出来的照片旋转问题
      // Exif.getData( files[0] , function(){
      //   self.Orientation = Exif.getTag( files[0], 'Orientation');
      //   console.log(self.Orientation)
      // });

      //调用方法转成url格式
      this.originUrl = this.getObjectURL(this.picValue);
      console.log(this.originUrl);
      //每次替换图片要重新得到新的url
      if (this.cropper) {
        this.cropper.replace(this.originUrl);
      }
    },
    //图片转码方法base64
    getObjectURL(file) {
      let url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    //点击确定进行裁剪
    crop() {
      let self = this;
      let image = new Image();
      let croppedCanvas;
      let roundedCanvas;

      // Crop
      document.querySelector(".crop_loading").style.display = "block";

      setTimeout(function() {
        croppedCanvas = self.cropper.getCroppedCanvas();
        // Round
        roundedCanvas = self.getRoundedCanvas(croppedCanvas);

        let imgData = roundedCanvas.toDataURL("image/jpeg", 0.5);
        image.src = imgData;

        //判断图片是否大于100k,不大于直接上传，反之压缩
        // if (imgData.length < 100 * 1024) {
        self.resultObj.src = imgData;
        //图片上传
        self.postImg(imgData);
        // } else {
        //   image.onload = function() {
        //     //压缩处理
        //     let data = self.compress(image, self.Orientation);
        //     self.resultObj.src = data;
        //     //图片上传
        //     self.postImg(data);
        //   };
        // }
      }, 20);
    },
    //获取裁剪图片资源
    getRoundedCanvas(sourceCanvas) {
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");
      let width = sourceCanvas.width;
      let height = sourceCanvas.height;

      canvas.width = width;
      canvas.height = height;

      context.imageSmoothingEnabled = true;
      context.drawImage(sourceCanvas, 0, 0, width, height);
      context.globalCompositeOperation = "destination-in";
      context.beginPath();
      context.rect(0, 0, width, height);
      context.fill();

      return canvas;
    },
    //销毁原来的对象
    destoried() {
      let self = this;
      //移除事件
      this.removeEvent(this.clickBtn, "click", null);
      this.removeEvent(this.cancelBtn, "click", null);
      this.removeEvent(this.fileObj, "click", null);
      //移除裁剪框
      this.reagion.parentNode.removeChild(this.reagion);

      //销毁裁剪对象
      this.cropper.destroy();
      this.cropper = null;
    },
    //图片上传
    postImg(imageData) {
      console.log("图片上传", imageData);
      // 进行上传图片
      showLoading();
      this.postRequest("/api/sendImg/uploadImg", {
        Base64Str: imageData.split("base64,")[1]
      }).then(res => {
        console.log(333, res.data.code);
        if (res.data.code == 0) {
          this.putRequest("/api/user/updataAvatar", {
            user_avatar: res.data.imgSrc,
            _id: this.userInfo.id
          }).then(res => {
            if (res.data.code == 0) {
              hideLoading();
              Toast({
                message: "图片已上传",
                iconClass: "icon icon-success"
              });
            }
          });
        } else {
          hideLoading();
          Toast("图片上传失败");
        }
      });
      //这边写图片的上传
      let self = this;
      self.destoried();

      // window.setTimeout( function () {
      //   document.querySelector('.crop_loading').style.display = 'none';
      //   document.querySelector('.crop_success').style.display = 'block';
      //   //裁剪完后摧毁对象
      //     self.destoried();
      // },3000)
    },
    //图片旋转
    rotateImg(img, direction, canvas) {
      //最小与最大旋转方向，图片旋转4次后回到原方向
      const min_step = 0;
      const max_step = 3;
      if (img == null) return;
      //img的高度和宽度不能在img元素隐藏后获取，否则会出错
      let height = img.height;
      let width = img.width;
      let step = 2;
      if (step == null) {
        step = min_step;
      }
      if (direction == "right") {
        step++;
        //旋转到原位置，即超过最大值
        step > max_step && (step = min_step);
      } else {
        step--;
        step < min_step && (step = max_step);
      }
      //旋转角度以弧度值为参数
      let degree = (step * 90 * Math.PI) / 180;
      let ctx = canvas.getContext("2d");
      switch (step) {
        case 0:
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0);
          break;
        case 1:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, 0, -height);
          break;
        case 2:
          canvas.width = width;
          canvas.height = height;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, -height);
          break;
        case 3:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, 0);
          break;
      }
    },
    //图片压缩
    compress(img, Orientation) {
      console.log(img, Orientation);
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      //瓦片canvas
      let tCanvas = document.createElement("canvas");
      let tctx = tCanvas.getContext("2d");
      let initSize = img.src.length;
      let width = img.width;
      let height = img.height;

      //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio;
      if ((ratio = (width * height) / 4000000) > 1) {
        console.log("大于400万像素");
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
      } else {
        ratio = 1;
      }
      canvas.width = width;
      canvas.height = height;
      //        铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      //如果图片像素大于100万则使用瓦片绘制
      let count;
      if ((count = (width * height) / 1000000) > 1) {
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
        //            计算每块瓦片的宽和高
        let nw = ~~(width / count);
        let nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(
              img,
              i * nw * ratio,
              j * nh * ratio,
              nw * ratio,
              nh * ratio,
              0,
              0,
              nw,
              nh
            );
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height);
      }
      //修复ios上传图片的时候 被旋转的问题
      if (Orientation != "" && Orientation != 1) {
        switch (Orientation) {
          case 6: //需要顺时针（向左）90度旋转
            this.rotateImg(img, "left", canvas);
            break;
          case 8: //需要逆时针（向右）90度旋转
            this.rotateImg(img, "right", canvas);
            break;
          case 3: //需要180度旋转
            this.rotateImg(img, "right", canvas); //转两次
            this.rotateImg(img, "right", canvas);
            break;
        }
      }
      //进行最小压缩
      // let ndata = canvas.toDataURL( 'image/jpeg' , 0.1);
      let ndata = canvas.toDataURL("image/jpeg", 0.5);
      console.log("压缩前：" + initSize);
      console.log("压缩后：" + ndata.length);
      console.log(
        "压缩率：" + ~~((100 * (initSize - ndata.length)) / initSize) + "%"
      );
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;

      return ndata;
    },
    //添加事件
    addEvent(obj, type, fn) {
      if (obj.addEventListener) {
        obj.addEventListener(type, fn, false);
      } else {
        obj.attachEvent("on" + type, fn);
      }
    },
    //移除事件
    removeEvent(obj, type, fn) {
      if (obj.removeEventListener) {
        obj.removeEventListener(type, fn, false);
      } else {
        obj.detachEvent("on" + type, fn);
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.updateUserAvatar {
  margin-top: 1.6rem;
}

.inputName {
  background-color: white;
  font-size: 0.5rem;
  width: 90%;
  border: 1px solid #ccc;
  height: 1.5rem;
  text-align: left;
  padding-left: 0.5rem;
  border-radius: 0.2rem;
  margin: 0rem auto;
  display: block;
}

.userNameSubmit {
  margin-top: 0.5rem;
  height: 1.5rem;
  width: 90%;
  border-radius: 0.2rem;
  font-size: 0.6rem;
}

.canUserNameSubmit {
  margin-top: 0.5rem;
  height: 1.5rem;
  width: 90%;
  border-radius: 0.2rem;
  font-size: 0.6rem;
  background: linear-gradient(to bottom, #5bc5a4 0%, #a1d4c7 100%);
}

.right {
  float: right;
  margin-top: -0.6rem;
  margin-right: 0.2rem;
  width: 1rem;
  height: 1rem;
}

.icon-gengduo {
  font-size: 0.6rem;
  color: #fff;
}

.userAvatar {
  width: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>


<style scoped>
.vue-box .file {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  top: 0;
  left: 0;
  z-index: 99;
  cursor: pointer;
}

/* img {
  display: none;
  width: 100%;
  height: 100%;
} */

h3 {
  text-align: center;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
 
* {
  margin: 0;
  padding: 0;
}
 
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
} */

img {
  /*display: block;*/
  /*margin: 0 auto;*/
}

/* input[type='file'] {
  outline: none;
  margin-top: 20px;
} */

/* * {
  margin: 0;
  padding: 0;
} */

#clip_button {
  position: absolute;
  right: 10%;
  bottom: 20px;
  width: 80px;
  height: 40px;
  border: none;
  border-radius: 2px;
  background: #1aad19;
  color: #fff;
}

#cancel_clip {
  position: absolute;
  left: 10%;
  bottom: 20px;
  width: 80px;
  height: 40px;
  border: none;
  border-radius: 2px;
  color: #fff;
  background: #e64340;
}

#clip_container.container {
  z-index: 99999;
  position: fixed;
  padding-top: 60px;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 1);
}

#clip_container.container > div {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

#clip_image {
  max-width: 100%;
}

.cropper-container {
  font-size: 0;
  line-height: 0;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  direction: ltr;
  -ms-touch-action: none;
  touch-action: none;
}

.crop_loading,
.crop_success {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
}

.crop_loading .crop_content {
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  background: #000;
  opacity: 0.9;
  height: 66px;
  width: 140px;
  vertical-align: middle;
  color: #fff;
  padding-top: 20px;
  font-size: 16px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.crop_loading .crop_content img {
  margin-top: 15px;
  margin-bottom: 10px;
}

.crop_success .crop_success_text {
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  background: #000;
  opacity: 0.9;
  width: 120px;
  height: 30px;
  color: #fff;
  line-height: 30px;
  font-size: 16px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.cropper-container img {
  /* Avoid margin top issue (Occur only when margin-top <= -height) */
  display: block;
  min-width: 0 !important;
  max-width: none !important;
  min-height: 0 !important;
  max-height: none !important;
  width: 100%;
  height: 100%;
  image-orientation: 0deg;
}

.cropper-wrap-box,
.cropper-canvas,
.cropper-drag-box,
.cropper-crop-box,
.cropper-modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.cropper-wrap-box {
  overflow: hidden;
}

.cropper-drag-box {
  opacity: 0;
  background-color: #fff;
}

.cropper-modal {
  opacity: 0.5;
  background-color: #000;
}

.cropper-view-box {
  display: block;
  overflow: hidden;

  width: 100%;
  height: 100%;

  outline: 1px solid #39f;
  outline-color: rgba(51, 153, 255, 0.75);
}

.cropper-dashed {
  position: absolute;

  display: block;

  opacity: 0.5;
  border: 0 dashed #eee;
}

.cropper-dashed.dashed-h {
  top: 33.33333%;
  left: 0;
  width: 100%;
  height: 33.33333%;
  border-top-width: 1px;
  border-bottom-width: 1px;
}

.cropper-dashed.dashed-v {
  top: 0;
  left: 33.33333%;
  width: 33.33333%;
  height: 100%;
  border-right-width: 1px;
  border-left-width: 1px;
}

.cropper-center {
  position: absolute;
  top: 50%;
  left: 50%;

  display: block;

  width: 0;
  height: 0;

  opacity: 0.75;
}

.cropper-center:before,
.cropper-center:after {
  position: absolute;
  display: block;
  content: " ";
  background-color: #eee;
}

.cropper-center:before {
  top: 0;
  left: -3px;
  width: 7px;
  height: 1px;
}

.cropper-center:after {
  top: -3px;
  left: 0;
  width: 1px;
  height: 7px;
}

.cropper-face,
.cropper-line,
.cropper-point {
  position: absolute;

  display: block;

  width: 100%;
  height: 100%;

  opacity: 0.1;
}

.cropper-face {
  top: 0;
  left: 0;

  background-color: #fff;
}

.cropper-line {
  background-color: #39f;
}

.cropper-line.line-e {
  top: 0;
  right: -3px;
  width: 5px;
  cursor: e-resize;
}

.cropper-line.line-n {
  top: -3px;
  left: 0;
  height: 5px;
  cursor: n-resize;
}

.cropper-line.line-w {
  top: 0;
  left: -3px;
  width: 5px;
  cursor: w-resize;
}

.cropper-line.line-s {
  bottom: -3px;
  left: 0;
  height: 5px;
  cursor: s-resize;
}

.cropper-point {
  width: 5px;
  height: 5px;

  opacity: 0.75;
  background-color: #39f;
}

.cropper-point.point-e {
  top: 50%;
  right: -3px;
  margin-top: -3px;
  cursor: e-resize;
}

.cropper-point.point-n {
  top: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: n-resize;
}

.cropper-point.point-w {
  top: 50%;
  left: -3px;
  margin-top: -3px;
  cursor: w-resize;
}

.cropper-point.point-s {
  bottom: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: s-resize;
}

.cropper-point.point-ne {
  top: -3px;
  right: -3px;
  cursor: ne-resize;
}

.cropper-point.point-nw {
  top: -3px;
  left: -3px;
  cursor: nw-resize;
}

.cropper-point.point-sw {
  bottom: -3px;
  left: -3px;
  cursor: sw-resize;
}

.cropper-point.point-se {
  right: -3px;
  bottom: -3px;
  width: 20px;
  height: 20px;
  cursor: se-resize;
  opacity: 1;
}

@media (min-width: 768px) {
  .cropper-point.point-se {
    width: 15px;
    height: 15px;
  }
}

@media (min-width: 992px) {
  .cropper-point.point-se {
    width: 10px;
    height: 10px;
  }
}

@media (min-width: 1200px) {
  .cropper-point.point-se {
    width: 5px;
    height: 5px;
    opacity: 0.75;
  }
}

.cropper-point.point-se:before {
  position: absolute;
  right: -50%;
  bottom: -50%;
  display: block;
  width: 200%;
  height: 200%;
  content: " ";
  opacity: 0;
  background-color: #39f;
}

.cropper-invisible {
  opacity: 0;
}

.cropper-bg {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC");
}

.cropper-hide {
  position: absolute;

  display: block;

  width: 0;
  height: 0;
}

.cropper-hidden {
  display: none !important;
}

.cropper-move {
  cursor: move;
}

.cropper-crop {
  cursor: crosshair;
}

.cropper-disabled .cropper-drag-box,
.cropper-disabled .cropper-face,
.cropper-disabled .cropper-line,
.cropper-disabled .cropper-point {
  cursor: not-allowed;
}
</style>