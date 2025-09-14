<template>
  <h1>{{t('gameEnd.title')}}</h1>

  <p>TBD</p>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useStateStore } from '@/store/state'

export default defineComponent({
  name: 'GameEnd',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const state = useStateStore()

    return { t, router, state }
  },
  computed: {
    backButtonRouteTo() : string {
      return '/round/5/rewards'
    }
  }
})
</script>
