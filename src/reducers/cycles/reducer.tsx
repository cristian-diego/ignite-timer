import { Cycle } from '../../models/cycle'
import { ActionTypes } from './actions'
import { produce } from 'immer'
type CycleState = {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CycleState, action: any) {
  const { isValid, currentCycleIndex } = isActionValid(action, state)

  if (!isValid) {
    return state
  }

  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload)
        draft.activeCycleId = action.payload.id
      })
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].finishedDate = new Date()
        draft.activeCycleId = null
      })
    }

    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
        draft.activeCycleId = null
      })
    default:
      return state
  }
}

function isActionValid(action: any, state: CycleState) {
  const currentCycleIndex = state.cycles.findIndex(
    (cycle) => cycle.id === state.activeCycleId
  )

  // If the action is not ADD_NEW_CYCLE and the current cycle index is less than 0,
  // it means that the action is not valid
  if (action.type !== ActionTypes.ADD_NEW_CYCLE && currentCycleIndex < 0) {
    return { isValid: false, currentCycleIndex }
  }

  return { isValid: true, currentCycleIndex }
}
