import * as zod from 'zod'

export const NewCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no mínimo 1 minuto.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

export type NewCycleFormData = zod.infer<typeof NewCycleFormValidationSchema>
