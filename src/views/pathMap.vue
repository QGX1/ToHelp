<template>
  <div id="path_map">
    <div id="container"></div>
  </div>
</template>
<script>
import { MessageBox, Toast } from "mint-ui";
export default {
  name: "path_map",
  data() {
    return {
      location: null,
      map: null
    };
  },
  methods: {
    getMap() {
      console.log("this", this);
      var map = new BMap.Map("container"); //创建地图实例
      map.centerAndZoom(new BMap.Point(116.404, 39.915), 14); //初始化地图，设置中心点坐标和地图级别
      var walking = new BMap.WalkingRoute(map, {
        renderOptions: {
          map: map,
          autoViewport: true
        }
      });
      var start = new BMap.Point(116.310791, 40.003419);
      var end = new BMap.Point(116.326419, 40.003519);
      walking.search(start, end);
    },
    //定义方法,获取用户当前地理位置
    getCity() {
      let _this = this;
      let endLat = _this.$route.query.endLat;
      let endLng = _this.$route.query.endLng;
      //   console.log(endLat,endLng)//终点经度、纬度
      MessageBox.confirm("", {
        title: "提示",
        message: "是否授权获取您当前位置",
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      }).then(action => {
        if (action == "confirm") {
          // 允许获取当前地理位置
          var geolocation = new BMap.Geolocation(); //1、创建查询对象
          navigator.geolocation
            .getCurrentPosition(function(r) {
              //2、调用getCurrentPosition函数
              console.log("r", r);
              //得到html5定位结果
              var x = r.coords.longitude;
              var y = r.coords.latitude;
              console.log("x", x, "y", y);
              //由于html5定位的结果是国际标准gps，所以from=1，to=5
              // 如果查询成功
              if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                const myGeo = new BMap.Geocoder();
                myGeo.getLocation(
                  new BMap.Point(r.point.lng, r.point.lat), //地图添加覆盖物
                  // 百度地图的定位是有偏移量的，和实际地址偏差很大，偏差有几公里

                  data => {
                    console.log("data", data);
                    if (data.addressComponents) {
                      const result = data.addressComponents;
                      console.log("result", result);
                      const location = {
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
                      _this.creditLongitude = location.creditLongitude;
                      _this.creditLatitude = location.creditLatitude;
                      _this.creditCity = location.creditCity;
                      // 获取到当前的经纬度，根据起点与终点经纬度请求百度地图的接口
                      // var url =
                      //   "http://api.map.baidu.com/direction?origin=latlng:";
                      // (url += 34.264642646862), 108.95108518068;
                      // url +=
                      //   "|name:我的位置&destination=大雁塔" +
                      //   "&mode=driving&region=西安" +
                      //   "&output=html&src=demo&ak=PIvUCvE1HdkGb6baKec54Ikp3EUNtgb9";
                      // window.location.href =
                      //   "http://api.map.baidu.com/direction?origin=latlng:34.264642646862,108.95108518068|name:我家&destination=大雁塔&mode=driving&region=西安&output=html&src=webapp.baidu.openAPIdemo&vt=map";
                    }
                  }
                );
              }
            })
        }
      })
      .catch(error => {
              if (error == "cancel") {
                this.$router.push({ path: "/home/detailHome" }).then(() => {
                  Toast("您已拒绝地理位置授权");
                });
              } else {
                throw error;
              }
            });
    }
  },
  //mounted中引用，加载完成
  mounted() {
    setTimeout(() => {
      //  this.getMap();
      this.getCity();
    });
  }
};
</script>
<style scoped>
</style>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
