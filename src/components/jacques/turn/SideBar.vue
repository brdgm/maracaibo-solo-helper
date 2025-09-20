<template>
  <div class="sidebar">
    {{t('sideBar.round', {round})}}<br/>
    {{t('sideBar.turn', {turn})}}
    <h5 class="mt-2">{{t('bot.jacques')}}</h5>
    <AppIcon name="vp" class="icon"/>: {{vp}}<br/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/jacques/NavigationState'
import AppIcon from '@/components/structure/AppIcon.vue'

export default defineComponent({
  name: 'SideBar',
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    round() : number {
      return this.navigationState.round
    },
    turn() : number {
      return this.navigationState.turn
    },
    vp() : number {
      return this.navigationState.jacques.vp
    },
  }
})
</script>

<style lang="scss" scoped>
.sidebar {
  float: right;
  width: 145px;
  margin-left: 15px;
  margin-bottom: 10px;
  margin-right: -12px;
  padding: 15px 10px 15px 15px;
  background-color: #ddd;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  @media (max-width: 600px) {
    font-size: 0.9rem;
    width: 120px;
  }
}
.icon {
  width: 1.6rem;
  height: 1.6rem;
  object-fit: contain;
  padding: 0.1rem;
}
</style>
