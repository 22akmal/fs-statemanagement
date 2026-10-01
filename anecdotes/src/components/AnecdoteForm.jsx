import { useAnecdotesControl } from "../store"

const AnecdoteForm = () => {
  const {addAnecdote} = useAnecdotesControl()

  const newAnecdote = (e) => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    addAnecdote(anecdote)
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