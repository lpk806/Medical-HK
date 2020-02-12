<template>
  <div class="container">
    <h2 class="mt-5">實時本港疫情</h2>
    <div class="row">
      <div class="col-md-3">
        <div class="card-counter danger">
          <font-awesome-icon class="card-icon" icon="stethoscope" />
          <span class="count-numbers">{{ summary[0].confirmed_cases  }}</span>
          <span class="count-name">確診個案</span>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card-counter dead">
          <font-awesome-icon class="card-icon" icon="bed" />
          <span class="count-numbers">{{ summary[0].dead }}</span>
          <span class="count-name">死亡個案</span>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card-counter primary">
          <font-awesome-icon class="card-icon" icon="notes-medical" />
          <span class="count-numbers">{{ summary[0].cases_still_hospital }}</span>
          <span class="count-name">仍然住院接受檢查個案</span>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card-counter success">
          <font-awesome-icon class="card-icon" icon="walking" />
          <span class="count-numbers">{{ summary[0].discharged }}</span>
          <span class="count-name">出院</span>
        </div>
      </div>

      <!-- <div class="col-md-4">
      <div class="card-counter success">
        <font-awesome-icon class="card-icon" icon="walking" />
        <span class="count-numbers">{{ ruled_out_cases }}</span>
        <span class="count-name">排除個案</span>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card-counter info">
        <font-awesome-icon class="card-icon" icon="book-medical" />
        <span class="count-numbers">{{cases_fulfilling }}</span>
        <span class="count-name">符合呈報準則個案</span>
      </div>
    </div> -->
    </div>
  </div>
</template>


<script>
  import axios from 'axios'
  export default {
    name: 'Summary',
    data: () => ({
      summary: []
    }),
    mounted() {
        this.getSummary()
    },
    methods: {
      getSummary() {
        axios.get('https://facebook-scraping-puppeteer.herokuapp.com/chp')
          .then(result => {
            this.summary = result.data
            // var lines = result.data.split("\n");

            // var results = [];

            // var headers = ['更新日期','更新時間','確診個案','排除個案','仍然住院接受檢查個案','符合呈報準則個案']
            //     var obj = {}
            //     var lastLine = lines[lines.length - 2].split(",");

            //     for (var j = 0; j < headers.length; j++) {
            //         obj[headers[j]] = lastLine[j];
            //     }

            //     results.push(obj);

            //  this.summary = results

          }).catch(error => [
            console.log("error" + error)
          ])
      }
    }
  }
</script>

<style scoped>
  .card-counter {
    box-shadow: 2px 2px 10px #DADADA;
    margin: 5px;
    padding: 20px 10px;
    background-color: #fff;
    height: 100px;
    border-radius: 5px;
    transition: .3s linear all;
  }

  .card-counter:hover {
    box-shadow: 4px 4px 20px #DADADA;
    transition: .3s linear all;
  }

  .card-counter.primary {
    background-color: #007bff;
    color: #FFF;
  }

  .card-counter.danger {
    background-color: #ef5350;
    color: #FFF;
  }


  .card-counter.success {
    background-color: #66bb6a;
    color: #FFF;
  }

  .card-counter.dead {
    background-color: #010101;
    color: #FFF;
  }

  .card-counter.info {
    background-color: #26c6da;
    color: #FFF;
  }

  .card-counter .card-icon {
    font-size: 5em;
    opacity: 0.2;
  }

  .card-counter .count-numbers {
    position: absolute;
    right: 35px;
    top: 20px;
    font-size: 32px;
    display: block;
  }

  .card-counter .count-name {
    position: absolute;
    right: 35px;
    top: 65px;
    font-style: italic;
    text-transform: capitalize;
    opacity: 0.5;
    display: block;
    font-size: 18px;
  }
</style>