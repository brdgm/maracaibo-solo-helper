<template>
  <h3>Movement</h3>
  <p>{{ movementSteps }} <AppIcon type="direction" :name="direction"/></p>

  <button class="btn btn-primary btn-lg mt-4" @click="next">
    {{t('action.next')}}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/jean/NavigationState'
import Direction from '@/services/jean/enum/Direction'
import AppIcon from '@/components/structure/AppIcon.vue'

export default defineComponent({
  name: 'BotActions',
  emits: {
    next: () => true,   
  },
  components: {
    AppIcon
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  computed: {
    movementSteps() : number {
      return this.navigationState.currentCard.movementSteps
    },
    direction() : Direction {
      return this.navigationState.currentCard.direction
    },
  },
  methods: {
    next() : void {
      this.$emit('next')
    }
  }
})
</script>
