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

import { differenceInSeconds } from 'date-fns'

import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useEffect, useState } from 'react'

const newCycleFormDataSchema = zod.object({
  task: zod.string().min(1, 'Informar tarefa'),
  minutesAmount: zod.number().min(5).max(60, 'O intervalor é de 5-60'),
})
// inferência de tipagem
type NewCycleFormData = zod.infer<typeof newCycleFormDataSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycle, setActiveCycle] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormDataSchema),
    defaultValues: {
      minutesAmount: 0,
      task: '',
    },
  })

  function handleCreateAnewCicle(data: NewCycleFormData) {
    const id = new Date().getTime().toString()

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    setCycles((state) => [...state, newCycle])
    setActiveCycle(id)
    setAmountSecondsPassed(0)
    reset()
  }

  const findActiveCycle = cycles.find((cycle) => cycle.id === activeCycle)

  useEffect(() => {
    let interval: number
    if (findActiveCycle) {
      interval = setInterval(() => {
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), findActiveCycle?.startDate!!),
        )
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [findActiveCycle])

  const totalSeconds = activeCycle ? findActiveCycle?.minutesAmount!! * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  const taskWatch = watch('task')
  const isSubmitDisable = !taskWatch

  useEffect(() => {
    if (findActiveCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, findActiveCycle])

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
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>
        <StartCountdownButton disabled={isSubmitDisable} type="submit">
          <Play />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
