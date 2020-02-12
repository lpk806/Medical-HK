<template>
  <div class="wars">
    <Buildings/>
    <CN/>
  </div>
</template>

<script>
// @ is an alias to /src
import Buildings from '@/components/wars/HKMap.vue'
import CN from '@/components/wars/Cases_CN.vue'

export default {
  name: 'home',
  components: {
    Buildings,
    CN
  }
}
</script>
