import { Play } from 'phosphor-react'
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
} from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

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
}

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  // You can set the language here or get it from a context/state
  const lang = 'en' // or 'pt' for Portuguese

  const { register, handleSubmit, watch, formState } =
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
    console.log(data)
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
              min={5}
              max={60}
              {...register('minutesAmount', { valueAsNumber: true })}
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
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountDownButton type='submit' disabled={isSubmitDisabled}>
          <Play size={24} />
          {translations.start[lang]}
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}
