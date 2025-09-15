<template>
  <ActionBox :instructionTitle="t('jean.action.combat.title')" :modalSizeLg="true">
    <template #action>
      <div class="combat">
        <AppIcon name="combat" class="icon combat"/>
        <ol>
          <li>
            <span v-html="t('jean.action.combat.max')"></span> <AppIcon name="combat-nation-selection" class="icon combat-nation-selection"/><br/>
            <span v-html="t('jean.action.combat.tie')"></span><br/>
            <AppIcon name="combat-nation-tiebreak" class="icon combat-nation-tiebreak"/>
          </li>
          <li><AppIcon name="combat-annex-city" class="icon combat-annex-city"/></li>
          <li><AppIcon name="combat-annex-village" class="icon combat-annex-village"/></li>
          <li><AppIcon type="influence" name="any" class="icon influence" v-for="i in action.influence" :key="i"/></li>
        </ol>
      </div>
    </template>
    <template #instruction>
      <ul class="instruction">
        <li>Reveal a combat token.</li>
        <li>Determine the modified combat value for each nation. For each nation, first add Jean's noble rank with that nation to the combat value indicated by the combat token.
          Then subtract your noble rank with that nation from the total. Noble ranks are the last red band you or Jean reached on the corresponding influence track.
          If the combat token shows a requirement that modifies a nation's combat value, then apply it. Jean ignores any costs or immediate bonuses on the combat token.
        </li>
        <li>In case of a tie, Jean chooses the nation with the highest combat value on the combat token (ignoring any modifications or bonuses).
          If there is still a tie, she preferentially chooses France, then Spain and finally England.
        </li>
        <li>Jean now annexes the lowest-numbered, empty city (without receiving the reward shown on the flag of this city).
          If there aren't any empty cities, she annexes the lowest-numbered empty village instead.
          If there aren't any of those either, then she removes the ownership marker from the game.
        </li>
        <li>Jean annexes an <b>additional empty village</b> according to the rules above.</li>
        <li>Finally, Jeans gets the indicated influence with the nation she fought with.</li>
      </ul>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/jean/NavigationState'
import AppIcon from '@/components/structure/AppIcon.vue'
import ActionBox from '@/components/structure/ActionBox.vue'
import { CardAction } from '@/services/jean/JeanCard'

export default defineComponent({
  name: 'ActionCombat',
  components: {
    AppIcon,
    ActionBox
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    },
    action: {
      type: Object as PropType<CardAction>,
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
.icon {
  height: 3rem;
}
.combat {
  display: flex;
  flex-direction: column;
  align-items: center;
  ol li {
    margin-top: 0.6rem;
  }
  .icon.combat-nation-selection, .icon.combat-nation-tiebreak {
    height: 1.75rem;
  }
  .icon.combat-annex-city, .icon.combat-annex-village {
    height: 2rem;
  }
  .icon.influence {
    margin-right: -0.5rem;
    height: 2.5rem;
  }
}
</style>
