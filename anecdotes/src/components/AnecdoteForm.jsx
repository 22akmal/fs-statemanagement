import { useAnecdotesControl } from "../store"
import { useNotifControl } from "../store"

const AnecdoteForm = () => {
  const {addAnecdote} = useAnecdotesControl()
  const setNotif = useNotifControl()

  const newAnecdote = async (e) => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    await addAnecdote(anecdote)
    setNotif(`you've added '${anecdote}'`)
    setTimeout(() => setNotif(''), 5000)
    e.target.reset()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div>
          <input data-testid="new" name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm