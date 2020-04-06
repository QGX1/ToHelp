<template>
    <div id="addImg">
        <div class="file-list">
            <div class="thumbnails my-gallery">
                <figure
                    itemprop="associatedMedia"
                    itemscope
                    class="thumbnail"
                    v-for="(item,index) in files"
                    :key="index"
                >
                    <a :href="item.src" itemprop="contentUrl" data-size="400x400" class="img-wrapper">
                        <img :src="item.src" itemprop="thumbnail">
                    </a>
                    <span class="file-remove" @click.stop="remove(index)">×</span>
                </figure>
                <section class="thumbnail" v-if="this.files.length < 9">
                    <div class="add">
                        <span>+</span>
                        <input
                            type="file"
                            @change="selectImgs"
                            multiple="multiple"
                            accept="image/*"
                            ref="file"
                        >
                    </div>
                </section>
            </div>
            <!-- 图片放大预览 -->
            <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="pswp__bg"></div>
                <div class="pswp__scroll-wrap">
                    <div class="pswp__container">
                        <div class="pswp__item"></div>
                        <div class="pswp__item"></div>
                        <div class="pswp__item"></div>
                    </div>
                    <!-- 预览区域顶部的默认UI，可以修改 -->
                    <div class="pswp__ui pswp__ui--hidden">
                        <div class="pswp__top-bar">
                            <!--  与图片相关的操作 -->
                            <div class="pswp__counter"></div>
                            <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                            <!--将分享按钮去掉 -->
                            <!-- <button class="pswp__button pswp__button--share" title="Share"></button>
                          <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                            <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button> -->
                            <div class="pswp__preloader">
                                <div class="pswp__preloader__icn">
                                    <div class="pswp__preloader__cut">
                                        <div class="pswp__preloader__donut"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                            <div class="pswp__share-tooltip"></div>
                        </div>
                        <button
                            class="pswp__button pswp__button--arrow--left"
                            title="Previous (arrow left)"
                        ></button>
                        <button
                            class="pswp__button pswp__button--arrow--right"
                            title="Next (arrow right)"
                        ></button>
                        <!-- x删除按钮 -->
                        <div class="pswp__caption">
                            <div class="pswp__caption__center"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import PhotoSwipe from "photoswipe";
