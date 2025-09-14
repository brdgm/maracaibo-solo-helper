<template>

  <ActionBox instructionTitle="Move Ship" :modalSizeLg="true">
    <template #action>
      <div class="movement">
        <div>Move Ship</div>
        <div class="steps">{{ movementSteps }}</div>
        <AppIcon type="direction" :name="direction" class="direction"/>
      </div>
    </template>
    <template #instruction>
      <ul class="instruction">
        <li>
          <AppIcon name="upper" type="direction" class="icon route"/>
          If there is a choice: use the upper route.
        </li>
        <li>
          <AppIcon name="lower" type="direction" class="icon route"/>
          If there is a choice: use the lower route.
        </li>
        <li>Jean ignores all villages without quests. These are not-counted spaces! This means that Jean will always end her movement in either a city or a location with a quest.</li>
        <li>
          <AppIcon name="hand" class="icon"/>
          Jean cannot skip locations with the hand symbol, such as the 'homeward bound' spaces. This means that once she reaches space 20, she only every moves to the next space.
        </li>
        <li>If legacy tiles reveal new cities, these also count for Jean.</li>
      </ul>
    </template>
  </ActionBox>


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
import ActionBox from '@/components/structure/ActionBox.vue'

export default defineComponent({
  name: 'BotActions',
  emits: {
    next: () => true,   
  },
  components: {
    AppIcon,
    ActionBox
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

<style lang="scss" scoped>
.movement {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  .steps {
    font-size: 2rem;
    font-weight: bold;
  }
  .direction {
    width: 2rem;
    object-fit: contain;
  }
}
.instruction {
  li {
    margin-bottom: 0.25rem;
  }
  .icon {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.25rem;
    object-fit: contain;
    float: left;
    &.route {
      margin-top: 0.2rem;
      margin-bottom: -0.2rem;
    }
  }
}
</style>