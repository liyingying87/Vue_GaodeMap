<!--这是根据github上地图拖拽的原型改的，但是其中因为存在异步操作，在地图上添加坐标的时候报错了，目前错误尚未解决。-->
<template>
  <div class="m-map">
    <div id="container" class="map">正在加载数据 ...</div>
<!--    //选择路线-->
    <div id="choose_line">
      <select v-model="selected" @change="selectTrigger(selected)">
        <option  value=" " disabled>请选择路线</option>
        <option v-for ="item in lines"
        :key = "item.id"
        :label="item.name+'途径的站点有：'+item.stations"
        :value="item.id"></option>
      </select>
      <span>Selected: {{ selected }}</span>
      <!--//清空路线-->
      <button name="clear">
      清空路线
    </button>
    </div>
  </div>
</template>
<script>
import remoteLoad from '@/utils/remoteLoad.js'
import {MapKey} from '@/config/config'
import { mapState } from 'vuex'

export default {
  name:'mapDrag',
  data() {
    return {
      selected:'',
      AMapUI: null,
      AMap: null,
      mapObj:null,
      car_marker:null
    }
  },
  computed:{
    ...mapState(['lngLats','lines'])
  },
  methods: {
    // 实例化地图
    initMap() {
      const lnglat_my =this.lngLats ;

      let AMapUI = this.AMapUI = window.AMapUI;
      let AMap = this.AMap = window.AMap;

      this.mapObj = new AMap.Map('container', {
        zoom: 16,
        center: [121.504374,31.030502]
      });
      console.log(this.mapObj+",,");
      console.log(this.mapObj.getCenter());
      // let marker = new AMap.Marker({
      //   map: mapObj,
      //   position: this.lines.find(item => item.id == 1).lineArr[0],
      //   icon: "https://webapi.amap.com/images/car.png",
      //   offset: new AMap.Pixel(-26, -13),
      //   autoRotation: true,
      //   angle:-90,
      // });
      //异步执行函数 参考此网址https://lbs.amap.com/api/amap-ui/intro
      const mapObj_my = this.mapObj;
      AMapUI.loadUI(['overlay/SimpleMarker'], function (SimpleMarker) {
        //学会此种书写方式
        // lnglat_my.forEach((item) => {
        //   console.log(item);
        // })
        let awIcons = 'address-book';
        for (let i = 0, len = lnglat_my.length; i < len; i++) {
          new SimpleMarker({
            //设置awesomeIcon
            awesomeIcon: awIcons,
            //字体
            iconLabel: {
              //普通文本
              innerHTML: lnglat_my[i].id,
              //设置样式
              style: {
                color: '#fff',
                fontSize: '120%',
                marginTop: '2px'
              }
            },
            iconStyle: 'red',
            map: mapObj_my,
            position: [lnglat_my[i].x,lnglat_my[i].y]
          });
        }
      });
    },
    //根据获得的路线的id值，进行画路线
    selectTrigger(val){
      let AMap = this.AMap = window.AMap;
      this.car_marker = new AMap.Marker({
        map: this.mapObj,
        position: this.lines.find(item => item.id == val).lineArr[0],
        icon: "https://webapi.amap.com/images/car.png",
        offset: new AMap.Pixel(-26, -13),
        autoRotation: true,
        angle:-90,
      });//画出来小车

      let polyline = new AMap.Polyline({
        map: this.mapObj,
        path: this.lines.find(item => item.id == val).lineArr,
        showDir:true,
        strokeColor: "#28F",  //线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6,      //线宽
        // strokeStyle: "solid"  //线样式
      });//画出来地上的线

      let passedPolyline = new AMap.Polyline({
        map: this.mapObj,
        // path: lineArr,
        strokeColor: "#AF5",  //线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6,      //线宽
        // strokeStyle: "solid"  //线样式
      });//小车跑起来的路线
      //on函数的作用  监听他的状态
      this.car_marker.on('moving', function (e) {
        passedPolyline.setPath(e.passedPath);
      });
      //根据地图上添加的覆盖物分布情况，自动缩放地图到合适的视野级别，参数均可缺省。
      this.mapObj.setFitView();
      this.car_marker.moveAlong(this.lines.find(item => item.id == val).lineArr, 2000);
      //函数执行完了以后应该把小车移走
      // this.mapObj.remove(marker);
      // this.$nextTick(function (){
      //   this.mapObj.remove(this.car_marker);
      // })
    }
  },
  //初始化地图
  async created() {
    // 已载入高德地图API，则直接初始化地图
    if (window.AMap && window.AMapUI) {
      this.initMap();
      // 未载入高德地图API，则先载入API再初始化
    } else {
      //官网有说采用异步的方式加载高德地图
      await remoteLoad(`http://webapi.amap.com/maps?v=1.3&key=${MapKey}`)
      await remoteLoad('http://webapi.amap.com/ui/1.0/main.js')
      //以上两个加载完了再初始化地图
      this.initMap();
    }
  }
}
</script>

<style lang="css">
.m-map {
  min-width: 100%;
  min-height: 100px;
  position: relative;
}

.m-map .map {
  width: 100%;
  height: 100%;
}
</style>
