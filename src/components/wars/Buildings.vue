<template>
  <div>
      <div class="spinner-grow text-primary" role="status" v-if="buildings.length<1">
      <span class="sr-only">Loading...</span>
    </div>
    <div id="nav" v-if="buildings.length>1">
      <div :class="page0" @click="goToPage(0)">列表模式</div> |
      <div :class="page1" @click="goToPage(1)">地圖模式</div>
    </div>
    <div v-if="page == 0 && buildings.length>1">
  <BuildingsList :buildings="buildings"  :quarantine="quarantine"></BuildingsList>
    </div>
    <div v-if="page == 1 && buildings.length>1">
      <HKMap :mapReady="mapReady" :buildings="buildings"  :quarantine="quarantine"/>
    </div>
  </div>
</template>

<script>
  import BuildingsList from './BuildingsList.vue'
  import HKMap from './HKMap'
  import axios from 'axios'

  export default {
    components: {
      BuildingsList,
      HKMap
    },
    data: () => ({
      page: 0,
      page0: 'active',
      page1: 'normal',
      buildings: [],
      quarantine:[],
      mapReady:false,
    }),
    mounted() {
      this.mapReady = false
       this.getBuilings(),
      this.getQuarantines()
    },
    methods: {
      goToPage(number) {
        this.page = number
        if (number == 0) {
          this.page0 = 'active',
          this.page1 = 'normal'
        }else if(number == 1){
          this.page0 = 'normal',
          this.page1 = 'active'
        }
      },
       getBuilings() {
        axios.get('https://facebook-scraping-puppeteer.herokuapp.com/buildings/')
          .then(result => {
            
console.log(result.data)
            // this.cases_hk = JSON.stringify(results)

            this.buildings = result.data
            // console.log(this.buildings)
          }).catch(error => [
            console.log("error" + error)
          ])
      },
      getQuarantines() {
        axios.get('https://facebook-scraping-puppeteer.herokuapp.com/buildings/Quarantines')
          .then(result => {
            console.log(result.data)
            this.quarantine = result.data
            this.mapReady = true

          }).catch(error => [
            console.log("error" + error)
          ])
      },
    }
  }
</script>

<style scoped>
  #nav {
    padding: 30px;
  }

  #nav div {
    font-weight: bold;
    display: inline;
  }

  .normal{
    color: #2c3e50;
  }

  .active {
    color: #42b983;
  }
</style>