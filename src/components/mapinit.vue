<template>
  <div class="m-map">
    <div id="container" class="map">正在加载数据 ...</div>
  </div>
</template>

<script>
export default {
  name: "mapinit.vue"
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

