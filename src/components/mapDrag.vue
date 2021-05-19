<!--这是根据github上地图拖拽的原型改的，但是其中因为存在异步操作，在地图上添加坐标的时候报错了，目前错误尚未解决。-->
<template>
  <div class="m-map">
    <div id="container" class="map">正在加载数据 ...</div>
  </div>
</template>
<script>
import remoteLoad from '@/utils/remoteLoad.js'
import {MapKey} from '@/config/config'
import {LabelsData} from '../Data/Markers_locations'

export default {
  props: ['lat', 'lng'],
  data() {
    return {}
  },
  watch: {},
  methods: {
    // 实例化地图
    initMap() {
      let AMap = this.AMap = window.AMap;
      let map = new AMap.Map('container', {
        zoom: 17,//级别
        center: [121.504463, 31.030588],//中心点坐标
        viewMode: '2D'//使用3D视图,
      });
      console.log(LabelsData);
      let layer = new AMap.LabelsLayer({
        zooms: [3, 20],
        zIndex: 1000,
        // 开启标注避让，默认为开启，v1.4.15 新增属性
        collision: true,
        // 开启标注淡入动画，默认为开启，v1.4.15 新增属性
        animation: true,
      });
      map.add(layer);
      let markers = [];
      for (let i = 0; i < LabelsData.length; i++) {
        let curData = LabelsData[i];
        curData.extData = {
          index: i
        };
        let labelMarker = new AMap.LabelMarker(curData);
        markers.push(labelMarker);
        layer.add(labelMarker);
      }
      map.setFitView();
  }
  },
  //初始化地图
  async created() {
    // 已载入高德地图API，则直接初始化地图
    if (window.AMap) {
      this.initMap();
      // 未载入高德地图API，则先载入API再初始化
    } else {
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
