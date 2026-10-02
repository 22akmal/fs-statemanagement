import { useAnecdotes, useAnecdotesControl } from "../store"
import { useNotifControl } from "../store"

const AnecdoteList = () => {
  const anecdotes = useAnecdotes().toSorted((a, b) => b.votes - a.votes)
  const {addVote, deleteAnecdote} = useAnecdotesControl()
  const setNotif = useNotifControl()

  const vote = async (id, content) => {
    await addVote(id)
    setNotif(`you voted '${content}'`)
    setTimeout(() => setNotif(''), 5000)
  }

  const delAnecdote = (id) => {
    deleteAnecdote(id)
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>{!anecdote.votes && <button onClick={() => delAnecdote(anecdote.id)}>delete</button>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList