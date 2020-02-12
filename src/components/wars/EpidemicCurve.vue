<template>
    <div class="buildings mt-5  container">
        <canvas id="myChart" height="400" width="400"></canvas>
    </div>
</template>

<script>
    import axios from 'axios'
    import Chart from 'chart.js'
    export default {
        name: 'Building',
        data: () => ({
            confirmedCases: []
        }),
        mounted() {
            this.getData()
        },
        methods: {
            getData() {
                var cors_anywhere = 'https://cors-anywhere.herokuapp.com/'
                axios.get(cors_anywhere + 'http://www.chp.gov.hk/files/misc/hk_confirmed_cases_epi_curve_chi.csv')
                    .then(result => {
                        var lines = result.data.split("\n");

                        var results = [];

                        var headers = ['發病日期', '輸入個案', '可能本地感染個案','本地感染個案', '與輸入個案有密切接觸的個案', '確診個案數字']

                        for (var i = 1; i < lines.length - 1; i++) {

                            var obj = {};
                            var currentline = lines[i].split(",");

                            for (var j = 0; j < headers.length; j++) {
                                obj[headers[j]] = currentline[j];
                            }

                            results.push(obj);

                        }

                        // this.cases_hk = JSON.stringify(results)
                        this.confirmedCases = results
                        this.createChart()

                    }).catch(error => [
                        console.log("error" + error)
                    ])
            },
            createChart() {
                var date = []
                var imported = []
                var possiblyLocal = []
                var local = []
                var closeContactofImportedCase = []
                var total = []
                for (var i = 0; i < this.confirmedCases.length; i++) {
                    if (i != 0) {
                        date.push(this.confirmedCases[i].發病日期)
                        var totalImport = 0
                        var totalPossiblyLocal = 0
                        var totalLocal = 0
                        var totalCloseContactofImportedCase = 0
                        var totalTotal = 0
                        for(var j = 0;j < i;j++){
                            totalImport += parseInt(this.confirmedCases[j].輸入個案)
                            totalLocal += parseInt(this.confirmedCases[j].本地感染個案)
                            totalPossiblyLocal += parseInt(this.confirmedCases[j].可能本地感染個案)
                            totalCloseContactofImportedCase += parseInt(this.confirmedCases[j].與輸入個案有密切接觸的個案)
                            totalTotal += parseInt(this.confirmedCases[j].確診個案數字)
                        }
                        imported.push(parseInt(this.confirmedCases[i].輸入個案) + totalImport)
                        possiblyLocal.push(parseInt(this.confirmedCases[i].可能本地感染個案) + totalPossiblyLocal)
                        local.push(parseInt(this.confirmedCases[i].本地感染個案) + totalLocal)
                        closeContactofImportedCase.push(parseInt(this.confirmedCases[i].與輸入個案有密切接觸的個案) +  totalCloseContactofImportedCase)
                        total.push(parseInt(this.confirmedCases[i].確診個案數字) + totalTotal)
                    }else{
                        date.push(this.confirmedCases[i].發病日期)
                        imported.push(this.confirmedCases[i].輸入個案)
                        local.push(this.confirmedCases[i].本地感染個案)
                        possiblyLocal.push(this.confirmedCases[i].可能本地感染個案)
                        closeContactofImportedCase.push(this.confirmedCases[i].與輸入個案有密切接觸的個案)
                        total.push(this.confirmedCases[i].確診個案數字)
                    }

                }
                var ctx = document.getElementById('myChart').getContext('2d');
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: date,
                        datasets: [{
                            data: imported,
                            label: "輸入個案",
                            borderColor: "#3e95cd",
                            fill: false
                        }, {
                            data: possiblyLocal,
                            label: "可能本地感染個案",
                            borderColor: "#8e5ea2",
                            fill: false
                        }, {
                            data: closeContactofImportedCase,
                            label: "與輸入個案有密切接觸的個案",
                            borderColor: "#3cba9f",
                            fill: false
                        }, {
                            data: total,
                            label: "確診個案數字",
                            borderColor: "#e8c3b9",
                            fill: false
                        }, {
                            data: local,
                            label: "本地感染個案",
                            borderColor: "#000",
                            fill: false
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: '香港確診新型冠狀病毒感染個案的流行病學曲線圖'
                        }
                    }
                });
            }
        }
    }
</script>

<style scoped>
</style>