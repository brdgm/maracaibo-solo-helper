import { JeanBotPersistence } from '@/store/state'

/**
 * Get Jeans VP gained at end of each round.
 * @param botPersistence The bot persistence.
 * @return The VP gained this round.
 */
export default function(botPersistence?: JeanBotPersistence) : number {
  const projectCardCount = botPersistence?.projectCardCount ?? 0
  let discRemovedCount = botPersistence?.discRemovedCount ?? 0

  if (discRemovedCount > 22) {
    discRemovedCount = 22
  }

  let vpDiscRemoved = 0
  if (discRemovedCount > 5) {
    vpDiscRemoved = (discRemovedCount - 3) * 2
  }
  else if (discRemovedCount > 0) {
    vpDiscRemoved = discRemovedCount - 1
  }

  return projectCardCount + vpDiscRemoved
}
