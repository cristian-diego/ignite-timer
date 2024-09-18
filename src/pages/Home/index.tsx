import { Play } from 'phosphor-react'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  TaskInput,
} from './styles'

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

export function Home() {
  // You can set the language here or get it from a context/state
  const lang = 'en' // or 'pt' for Portuguese

  return (
    <HomeContainer>
      <form>
        {/* Input data */}
        <FormContainer>
          <label htmlFor='task'>{translations.workingOn[lang]}</label>
          <TaskInput
            id='task'
            list='tasks-suggestions'
            placeholder={translations.projectNamePlaceholder[lang]}
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
          />

          <span>{translations.minutes[lang]}</span>
        </FormContainer>

        {/* CountDown */}
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>
        {/* Button */}

        <StartCountDownButton type='submit'>
          <Play size={24} />
          {translations.start[lang]}
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}
