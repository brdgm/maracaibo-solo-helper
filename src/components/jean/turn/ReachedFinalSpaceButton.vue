<template>
  <button class="btn btn-secondary btn-lg mt-4" data-bs-toggle="modal" data-bs-target="#endRoundModal">
    {{t('jean.endRound.reachedLastSpace', {space:lastSpace })}}
  </button>

  <ModalDialog id="endRoundModal" :title="t('jean.endRound.title')">
    <template #body>
      <p v-html="t('jean.endRound.endRoundConfirm', {round})"></p>
    </template>
    <template #footer>
      <button class="btn btn-primary" @click="$emit('endRound')" data-bs-dismiss="modal">{{t('action.ok')}}</button>
      <button class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.cancel')}}</button>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ReachedFinalSpaceButton',
  emits: ['endRound'],
  components: {
    ModalDialog
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    round: {
      type: Number,
      required: true
    }
  },
  computed: {
    lastSpace() : string {
      if (this.round == 4) {
        return '22'
      }
      else {
        return '21a'
      }
    }
  }
})
</script>