import PhotoSwipeUI_Default from "photoswipe/dist/photoswipe-ui-default";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
// import { setTimeout } from "timers";
export default {
  name: "addImg",
  data() {
    return {
      files: [], //文件缓存
      index: 0, //序列号
      maxLength: 9, //图片最大数量
      maxSize: 10240000 //图片限制为10m
    };
  },
  methods: {
    selectImgs() {
      // console.log(111,this.$refs.file.files)
      let fileList = this.$refs.file.files;
      if (fileList.length > 9) {
        alert("最多只能选择9张照片");
      } else {
        let tempList = []; //每次点击+号后选择的图片信息
        fileList.forEach((item, index) => {
          /**
           * 存储图片信息
           */
          let fileItem = {
            Id: this.index++,
            name: item.name,
            size: item.size,
            file: item.file
          };
          /**
           * 将图片转化成base64
           */
          let reader = new FileReader();
          // 获取base64编码
          reader.onloadend = e => {
            // e.target.result为图片信息
            this.getBase64(e.target.result).then(url => {
              this.$set(fileItem, "src", url);
            });
          };
          // console.log(55555,fileItem)
          if (fileItem.size > this.maxSize) {
            Toast("上传图片不能超过10M");
          } else {
            reader.readAsDataURL(item); //转换，参数必须是blob对象
            tempList.push(fileItem);
            this.files.push(fileItem);
            // console.log(this.files);
          }
        });
        // 向父组件发射事件
        setTimeout(() => {
          this.$emit("getFiles", tempList);
        }, 300);
        if (this.files.length > this.maxLength) {
          this.files.splice(9);
          alert("只能上传9张照片");
        }
      }
    },
    /**
     * 图片压缩并保存到files
     */
    getBase64(url) {
      let self = this;
      let Img = new Image(),
        dataUrl = "";
      Img.src = url;
      // console.log(99,Img)
      let p = new Promise(function(resole, reject) {
        Img.onload = function() {
          // 要先确保图片完整取到，这是个异步事件
          let canvas = document.createElement("canvas"), //创建canvas元素
            width = Img.width, //确保canvas的尺寸和图片一样
            height = Img.height;
          //默认将图片长宽设置为图片的原始长度，这样不超过最大长度时就不需要处理
          let ratio = width / height,
            maxLength = 1000,
            newHeight = height,
            newWidth = width;
          // 如果长宽超过做大长度时，按图片长度比例等比缩小
          if (width > maxLength || height > maxLength) {
            if (width > height) {
              newWidth = maxLength;
              newHeight = maxLength / ratio;
            } else {
              newWidth = maxLength * ratio;
              newHeight = maxLength;
            }
          }
          canvas.width = newWidth;
          canvas.height = newHeight;
          canvas.getContext("2d").drawImage(Img, 0, 0, newWidth, newHeight); //将图片绘制到canvaa中
          dataUrl = canvas.toDataURL("image/jpeg", 0.5); //转换图片为dataUrl
          // console.log(888,dataUrl)
          resole(dataUrl);
        };
      });
      // console.log(8880,p)
      return p;
    },
    /**
     * 删除指定图片
     */
    remove(index) {
      console.log(222, index);
      this.files.splice(index, 1);
      setTimeout(() => {
        this.$emit("removeFiles", index);
      }, 300); //向父组件发送事件
    },
    //引入photoSwipe(可预览、滑动)
    initPhotoSwipeFromDOM(gallerySelector) {
        // console.log("gallerySelector",gallerySelector)
      var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
          numNodes = thumbElements.length,
          items = [],
          figureEl,
          linkEl,
          size,
          item;
        for (var i = 0; i < numNodes - 1; i++) {
          figureEl = thumbElements[i];
          if (figureEl.nodeType !== 1) {
            continue;
          }
          linkEl = figureEl.children[0];
          var img = new Image();
          img.src = linkEl.getAttribute("href");
          linkEl.setAttribute(
            "data-size",
            img.naturalWidth + "x" + img.naturalHeight
          );
          size = linkEl.getAttribute("data-size").split("x");
          item = {
            src: linkEl.getAttribute("href"),
            w: parseInt(size[0], 10),
            h: parseInt(size[1], 10)
          };
          if (figureEl.children.length > 1) {
            item.title = figureEl.children[1].innerHTML;
          }
          if (linkEl.children.length > 0) {
            item.msrc = linkEl.children[0].getAttribute("src");
          }
          item.el = figureEl;
          items.push(item);
        }
        return items;
      };
      var closest = function closest(el, fn) {
        return el && (fn(el) ? el : closest(el.parentNode, fn));
      };
      var onThumbnailsClick = function(e) {
        e = e || window.event;
        // e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        var eTarget = e.target || e.srcElement;
        var clickedListItem = closest(eTarget, function(el, e) {
          return el.tagName && el.tagName.toUpperCase() === "FIGURE";
        });

        if (!clickedListItem) {
          return;
        }
        var clickedGallery = clickedListItem.parentNode,
          childNodes = clickedListItem.parentNode.childNodes,
          numChildNodes = childNodes.length,
          nodeIndex = 0,
          index;
        for (var i = 0; i < numChildNodes; i++) {
          if (childNodes[i].nodeType !== 1) {
            continue;
          }
          if (childNodes[i] === clickedListItem) {
            index = nodeIndex;
            break;
          }
          nodeIndex++;
        }

        if (index >= 0) {
          openPhotoSwipe(index, clickedGallery);
        }
        return false;
      };
      var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
          params = {};
        if (hash.length < 5) {
          return params;
        }
        var vars = hash.split("&");
        for (var i = 0; i < vars.length; i++) {
          if (!vars[i]) {
            continue;
          }
          var pair = vars[i].split("=");
          if (pair.length < 2) {
            continue;
          }
          params[pair[0]] = pair[1];
        }
        if (params.gid) {
          params.gid = parseInt(params.gid, 10);
        }
        return params;
      };

      var openPhotoSwipe = function(
        index,
        galleryElement,
        disableAnimation,
        fromURL
      ) {
        var pswpElement = document.querySelectorAll(".pswp")[0],
          gallery,
          options,
          items;
        items = parseThumbnailElements(galleryElement);
        options = {
          history: false,
          tapToClose: true,
          galleryUID: galleryElement.getAttribute("data-pswp-uid"),
          getThumbBoundsFn: function(index) {
            var thumbnail = items[index].el.getElementsByTagName("img")[0],
              pageYScroll =
                window.pageYOffset || document.documentElement.scrollTop,
              rect = thumbnail.getBoundingClientRect();
            return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
          }
        };
        if (fromURL) {
          if (options.galleryPIDs) {
            for (var j = 0; j < items.length; j++) {
              if (items[j].pid == index) {
                options.index = j;
                break;
              }
            }
          } else {
            options.index = parseInt(index, 10) - 1;
          }
        } else {
          options.index = parseInt(index, 10);
        }
        if (isNaN(options.index)) {
          return "";
        }
        if (disableAnimation) {
          options.showAnimationDuration = 0;
        }

        gallery = new PhotoSwipe(
          pswpElement,
          PhotoSwipeUI_Default,
          items,
          options
        );
        gallery.init();
      };
      var galleryElements = document.querySelectorAll(gallerySelector);
      for (var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute("data-pswp-uid", i + 1);
        galleryElements[i].onclick = onThumbnailsClick;
      }
      var hashData = photoswipeParseHash();
      if (hashData.pid && hashData.gid) {
        openPhotoSwipe(
          hashData.pid,
          galleryElements[hashData.gid - 1],
          true,
          true
        );
      }
    }
  },
  mounted() {
    this.initPhotoSwipeFromDOM(".my-gallery");
  }
};
</script>
<style lang="stylus" scoped>
#addImg {
    flex: 1;
    margin-top: auto;
    padding-left: 0.1rem;

    .file-list {
        padding: 10px 0px;

        &::after {
            content: '';
            display: block;
            clear: both;
            visibility: hidden;
            line-height: 0;
            font-size: 0;
        }

        .file-remove {
            position: absolute;
            font-size: 0.5rem;
            color: white;
            top: 0px;
            right: 0px;
            z-index: 1000;
            line-height: 0.6rem;
            background: rgba(0, 0, 0, 0.25);
            display: inline-block;
            width: 0.5rem;
            height: 0.5rem;
            text-align: center;
            transform: translateY(10%);
        }

        &:hover .file-remove {
            display: inline;
        }
    }

    .thumbnails {
        width: 100%;
        display: flex;
        flex-wrap: wrap;

        .thumbnail {
            position: relative;
            width: 32%;
            height: 3.5rem;
            overflow: hidden;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            margin: 0 0.1rem 0.1rem 0;

            @media screen and (min-width: 768px) and (max-width: 1024px) {
                height: 4rem;
            }

            .img-wrapper {
                position: relative;
                display: flex;
                height: 100%;
            }

            img {
                width: 100%;
                height: auto;
                max-width: 100%;
                max-height: 100%;
            }
        }
    }

    .add {
        width: 100%;
        height: 100%;
        float: left;
        text-align: center;
        line-height: 1rem;
        font-weight: 100;
        border: 1px dashed #ccc;
        color: #999;
        position: relative;

        input[type='file'] {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
        }

        >span {
            font-size: 0.6rem;
            margin-top: 45%;
            display: inline-block;
            transform: translate(0%, 0%);
        }
    }
}
</style>

