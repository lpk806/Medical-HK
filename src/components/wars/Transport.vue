<template>
  <div class="buildings mt-5">
    <div class="container card shadow rounded" v-if="Transports.length>0">
        <h2 class="mt-5">過去14天內確診人士乘搭過的航班/火車/船名單</h2>
            <h6 class="sub-title">資料來源: 衞生署 </h6>
            <h6 class="sub-title">資料每日更新一次</h6>
     
       <table class="table table-striped" >
                <thead>
                    <tr>
                        <th scope="col">航班/火車/船編號</th>
                        <th scope="col">起點及終點</th>
                        <th scope="col">乘搭日期</th>
                    </tr>
                </thead>



                <tbody >
                    <tr v-for="Transport in Transports" :key="Transport.編號">
                        <th scope="row">{{ Transport.編號}}</th>
                        <td>{{ Transport.起點及終點}}</td>
                        <td>{{ Transport.乘搭日期 }}</td>
                    </tr>
                </tbody>

            </table>

    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'Transport',
    data: () => ({
     Transports:[]
    }),
    mounted() {
      this.getTransports()
    },
    methods: {
      getTransports() {
        var cors_anywhere = 'https://cors-anywhere.herokuapp.com/'
        axios.get(cors_anywhere + 'http://www.chp.gov.hk/files/misc/flights_trains_list_chi.csv')
        .then(result => {
                        var lines = result.data.split("\n");

                        var results = [];

                        var headers = ['編號','起點及終點','乘搭日期']

                        for (var i = 1; i < lines.length; i++) {

                            var obj = {};
                            var currentline = lines[i].split(",");

                            for (var j = 0; j < headers.length; j++) {
                                obj[headers[j]] = currentline[j];
                            }

                            results.push(obj);

                        }

                        // this.cases_hk = JSON.stringify(results)
                         this.Transports = results

        }).catch(error => [
          console.log("error" + error)
        ])
      }
    }
  }
</script>

<style scoped>
.sub-title {
        text-align: left;
        font-weight: bold;
    }
</style>