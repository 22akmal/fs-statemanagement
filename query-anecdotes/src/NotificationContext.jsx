import { createContext, useState } from "react";

const NotifContext = createContext()

export default NotifContext

export const NotifContextProvider = (props) => {
  const [notif, setNotif] = useState('')

  const funcWrapper = (message) => {
    setNotif(message)
    setTimeout(() => setNotif(''), 5000)
  }

  const addNotif = (anecdote) => funcWrapper(`anecdote '${anecdote} created'`)
  const votedNotif = (anecdote) => funcWrapper(`anecdote '${anecdote.content}' voted`)
  const errorNotif = () => funcWrapper('too short anecdote, must have length 5 or more')

  return (
    <NotifContext.Provider value={{notif, addNotif, votedNotif, errorNotif}}>
      {props.children}
    </NotifContext.Provider>
  )
}