import { Play } from 'phosphor-react'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  TaskInput,
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form>
        {/* Input data */}
        <FormContainer>
          <label htmlFor='task'>Vou trabalhar em</label>
          <TaskInput
            id='task'
            list='tasks-suggestions'
            placeholder='Dê um nome para seu projeto'
          />

          <datalist id='tasks-suggestions'>
            <option value='Projeto 1' />
            <option value='Projeto 2' />
            <option value='Projeto 3' />
            <option value='Projeto 4' />
            <option value='Projeto 5' />
            <option value='Projeto 6' />
          </datalist>

          <label htmlFor='minutesAmount'>durante</label>
          <MinutesAmountInput
            type='number'
            id='minutesAmount'
            placeholder='00'
            step={5}
            min={5}
            max={60}
          />

          <span>minutos.</span>
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

        <button>
          <Play size={24} />
          Começar
        </button>
      </form>
    </HomeContainer>
  )
}
