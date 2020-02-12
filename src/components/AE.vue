<template>
  <div class="hello">
    <div class="container">
      <h1>急症室等候時間</h1>

      <div class="spinner-grow text-primary" role="status" v-if="aeList.length<1">
        <span class="sr-only">Loading...</span>
      </div>

      <p v-if="updateTime">更新時間 {{ updateTime }}</p>

      <div class="list-item" v-for="hospital in  aeList" :key="hospital.hospName">
        <div class="list-item-title" :class="hospital.waiting_color">
          <div class="list-item-title-icon fa fa-ship"></div>
          <div class="list-item-title-text" @click="goToWeb(hospital.location)"> <font-awesome-icon class="ae-route-icon" icon="route" /></div>
        </div>
        <div class="list-item-content-name">{{ hospital.hospName}} <br> 等候時間: {{ hospital.topWait }}</div>

      </div>

    </div>


  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'AE',
    data: () => ({
      aeList: [],
      updateTime: '',
    }),
    mounted() {
      this.getAEWaitngTime()
    },
    methods: {
      getAEWaitngTime() {
        var cors_anywhere = 'https://cors-anywhere.herokuapp.com/'
        axios.get(cors_anywhere + 'http://www.ha.org.hk/opendata/aed/aedwtdata-tc.json').then(result => {
          var sortByTime = []
          var waiting_color = '';
          sortByTime = result.data.waitTime

          function compare(a, b) {
            var aTime = a.topWait.split(" ")
            var bTime = b.topWait.split(" ")

            if (aTime[1] < bTime[1]) {
              return -1;
            }
            if (aTime[1] > bTime[1]) {
              return 1;
            }
            if(aTime[1] == bTime[1]){
              if(aTime[0] == '大約' && bTime[0] == '超過'){
                return -1;
              }
              if(bTime[0] == '大約' && aTime[0] == '超過'){
                return  1;
              }
            }
            return 0;
          }

          sortByTime.sort(compare);

          sortByTime.forEach(element => {
            switch (element.topWait.split(" ")[1]){
                case ("1"):
                  waiting_color = 'bg-success'
                  break
                case ("2"):
                case ("3"):
                  waiting_color = 'bg-warning'
                  break
                default:
                  waiting_color = 'bg-danger'
            }

            this.aeList.push({
              hospName: element.hospName,
              topWait: element.topWait,
              location: 'https://www.google.com/maps/search/?api=1&query=' + element.hospName,
              waiting_color
            })
          });


          this.updateTime = result.data.updateTime
        }).catch(error => [
          console.log(error)
        ])
      },
      goToWeb(link) {
        window.open(link);
      }
    }
  }
</script>

<style scoped>
  .list-container,
  .board {
    float: left;
    margin: 0 50px;
    width: 480px;
  }

  .list-item {
    background: #ffffff;
    border-radius: 4px;
    box-shadow: 0px 0px 5px 1px #ccc;
    cursor: pointer;
    /* display: inline-block; */
    margin-bottom: 30px;
    max-height: 70px;
    overflow: hidden;
    text-overflow: hidden;
    transition: max-height 0.2s linear;
    width: 100%;
  }

  .ae-route-icon{
    font-size: 25px
  }

  .list-item-title {
    color: #ffffff;
    border-radius: 4px 0 0 4px;
    box-shadow: 0px 0px 5px 1px #ccc;
    float: left;
    height: 70px;
    line-height: 70px;
    overflow: hidden;
    position: absolute;
    text-align: center;
    text-transform: uppercase;
    transition: all 0.2s linear, width 0.1s linear 0.1s, margin 0.1s linear 0.1s;
    width: 100px;
  }

  .list-item-title-text {
    opacity: 1;
    transition: opacity 0.3s linear;
  }

  .list-item-title-icon {
    opacity: 0;
    font-size: 40px;
    width: 100px;
    position: absolute;
    transition: all 0.3s linear, width 0.1s linear 0.1s;
  }

  .list-item-content-name {
    font-weight: bold;
    line-height: 35px;
    margin-left: 130px;
    padding-top: 0;
    transition: padding-top 0.2s linear, margin-left 0.2s linear;
  }

  .list-item-content-text {
    position: relative;
    margin-bottom: 2px;
  }

  .list-item-content-text:hover:after {
    color: #A4A5A8;
    content: "\e022";
    font-family: "gravity-glyphicons";
    height: 10px;
    margin-left: calc(100% - 35px);
    margin-top: -20px;
    position: absolute;
    width: 10px;
    z-index: 1;
  }

  .list-item-content-text.textarea:hover:after {
    content: '';
  }

  .list-item.active {
    max-height: 400px;
    transition: max-height 0.2s linear 0.1s;
  }

  .list-item.active .edit-input {
    width: calc(100% - 60px);
  }

  .list-item.active .list-item-title {
    border-radius: 50%;
    height: 50px;
    margin-top: -25px;
    margin-left: 20px;
    position: absolute;
    transition: all 0.2s linear 0.1s, width 0.1s linear, margin 0.1s linear;
    width: 50px;
  }

  .list-item.active .list-item-title-text {
    font-size: 10px;
    line-height: 50px;
    opacity: 0;
  }

  .list-item.active .list-item-title-icon {
    font-size: 25px;
    opacity: 1;
    line-height: 50px;
    width: 51px;
  }

  .list-item.active .list-item-content-name {
    margin-left: 30px;
    padding-top: 10px;
    transition: margin-left 0.2s linear, width 0.1s linear;
  }
</style>