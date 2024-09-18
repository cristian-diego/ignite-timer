import { HistoryContainer, HistoryTableContainer, Status } from './styles'

export function History() {
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryTableContainer>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Tarefa</td>
              <td>10 minutos</td>
              <td>Há cerca de 2 dias</td>
              <td>
                <Status statusColor='green'>Concluído</Status>
              </td>
            </tr>

            <tr>
              <td>Tarefa</td>
              <td>10 minutos</td>
              <td>Há cerca de 2 dias</td>
              <td>
                <Status statusColor='green'>Concluído</Status>
              </td>
            </tr>

            <tr>
              <td>Tarefa</td>
              <td>10 minutos</td>
              <td>Há cerca de 2 dias</td>
              <td>
                <Status statusColor='green'>Concluído</Status>
              </td>
            </tr>

            <tr>
              <td>Tarefa</td>
              <td>10 minutos</td>
              <td>Há cerca de 2 dias</td>
              <td>
                <Status statusColor='yellow'>Em andamento</Status>
              </td>
            </tr>

            <tr>
              <td>Tarefa</td>
              <td>10 minutos</td>
              <td>Há cerca de 2 dias</td>
              <td>
                <Status statusColor='red'>Interrompido</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryTableContainer>
    </HistoryContainer>
  )
}
