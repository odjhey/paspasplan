import { observer } from 'mobx-react-lite'
import { useStore } from '../hooks/useStore'
import { useForm } from 'react-hook-form'
import { newTimelineId } from '../lib/id'

export const All = observer(() => {
  const { loading, store } = useStore()
  const { register, handleSubmit, reset, setFocus } = useForm<{
    name: string
  }>()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h1>Timelines</h1>

      <section>
        <form
          onSubmit={handleSubmit((v) => {
            store.addTimeline({
              name: v.name,
              id: newTimelineId(),
            })
            reset()
            setFocus('name')
          })}
        >
          <input
            {...register('name', { required: true })}
            className="input input-bordered"
          ></input>
          <button type="submit" className="btn btn-primary">
            save
          </button>
        </form>
      </section>

      {store.timelines.toString()}
    </>
  )
})
