<template>
  <div class="vp">
    <AppIcon name="vp" class="icon"/>
    <div class="amount"><div>{{vp}}</div></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppIcon from '@/components/structure/AppIcon.vue'

export default defineComponent({
  name: 'VpAmount',
  components: {
    AppIcon
  },
  props: {
    vp: {
      type: Number,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.vp {
  position: relative;
  width: 3rem;
  height: 3rem;
  .icon {
    position: absolute;
    left: 0;
    width: 3rem;
    height: 3rem;
    object-fit: contain;
  }
  .amount {
    display: flex;
    position: absolute;
    left: 0;
    width: 3rem;
    height: 3rem;
    z-index: 100;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
    text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
  }
}
</style>
