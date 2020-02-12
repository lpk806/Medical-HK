<template>
    <div class="hk-case-detail">
        <div class="container">
            <h2>本港確診新型冠狀病毒的個案詳情</h2>
            <h6 class="sub-title">資料來源: 衞生署 </h6>
            <h6 class="sub-title">資料每日更新一次</h6>
            <div class="spinner-grow text-primary" role="status" v-if="cases_hk.length<1">
        <span class="sr-only">Loading...</span>
      </div>
            <table class="table" v-if="cases_hk.length>0">
                <thead>
                    <tr>
                        <th scope="col">個案編號</th>
                        <th scope="col">發病日期</th>
                        <th scope="col">性別</th>
                        <th scope="col">年齡</th>
                        <th scope="col">入住醫院名稱</th>
                        <th scope="col">患者狀況</th>
                        <th scope="col">香港/非香港居民</th>
                        <th scope="col">個案分類</th>
                        
                    </tr>
                </thead>



                <tbody >
                    <tr v-for="cases in cases_hk" :key="cases.個案編號">
                        <th scope="row">{{cases.個案編號}}</th>
                        <td>{{cases.發病日期}}</td>
                        <td>{{cases.性別}}</td>
                        <td>{{cases.年齡}}</td>
                        <td>{{cases.入住醫院名稱}}</td>
                        <td class="text-center text-danger">{{cases.患者狀況}}</td>
                        <td >{{cases.香港或非香港居民}}</td>
                        <td>{{cases.個案分類}}</td>
                    </tr>
                </tbody>

            </table>    


        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    // import Papa from 'papaparse'
    export default {
        name: 'Case_HK',
        data: () => ({
            cases_hk: [],
        }),
        mounted() {
            this.getCaseDetails()
        },
        methods: {
            getCaseDetails() {
                var cors_anywhere = 'https://cors-anywhere.herokuapp.com/'
                axios.get(cors_anywhere + 'http://www.chp.gov.hk/files/misc/enhanced_sur_pneumonia_wuhan_chi.csv').then(
                    result => {
                        var lines = result.data.split("\n");

                        var results = [];

                        var headers = ["個案編號", "實驗室確診報告日期", "發病日期", "性別", "年齡", "入住醫院名稱", "患者狀況", "香港或非香港居民", "個案分類"]

                        for (var i = 1; i < lines.length; i++) {

                            var obj = {};
                            var currentline = lines[i].split(",");

                            for (var j = 0; j < headers.length; j++) {
                                obj[headers[j]] = currentline[j];
                            }

                            results.push(obj);

                        }

                        // this.cases_hk = JSON.stringify(results)
                         this.cases_hk = results


                    }).catch(err => {
                    console.log(err)
                })

            },
        }
    }
</script>

<style scoped>
    .sub-title {
        text-align: left;
        font-weight: bold;
    }
</style>