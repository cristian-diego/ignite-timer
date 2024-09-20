import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { translations } from '../../translations'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import {
  NewCycleFormData,
  NewCycleFormValidationSchema,
} from './components/NewCycleForm/new-cycle-form-type'
import { useContext } from 'react'
import { CycleContext } from '../../contexts/CycleContext'
import { CultureContext } from '../../contexts/CultureContext'

export function Home() {
  const { culture } = useContext(CultureContext)

  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CycleContext)

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

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <StopCountDownButton type='button' onClick={interruptCurrentCycle}>
            <HandPalm size={24} />
            {translations.stop[culture]}
          </StopCountDownButton>
        ) : (
          <StartCountDownButton type='submit' disabled={isSubmitDisabled}>
            <Play size={24} />
            {translations.start[culture]}
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
