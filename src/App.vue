<template>
  <div id="app">
    <div class="m-part">
      <h3 class="title">DEMO</h3>
      <mapDrag class="mapbox"></mapDrag>
    </div>
  </div>
</template>
<script>
import mapDrag from './components/mapDrag'
export default {
  name: 'app',
  components: {
    mapDrag
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>
body{ margin: 0; }
.m-part{ margin-bottom: 30px; }
.m-part .title{ font-size: 30px; line-height: 60px; margin-bottom: 10px; color: #333; }
.m-part .mapbox{ width: 600px; height: 1000px; margin-bottom: 20px; float: left; }
</style>
