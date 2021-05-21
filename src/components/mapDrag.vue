<!--这是根据github上地图拖拽的原型改的，但是其中因为存在异步操作，在地图上添加坐标的时候报错了，目前错误尚未解决。-->
<template>
  <div class="m-map">
    <div id="container" class="map">正在加载数据 ...</div>
    <div v-for="lnglat in lngLats" v-bind:key="lnglat.id">
     {{lnglat.id}}
      {{lnglat.x}}
      {{lnglat.y}}
      <p></p>
    </div>
  </div>
</template>
<script>
import remoteLoad from '@/utils/remoteLoad.js'
import {MapKey} from '@/config/config'
import { mapState } from 'vuex'
import {store} from '../store/index.js'
import {LabelsData} from '../Data/Markers_locations'

export default {
  name:'mapDrag',
  data() {
    return {}
  },
  computed:{
    ...mapState(['lngLats'])
  },
  methods: {
    // 实例化地图
    initMap() {
      console.log(this.lngLats.length+"..");
      const test1 = 4;
      //这里怎么存进去是个问题
      const lnglat_my =this.lngLats ;
      console.log("类型是："+typeof this.lngLats);
      console.log(this.lngLats);
      //
      // for (let i=0,len = this.lngLats.length;i<len;i++){
      //   lnglat_my[i]=8;
      // }
      console.log("数组大小为："+lnglat_my);
      console.log(test1+"vvvv..");
      let AMapUI = this.AMapUI = window.AMapUI;
      let AMap = this.AMap = window.AMap;
      console.log("-");
      let map = new AMap.Map('container', {
        zoom: 16,
        center: [121.504374,31.030502]
      });
      console.log("--");
      //异步执行函数 参考此网址https://lbs.amap.com/api/amap-ui/intro
      AMapUI.loadUI(['overlay/SimpleMarker'], function (SimpleMarker) {
        console.log("---");
        console.log(test1+"vvvvv");
        console.log("数组大小为："+lnglat_my.length);
        lnglat_my.forEach((item) => {
          console.log(item);
        })
        //console.log(this.lngLats.length+"./");

        let awIcons = 'address-book';
        let colors = "#d62728";
        console.log("----");
      //  console.log(this.lngLats.length);
        for (let i = 0, len = lnglat_my.length; i < len; i++) {
          console.log("-----");
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
            map: map,
            position: [lnglat_my[i].x,lnglat_my[i].y]
          });
          console.log("------");
          //console.log([this.lngLats[i].x,this.lngLats[i].y]);
        }
      });
    }
  },
  //初始化地图
  async created() {
    console.log(this.lngLats.length+"+");
    // 已载入高德地图API，则直接初始化地图
    if (window.AMap && window.AMapUI) {
      console.log(this.lngLats.length+"!");
      this.initMap();
      // 未载入高德地图API，则先载入API再初始化
    } else {
      console.log(this.lngLats.length+"...");
      //官网有说采用异步的方式加载高德地图
      await remoteLoad(`http://webapi.amap.com/maps?v=1.3&key=${MapKey}`)
      await remoteLoad('http://webapi.amap.com/ui/1.0/main.js')
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
