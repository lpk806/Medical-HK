<template>
  <div class="wars">
    <div id="nav">
      <div :class="page0" @click="goToPage(0)">疫情新聞</div> |
      <div :class="page1" @click="goToPage(1)">口罩零售商消息</div>
    </div>
    <div v-if="page == 0">
      <NewsTimeLine />
    </div>
    <div v-if="page == 1">
      <Timeline />
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Timeline from '@/components/wars/Timeline.vue'
  import NewsTimeLine from '@/components/wars/NewsTimeLine.vue'

  export default {
    name: 'home',
    components: {
      Timeline,
      NewsTimeLine
    },
    data: () => ({
      page: 0,
      page0: 'active',
      page1: 'normal'
    }),
    mounted() {
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
      }
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