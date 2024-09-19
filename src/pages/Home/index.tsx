import { HandPalm, Play } from 'phosphor-react'
import {
  CountdownContainer,
  FormContainer,
  ValidationError,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  TaskInput,
  ValidationErrorsContainer,
  StopCountDownButton,
} from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

const translations = {
  workingOn: {
    pt: 'Vou trabalhar em',
    en: 'I will work on',
  },
  projectNamePlaceholder: {
    pt: 'Dê um nome para seu projeto',
    en: 'Name your project',
  },
  during: {
    pt: 'durante',
    en: 'for',
  },
  minutes: {
    pt: 'minutos.',
    en: 'minutes.',
  },
  start: {
    pt: 'Começar',
    en: 'Start',
  },
  stop: {
    pt: 'Parar',
    en: 'Stop',
  },
}

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no mínimo 1 minuto.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export function Home() {
  // You can set the language here or get it from a context/state
  const lang = 'en' // or 'pt' for Portuguese

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        )

        if (secondsDifference < totalSeconds) {
          setAmountSecondsPassed(secondsDifference)
        } else {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return {
                  ...cycle,
                  finishedDate: new Date(),
                }
              }
              return cycle
            })
          )
          setActiveCycleId(null)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${activeCycle.task} - ${minutes}:${seconds}`
    }
  }, [activeCycle, minutes, seconds])

  const { register, handleSubmit, watch, formState, reset } =
    useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
        task: '',
        minutesAmount: 0,
      },
    })

  const task = watch('task')
  const isSubmitDisabled = !task

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)
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

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <div>
          <FormContainer>
            <label htmlFor='task'>{translations.workingOn[lang]}</label>

            <TaskInput
              id='task'
              list='tasks-suggestions'
              placeholder={translations.projectNamePlaceholder[lang]}
              {...register('task')}
              disabled={!!activeCycle}
            />

            <datalist id='tasks-suggestions'>
              <option value='Projeto 1' />
              <option value='Projeto 2' />
              <option value='Projeto 3' />
              <option value='Projeto 4' />
              <option value='Projeto 5' />
              <option value='Projeto 6' />
            </datalist>

            <label htmlFor='minutesAmount'>{translations.during[lang]}</label>
            <MinutesAmountInput
              type='number'
              id='minutesAmount'
              placeholder='00'
              step={5}
              min={1}
              max={60}
              {...register('minutesAmount', { valueAsNumber: true })}
              disabled={!!activeCycle}
            />

            <span>{translations.minutes[lang]}</span>
          </FormContainer>

          {formState.isSubmitted &&
            Object.keys(formState.errors).length > 0 && (
              <ValidationErrorsContainer>
                <span>Validation errors</span>
                {Object.entries(formState.errors).map(([field, error]) => (
                  <ValidationError key={field}>
                    {error?.message}
                  </ValidationError>
                ))}
              </ValidationErrorsContainer>
            )}
        </div>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

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
