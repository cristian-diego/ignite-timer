import { createContext, useReducer, useState } from 'react'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

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

type CycleState = {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function CycleContextProvider({ children }: CycleContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    (state: CycleState, action: any) => {
      console.log('Reducer', state, action)
      switch (action.type) {
        case 'ADD_NEW_CYCLE':
          console.log('ADD_NEW_CYCLE')
          return {
            ...state,
            cycles: [...state.cycles, action.payload],
            activeCycleId: action.payload.id,
          }
        case 'MARK_CURRENT_CYCLE_AS_FINISHED':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
              }
              return cycle
            }),
            activeCycleId: null,
          }
        case 'INTERRUPT_CURRENT_CYCLE':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return { ...cycle, interruptedDate: new Date() }
              }
              return cycle
            }),
            activeCycleId: null,
          }
        default:
          return state
      }
    },
    {
      cycles: [],
      activeCycleId: null,
    }
  )

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cyclesState.cycles.find(
    (cycle) => cycle.id === cyclesState.activeCycleId
  )

  function markCurrentCycleAsFinished() {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
    })
  }

  function createNewCycle(data: CreateNewCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: newCycle,
    })

    setSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
    })
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
