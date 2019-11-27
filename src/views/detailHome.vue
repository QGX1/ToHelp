<template>
  <div id="detailHome">
    <HeaderTop title="首页">
      <!-- title为岗位 -->
      <router-link to="/" slot="left" class="left">
        <span>
          <i class="iconfont icon-fanhui1"></i>
        </span>
      </router-link>
    </HeaderTop>
    <!-- 头部标题 -->
    <div class="job_content">
      <section class="job_information">
        <div class="job_information_top">
          <h1 class="job_title">{{post}}</h1>
          <div class="job_salary">{{salary}}</div>
        </div>
        <div class="job_sist">
          <span>
            <i class="iconfont icon-weizhi"></i>
            {{sist}}
          </span>
          <span>
            <i class="iconfont icon-gongzuojingli"></i>
            {{ask_for}}
          </span>
          <span>
            <i class="iconfont icon-edu-line"></i>
            {{ask_educat}}
          </span>
        </div>
        <br>
      </section>
      <!-- 联系人 -->
      <section class="hr_information">
        <div class="job_hr_img">
          <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573017585034&di=73d85c084764c80e5eac6d0f76abf5d4&imgtype=0&src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201610%2F03%2F20161003145053_X25ky.jpeg"
          >
        </div>
        <div class="job_hr_name">{{hr_name}}</div>
        <div class="job_hr_information">
          <span>{{company}}</span>
          <span>
            <!-- <i class="iconfont icon-dian"></i> -->
          </span>
          <span>{{hr_duty}}</span>
        </div>
      </section>
      <section class="job_descript">
        <div class="descript_title">
          <b>职位详情：</b>
        </div>
        <div class="descript_job">
          <span class="descript_content">职位描述：</span>
          <ul>
            <li>1、负责1111</li>
            <li>2、负责2222</li>
          </ul>
        </div>
        <transition name="job">
          <div v-show="isMore" class="descript_job1">
            <span>任职要求：</span>
            <ul>
              <li>1、负责1111</li>
              <li>2、负责2222</li>
            </ul>
          </div>
        </transition>
        <div class="toggle_more">
          <p v-if="isMore" class="toggle-up">
            <i class="iconfont icon-weibiaoti33" @click="toggleMore"></i>
          </p>
          <p v-else class="toggle-down">
            <i class="iconfont icon-weibiaoti33-copy" @click="toggleMore"></i>
          </p>
        </div>
      </section>
      <section @click="addClickHandler">
        <!-- 地图 -->
        <div style="height:200px;border:#ccc solid 1px;font-size:12px" id="map" class="map"></div>
      </section>
      <section class="toTips">
        <span class="tips">
          <i class="iconfont icon-warning"></i>
          温馨提示
        </span>
        <span class="tips2">
          <p>该Boss承诺名下所有职位不向您收费，如有不实，请立即举报!</p>
        </span>
      </section>
    </div>
    <div class="toImmediately">
      <mt-button type="primary" size="large">立即沟通</mt-button>
    </div>
  </div>
</template>

<style lang="stylus" rel='stylesheet/stylus' scoped>
.toTips {
  margin-top: 0.5rem;
  margin-left: 0.2rem;
}

span.tips {
  color: red;
  font-size: 0.5rem;
  display: block;
  text-align: left;
}

i.iconfont.icon-warning {
  font-size: 0.6rem;
}

span.tips2 {
  font-size: 0.4rem;
  text-align: left;
}

.left {
  left: 0.2rem;
  position: absolute;
  top: 0.1rem;

  i.iconfont.icon-fanhui1 {
    font-size: 0.8rem;
    color: #565252;
  }
}

.job_content {
  margin-top: 1rem;
  background-color: rgba(255, 255, 255, 0.64);
  height: 15.1rem;
  overflow-x: hidden;
  overflow-y: scroll;
  position: fixed;
  width: 100%;
}

.job_content::-webkit-scrollbar {
  display: none;
}

section.job_information {
  border-bottom: 1px solid #f1f1f1;
  border-width: 80%;
  width: 92%;
  margin: 0 auto;
}

