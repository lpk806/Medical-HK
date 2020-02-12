<template>
  <div class="buildings">
  
    <div class="container card shadow rounded" v-if="buildings.length>0">
      <h2 class="mt-5">過去14天內確診人士在出現病徵期間逗留過的大廈名單</h2>
      <h6 class="sub-title">資料來源: 衞生署 </h6>
      <h6 class="sub-title">資料每日更新一次</h6>



      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">地區</th>
            <th scope="col">大廈名單</th>
            <th scope="col">最後有個案在出現病徵期間逗留的日期</th>
          </tr>
        </thead>



        <tbody>
          <tr v-for="building in buildings" :key="building.building">
            <th scope="row">{{ building.district}}</th>
            <td>{{ building.building}}</td>
            <td>{{ building.date}}</td>
          </tr>
        </tbody>

      </table>

    </div>
    <div class="container card shadow rounded mt-5" v-if="quarantine.length>0">
      <h2 class="mt-5">接受家居檢疫人士所居住大廈的名單</h2>
      <h6 class="sub-title">資料來源: 衞生署 </h6>
      <h6 class="sub-title">資料每日更新一次</h6>



      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">編號</th>
            <th scope="col">地區</th>
            <th scope="col">大廈名稱</th>
            <th scope="col">家居檢疫最後日期</th>
          </tr>
        </thead>



        <tbody>
          <tr v-for="building in quarantine" :key="building.number">
            <th scope="row">{{ building.number}}</th>
            <td>{{ building.district}}</td>
            <td>{{ building.building}}</td>
            <td>{{ building.date}}</td>
          </tr>
        </tbody>

      </table>

    </div>

  </div>
</template>

<script>

  export default {
    name: 'Building',
    props: {
    quarantine:  {type: Array,},
    buildings: { type: Array,}
  },
    
    data: () => ({
    }),
    mounted() {
    },
    methods: {
     
    }
  }
</script>

<style scoped>
  .sub-title {
    text-align: left;
    font-weight: bold;
  }
</style>