import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'

import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

const newCycleFormDataSchema = zod.object({
  task: zod.string().min(1, 'Informar tarefa'),
  minutesAmount: zod.number().min(5).max(60, 'O intervalor é de 5-60'),
})
// inferência de tipagem
type NewCycleFormData = zod.infer<typeof newCycleFormDataSchema>

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormDataSchema),
    defaultValues: {
      minutesAmount: 0,
      task: '',
    },
  })

  function handleCreateAnewCicle(data: NewCycleFormData) {
    console.log(data)
    reset()
  }

  const taskWatch = watch('task')
  const isSubmitDisable = !taskWatch
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateAnewCicle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            list="task-suggestions"
            type="text"
            id="task"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
            <option value="Projeto 5" />
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutos</span>
        </FormContainer>
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>
        <StartCountdownButton disabled={isSubmitDisable} type="submit">
          <Play />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