.job_information_top {
  display: flex;
  justify-content: space-between;
}

.job_title {
  font-size: 0.7rem;
  padding-left: 0.3rem;
  padding-top: 0.2rem;
  width: 65%;
  text-align: left;
  color: rgba(16, 31, 31, 0.831);
}

.job_salary {
  font-size: 0.4rem;
  font-weight: bold;
  padding-right: 0.4rem;
  padding-top: 0.4rem;
  color: #35d8a5;
}

.job_company {
  font-size: 0.4rem;
  padding-left: 0.5rem;
  text-align: left;
}

.job_sist {
  text-align: left;
  margin-left: 0.3rem;
  margin-top: 0.1rem;
  height: 0.7rem;
}

.job_sist span {
  float: left;
  text-align: center;
  color: rgba(8, 8, 10, 0.82);
  height: 0.4rem;
  font-size: 0.3rem;
  margin-right: 0.4rem;
}

.job_sist .iconfont {
  font-size: 0.5rem;
  color: #5ac5a5;
}

section.hr_information {
  text-align: left;
  margin-left: 0.5rem;
  display: flex;
  margin-top: 0.3rem;
  border-bottom: 1px solid #f1f1f1;
  margin: 0 auto;
  width: 92%;
}

.job_hr_name {
  margin-top: 0.5rem;
  font-size: 0.3rem;
  font-weight: 600;
}

img {
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  border: none;
  margin: 0.2rem;
}

.job_hr_information {
  color: rgba(0, 9, 16, 0.749);
  margin-left: -1.6rem;
  margin-top: 1.1rem;
}

.job_hr_information span {
  margin-right: 0.3rem;
}

section.job_descript {
  width: 90%;
  margin: 0.5rem auto;
  border-bottom: 1px solid #f1f1f1;
}

.descript_title {
  text-align: left;
  margin-bottom: 0.2rem;
  font-size: 0.4rem;
  color: #000e0ebd;
}

.job-enter-active, .job-leave-active {
  transition: opacity 0.5s;
}

.job-enter, .job-leave-to { /* .fade-leave-active below version 2.1.8 */
  opacity: 0;
}

.descript_job, .descript_job1 {
  margin: 0.2rem;

  span {
    display: block;
    text-align: left;
    width: 100%;
    margin-top: 0.2rem;
    font-size: 0.4rem;
    color: #cc7e0b;
  }

  ul {
    display: table;
    padding-top: 0.2rem;
    font-size: 0.38rem;
    color: #999;
  }
}

.toImmediately {
  bottom: 0.25rem;
  position: fixed;
  width: 96%;
  left: 0.2rem;
}

.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
<style scoped>
.toImmediately .mint-button--primary {
  color: #fff;
  background-color: #64caaa;
}
/*
    去除百度地图版权
    去除右上角[地图、卫星、三维]控件
    去除百度地图右上角平移缩放控件的市县区文字
    */
.map >>> .anchorBL,
.anchorTR,
.BMap_zlHolder {
  display: none;
  visibility: hidden;
}
</style>

