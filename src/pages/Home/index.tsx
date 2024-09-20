import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createContext, useEffect, useState } from 'react'
import { translations } from '../../translations'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import {
  NewCycleFormData,
  NewCycleFormValidationSchema,
} from './components/NewCycleForm/new-cycle-form-type'

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
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (amountSecondsPassed: number) => void
  amountSecondsPassed: number
}

export const CycleContext = createContext<CycleContextType>(
  {} as CycleContextType
)

export function Home() {
  // You can set the language here or get it from a context/state
  const lang = 'en' // or 'pt' for Portuguese

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(NewCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const task = watch('task')
  const isSubmitDisabled = !task

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        }
        return cycle
      })
    )

    setActiveCycleId(null)
  }

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)
    setSecondsPassed(0)
    reset()
  }

  function handleStopCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            interruptedDate: new Date(),
          }
        }
        return cycle
      })
    )
    setActiveCycleId(null)
  }

  function setSecondsPassed(amountSecondsPassed: number) {
    setAmountSecondsPassed(amountSecondsPassed)
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CycleContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            setSecondsPassed,
            amountSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>

          <Countdown />
        </CycleContext.Provider>

        {activeCycle ? (
          <StopCountDownButton type='button' onClick={handleStopCycle}>
            <HandPalm size={24} />
            {translations.stop[lang]}
          </StopCountDownButton>
        ) : (
          <StartCountDownButton type='submit' disabled={isSubmitDisabled}>
            <Play size={24} />
            {translations.start[lang]}
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
