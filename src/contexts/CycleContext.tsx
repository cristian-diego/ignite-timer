import { createContext, useEffect, useReducer, useState } from 'react'
import { Cycle } from '../models/cycle'
import { cyclesReducer } from '../reducers/cycles/reducer'
import {
  ActionTypes,
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'

import timerFinishedSound from '../assets/sounds/timer-finished.mp3'
import timerInterruptedSound from '../assets/sounds/timer-interrupted.mp3'

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
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0'
      )

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }

      return initialState
    }
  )

  const activeCycle = cyclesState.cycles.find(
    (cycle) => cycle.id === cyclesState.activeCycleId
  )

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), activeCycle.startDate)
    }
    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())

    playSound(timerFinishedSound)
  }

  function playSound(sound: string) {
    const audio = new Audio(sound)
    audio.play()
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
    playSound(timerInterruptedSound)
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
