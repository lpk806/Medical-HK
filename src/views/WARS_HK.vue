<template>
  <div class="wars">
    
      <Summary/>
      <EpidemicCurve/>
      <Transport/>
    <Building/>
    
    
    <!-- <HKMap/> -->
  </div>
</template>

<script>
// @ is an alias to /src

import Building from '@/components/wars/Buildings.vue'
import Transport from '@/components/wars/Transport.vue'
import Summary from '@/components/wars/Case_summary_hk.vue'
import EpidemicCurve from '@/components/wars/EpidemicCurve.vue'
// import HKMap from '@/components/wars/HKMap.vue'

export default {
  name: 'home',
  components: {
    Building,
    Transport,
    Summary,
    EpidemicCurve,
  }
}
</script>
