<template>
  <div class="number">{{value}}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LocationNumber',
  props: {
    value: {
      type: [Number,String],
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.number {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00a3d8;
  border: 2px solid #110617;
  border-radius: 50%;
  font-weight: bold;
  font-size: 1.25rem;
  color: white;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  padding-bottom: 0.1rem;
}
</style>
