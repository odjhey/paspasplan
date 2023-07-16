import { observer } from 'mobx-react-lite'
import { useStore } from '../hooks/useStore'
import { useForm } from 'react-hook-form'
import { newActivityId } from '../lib/id'

export const Home = observer(() => {
  const { store, loading } = useStore()
  const { register, handleSubmit, reset, setFocus } = useForm<{
    name: string
  }>()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h1>Home</h1>
      <section>
        <form
          onSubmit={handleSubmit((v) => {
            store.addActivity({
              name: v.name,
              id: newActivityId(),
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
      <section>
        {store.activities.map((activity) => {
          return (
            <div key={activity.id} className="p-2 flex justify-between">
              {activity.name} - {activity.id}
            </div>
          )
        })}
      </section>

      <section>
        {/* TODO: add create timeline item and add activities here */}
      </section>
    </>
  )
})
