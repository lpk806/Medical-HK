<template>
  <div class="hello">
   
 <div class="spinner-grow text-primary" role="status" v-if="cases.length<1">
      <span class="sr-only">Loading...</span>
    </div>


   

  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'Building',
    data: () => ({
        cases:[]
    }),
    mounted() {
      this.getCasesCN()
    },
    methods: {
      getCasesCN() {
        var cors_anywhere = 'https://cors-anywhere.herokuapp.com/'
        axios.get(cors_anywhere + "https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5&callback=jQuery34109052172312638276_1580985437574&_=1580985437575")
        .then(result => {
            // this.cases = result.data.data
            console.log(result.data)
        }).catch(error => [
          console.log("error" + error)
        ])
      }
    }
  }
</script>

<style scoped>
</style>