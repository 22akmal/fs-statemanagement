import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import Filter from "./components/Filter"
import { useAnecdotesControl } from "./store"
import { useEffect } from "react"

const App = () => {
  const {initialize} = useAnecdotesControl()

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <div>
      <Filter/>
      <h2>Anecdotes</h2>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App
