<template>
  <ActionBox :instructionTitle="t('jacques.action.vp.title')" :modalSizeLg="true">
    <template #action>
      <div class="vp">
        <AppIcon name="vp" class="icon"/>
        <div class="amount"><div>{{vp}}</div></div>
      </div>
    </template>
    <template #instruction>
      <p v-html="t('jacques.action.vp.get', {amount: vp}, vp)"></p>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/structure/AppIcon.vue'
import ActionBox from '@/components/structure/ActionBox.vue'

export default defineComponent({
  name: 'ActionVp',
  emits: {
    extraVP: (_extraVP: number) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
    AppIcon,
    ActionBox
  },
  props: {
    vp: {
      type: Number,
      required: true
    }
  },
  setup() {
    const { t } = useI18n()
    return { t }
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
