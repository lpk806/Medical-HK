<template>
  <div class="wars">
    <HKDetails/>
  </div>
</template>

<script>
// @ is an alias to /src

import HKDetails from '@/components/wars/Case_Detail.vue'

export default {
  name: 'home',
  components: {
    HKDetails
  }
}
</script>
