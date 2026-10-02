import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import { useNotif } from "./store"
import { useAnecdotesControl } from "./store"
import { useEffect } from "react"

const App = () => {
  const {initialize} = useAnecdotesControl()
  const message = useNotif()

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <div>
      <Filter/>
      {message && <Notification/>}
      <h2>Anecdotes</h2>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App
