import anecdotes from './services/anecdotes'
import anecdoteService from './services/anecdotes'
import { create } from 'zustand'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    addVote: async (id) => {
      const anecdote = get().anecdotes.find(a => a.id === id)
      const updated = await anecdoteService.update(id, {...anecdote, votes: anecdote.votes+1})
      set(state => ({anecdotes: state.anecdotes.map(a => a.id === id ? updated : a)}))
    },
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({anecdotes}))
    },
    addAnecdote: async (anecdote) => {
      const newAnecdote = await anecdoteService.createNew(anecdote)
      set(state => ({anecdotes: state.anecdotes.concat(newAnecdote)}))
    },
    setFilter: value => set(() => ({filter : value})),
    deleteAnecdote: async (id) => {
      await anecdoteService.deleteAnecdote(id)
      set(state => ({anecdotes : state.anecdotes.filter(a => a.id !== id)}))
    }
  },
}))

const useNotifStore = create((set) => ({
  notif: '',
  setNotif: message => set(() => ({notif: message}))
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)

  return anecdotes.filter(anecdote => anecdote.content.includes(filter)).toSorted((a, b) => b.votes - a.votes)
}
export const useAnecdotesControl = () => useAnecdoteStore((state) => state.actions)

export const useNotif = () => useNotifStore((state) => state.notif)
export const useNotifControl = () => useNotifStore((state) => state.setNotif)

export default useAnecdoteStore