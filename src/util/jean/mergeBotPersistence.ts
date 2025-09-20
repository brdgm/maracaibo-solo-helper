import { JeanBotPersistence } from '@/store/state'

/**
 * Sums up the values from two bot persistence.
 * @param botPersistence1 The first bot persistence.
 * @param botPersistence2 The second bot persistence.
 * @returns The merged bot persistence.
 */
export default function(botPersistence1?: JeanBotPersistence, botPersistence2?: JeanBotPersistence) : JeanBotPersistence {
  return {
    questCount: (botPersistence1?.questCount ?? 0) + (botPersistence2?.questCount ?? 0),
    projectCardCount: (botPersistence1?.projectCardCount ?? 0) + (botPersistence2?.projectCardCount ?? 0),
    discRemovedCount: (botPersistence1?.discRemovedCount ?? 0) + (botPersistence2?.discRemovedCount ?? 0),
    vp: (botPersistence1?.vp ?? 0) + (botPersistence2?.vp ?? 0)
  }
}