<script>
import { MessageBox, Toast } from "mint-ui";
import HeaderTop from "../components/HeaderTop";
export default {
  name: "detailHome",
  components: {
    HeaderTop
  },
  data() {
    return {
      //初始化无限加载相关参数
      queryLoading: false,
      moreLoading: false, //加载更多
      allLoaded: false, //全部加载
      totalNum: 0, //总数
      pageSize: 10, //页面长度
      pageNum: 1, //从页面为1的开始
      post: "前端开发1111222222",
      company: "公司名称",
      salary: "6元/小时",
      sist: "地点1111111",
      ask_for: "要求",
      ask_educat: "本科",
      hr_img: "招聘者头像",
      hr_name: "招聘者名称",
      hr_duty: "招聘者职务",
      isMore: false, //显示控制
      divHeight: Number, //div初始时高度
      map: "",
      lat: 114.187729,
      lng: 23.000593
    };
  },
  mounted() {
    this.divHeight = 0;
    this.createMap(); //创建地图
    this.setMapEvent(); //设置地图事件
    this.addMapControl(); //向地图添加控件
    this.addMapOverlay(); //向地图添加覆盖物
  },
  methods: {
    //创建地图
    createMap() {
      this.map = new BMap.Map("map"); //实例化地图
      this.map.centerAndZoom(new BMap.Point(114.187729, 23.000593), 15); //公司地理位置的经纬度
      // 初始化地图
      this.map.disableDragging(); //禁止拖拽
      this.map.disableScrollWheelZoom(); //禁止缩放
      this.map.disableDoubleClickZoom(); //禁止双击放大
      this.map.disableDoubleClickZoom(); //禁止双击缩放事件
      this.map.disablePinchToZoom(); //禁用双指操作
    },
    setMapEvent() {},
    //设置地图事件
    addClickHandler() {
      // 事件监听，路由跳转
      this.$options.methods.getCity();
      this.$options.methods.createMap(); //创建地图
      this.$options.methods.setMapEvent(); //设置地图事件
      this.$options.methods.addMapControl(); //向地图添加控件
      this.$options.methods.addMapOverlay(); //向地图添加覆盖物
      // this.$options.methods.addMapOverlay()
    },
    // 向地图添加覆盖物
    addMapOverlay() {
      // 窗口信息
      var markers = [
        {
          content: "惠州潼湖科技小镇",
          title: "公司地址",
          imageOffset: { width: 0, height: -21 },
          position: { lat: 23.001292, lng: 114.187226 }
        }
      ];
      for (var index = 0; index < markers.length; index++) {
        var point = new BMap.Point(
          markers[index].position.lng,
          markers[index].position.lat
        );
        var marker = new BMap.Marker(point, {
          icon: new BMap.Icon(
            "http://api.map.baidu.com/lbsapi/createmap/images/icon.png",
            new BMap.Size(20, 25),
            {
              imageOffset: new BMap.Size(
                markers[index].imageOffset.width,
                markers[index].imageOffset.height
              )
            }
          )
        }); //标识地理的标志
        var opts = {
          // width: 200,
          title: markers[index].title, //信息窗口标题
          height: 0, //信息窗口高度
          enableMessage: true //是否在信息窗里显示短信发送按钮
        };
        var infoWindow = new BMap.InfoWindow(markers[index].content, opts); //创建信息窗口对象
        infoWindow.addEventListener("open", function(type, target, point) {
          //窗口打开是，隐藏自带的关闭按钮
          $(".BMap_pop>img").hide();
        });

        // 异步加载的原因，要延迟几秒钟才能渲染出来
        setTimeout(() => {
          marker.openInfoWindow(infoWindow);
        });
        this.map.addOverlay(marker);
      }
    },
    
    //向地图添加控件
    addMapControl() {},
    // 点击显示更多
    toggleMore() {
      this.isMore = !this.isMore;
    },
    //无限加载函数
    loadMore() {
      if (this.allLoaded) {
        this.moreLoading = true;
        return;
      }
      if (this.queryLoading) {
        return;
      }
      this.moreLoading = !this.queryLoading;
      this.pageNum++;
      // this.$http.post("请求后台数据的接口",Object.assign({pageNum:this.pageNum},this.params)).then((res) => {
      //   if(res.sData && res.sData.list){
      //     this.list = this.list.concat(res.sData.list);
      //     this.allLoaded = this.debtList.length==this.totalNum;
      //   }
      //   this.moreLoading = this.allLoaded;
      // });
      if (list) {
        this.list = this.list.concat(res.sData.list);
        this.allLoaded = this.debtList.length == this.totalNum;
      } else {
        this.moreLoading = this.allLoaded;
      }
    },
    // 跳转到百度地图
    getCity() {
      let _this = this;
      MessageBox.confirm("", {
        title: "提示",
        message: "是否授权百度地图获取您当前位置",
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      })
        .then(action => {
          console.log("action", action);
          if (action == "confirm") {
            console.log(1111);
            // 允许获取当前地理位置
            // 该方法谷歌浏览器不支持
            // if(navigator.geolocation){
            //  navigator.geolocation.getCurrentPosition(
            //      function (position) {//传入了对象position
            //          showMap(position.coords.latitude,position.coords.longitude);
            //    },
            //    function (err) {//传入了error对象
            //         console.log( err.code + '\n'+err.message);//Firefox3.6以上不支持error对象的message属性
            //          //error对象的code属性有如下属性值:
            //          //PERMISSION_DENIED(1):(permission_denied):用户单机信息条上的“不共享”按钮或直接拒绝被获取位置信息
            //          //POSITION_UNAVAILABLE(2):(position_unavailable):(position_unavailable)网络不可用或者无法连接到获取位置信息的卫星
            //          //TIMEOUT(3):(timeout)网络可用但在计算机用户的位置上花费过长时间
            //          //UNKNOWN_ERROR(0):(unknown_error)发生其他未知错误
            //      }
            //  )
            //  }else {
            //       console.log( "您当前使用的浏览器不支持地理定位服务")
            //   }
            // console.log("navigator",navigator.geolocation.getCurrentPosition())
            
            var geolocation = new BMap.Geolocation(); //获取当前经纬度
            geolocation.getCurrentPosition(function(r) {//使用百度地图获取当前位置定位不准确。
              console.log(113.501851, 23.456728);//华软经纬度
              console.log(r.point.lng, r.point.lat);
              console.log("r", r);
              if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                  const myGeo = new BMap.Geocoder();
                  myGeo.getLocation(
                    new BMap.Point(r.point.lng, r.point.lat),
                    data => {
                      console.log("data", data);
                      if (data.addressComponents) {
                        const result = data.addressComponents;
                        console.log("result", result);
                        const location = {
                          //用户当前的位置
                          creditLongitude: r.point.lat, // 经度
                          creditLatitude: r.point.lng, // 纬度
                          creditProvince: result.province || "", // 省
                          creditCity: result.city || "", // 市
                          creditArea: result.district || "", // 区
                          creditStreet:
                            (result.street || "") + (result.streetNumber || "") // 街道
                        };
                        console.log("location", location);
                        _this.location = location;
                        _this.creditLongitude = location.creditLongitude; //当前经度
                        _this.creditLatitude = location.creditLatitude; //当前纬度
                        _this.creditCity = location.creditCity;
                        console.log("_this.creditLongitude",_this.creditLongitude,"_this.creditLatitude",_this.creditLatitude)
                        // 获取到当前的经纬度，根据起点与终点经纬度请求百度地图的接口
                        // _this.creditLongitude 23.1200491 _this.creditLatitude 113.30764968
                        var url =
                          "http://api.map.baidu.com/direction?origin=latlng:" +
                          23.456728 +
                          "," +
                           113.501851+
                          "|name:当前位置&destination=" +
                          '惠州潼湖科技小镇'+ 
                          "&mode=driving&region=" +
                          "惠州市" +
                          "&output=html&src=webapp.baidu.openAPIdemo&vt=map";
                        console.log("url", url);
                        window.location.href = url
                        //  "http://api.map.baidu.com/direction?origin=latlng:34.264642646862,108.95108518068|name:我家&destination=大雁塔&mode=driving&region=西安&output=html&src=webapp.baidu.openAPIdemo&vt=map";
                      }
                    }
                  );
                // }
              } else {
                alert("定位失败");
              }
            });
          }
        })
        .catch(error => {
          if (error == "cancel") {
            // _this.$router.push({ path: "/home/detailHome" }).then(() => {
              Toast("您已拒绝地理位置授权");
            // });
          } else {
            throw error;
          }
        });
    }
  },
  showMap(lat,lon) {//自定义了一个在浏览器上显示地理信息的函数
      var str = "您当前位置的维度："+lat+"，经度："+lon;
      console.log(str)
        // GetID.innerHTML = str;
  }
};
</script>


