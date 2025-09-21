import { JacquesBotPersistence } from '@/store/state'

/**
 * Sums up the values from two bot persistence.
 * @param botPersistence1 The first bot persistence.
 * @param botPersistence2 The second bot persistence.
 * @returns The merged bot persistence.
 */
export default function(botPersistence1?: JacquesBotPersistence, botPersistence2?: JacquesBotPersistence) : JacquesBotPersistence {
  return {
    vp: (botPersistence1?.vp ?? 0) + (botPersistence2?.vp ?? 0)
  }
}
