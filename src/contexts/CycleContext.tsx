import { createContext, useReducer, useState } from 'react'
import { Cycle } from '../models/cycle'
import { cyclesReducer } from '../reducers/cycles/reducer'
import {
  ActionTypes,
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions'

interface CycleContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  cycles: Cycle[]
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (amountSecondsPassed: number) => void
  amountSecondsPassed: number
  createNewCycle: (data: CreateNewCycleData) => void
  interruptCurrentCycle: () => void
}

export const CycleContext = createContext<CycleContextType>(
  {} as CycleContextType
)

interface CreateNewCycleData {
  task: string
  minutesAmount: number
}

interface CycleContextProviderProps {
  children: React.ReactNode
}

export function CycleContextProvider({ children }: CycleContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cyclesState.cycles.find(
    (cycle) => cycle.id === cyclesState.activeCycleId
  )

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  function createNewCycle(data: CreateNewCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))

    setSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  function setSecondsPassed(amountSecondsPassed: number) {
    setAmountSecondsPassed(amountSecondsPassed)
  }

  return (
    <CycleContext.Provider
      value={{
        activeCycle,
        activeCycleId: cyclesState.activeCycleId,
        cycles: cyclesState.cycles,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        amountSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
