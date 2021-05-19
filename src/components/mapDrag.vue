<template>
  <div class="m-map">
    <div id="container" class="map">正在加载数据 ...</div>
  </div>
</template>
<script>
import remoteLoad from '@/utils/remoteLoad.js'
import { MapKey, MapCityName } from '@/config/config'
export default {
  props: ['lat', 'lng'],
  data () {
    return {
    }
  },
  watch: {
  },
  methods: {
    // 实例化地图
    initMap () {
   let AMap = this.AMap = window.AMap
      let map =  new AMap.Map('container', {
        zoom:11,//级别
        center: [116.397428, 39.90923],//中心点坐标
        viewMode:'3D'//使用3D视图
      });
    }
  },
  async created () {
    // 已载入高德地图API，则直接初始化地图
    if (window.AMap) {
      this.initMap()
      // 未载入高德地图API，则先载入API再初始化
    } else {
      await remoteLoad(`http://webapi.amap.com/maps?v=1.3&key=${MapKey}`)
      await remoteLoad('http://webapi.amap.com/ui/1.0/main.js')
      this.initMap()
    }
  }
}
</script>

<style lang="css">
.m-map{ min-width: 100%; min-height: 100px; position: relative; }
.m-map .map{ width: 100%; height: 100%; }
</style>
