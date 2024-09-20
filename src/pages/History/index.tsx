import { useContext } from 'react'
import { HistoryContainer, HistoryTableContainer, Status } from './styles'
import { CycleContext } from '../../contexts/CycleContext'
import { formatDistanceToNow } from 'date-fns'
import { ptBR, enUS } from 'date-fns/locale'
import { CultureContext } from '../../contexts/CultureContext'
import { translations } from '../../translations'

export function History() {
  const { cycles } = useContext(CycleContext)

  const { culture } = useContext(CultureContext)
  const locale = culture === 'pt' ? ptBR : enUS
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryTableContainer>
        <table>
          <thead>
            <tr>
              <th>{translations.task[culture]}</th>
              <th>{translations.duration[culture]}</th>
              <th>{translations.startedAt[culture]}</th>
              <th>{translations.status[culture]}</th>
            </tr>
          </thead>

          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>
                  {cycle.minutesAmount} {translations.minutes[culture]}
                </td>
                <td>
                  {formatDistanceToNow(cycle.startDate, {
                    addSuffix: true,
                    locale,
                  })}
                </td>
                <td>
                  {cycle.finishedDate ? (
                    <Status statusColor='green'>
                      {translations.finished[culture]}
                    </Status>
                  ) : cycle.interruptedDate ? (
                    <Status statusColor='red'>
                      {translations.interrupted[culture]}
                    </Status>
                  ) : (
                    <Status statusColor='yellow'>
                      {translations.inProgress[culture]}
                    </Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryTableContainer>
    </HistoryContainer>
  )
}
