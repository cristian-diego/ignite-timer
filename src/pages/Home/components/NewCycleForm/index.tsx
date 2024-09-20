import { useFormContext } from 'react-hook-form'
import { translations } from '../../../../translations'
import {
  FormContainer,
  MinutesAmountInput,
  TaskInput,
  ValidationError,
  ValidationErrorsContainer,
} from './styles'

import { useContext } from 'react'
import { CycleContext } from '../..'

export function NewCycleForm() {
  const { activeCycle } = useContext(CycleContext)
  const { register, formState } = useFormContext()
  const lang = 'en' // or 'pt' for Portuguese

  return (
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

      {formState.isSubmitted && Object.keys(formState.errors).length > 0 && (
        <ValidationErrorsContainer>
          {Object.entries(formState.errors).map(([field, error]) => (
            <ValidationError key={field}>
              {error?.message as string}
            </ValidationError>
          ))}
        </ValidationErrorsContainer>
      )}
    </div>
  )
}
