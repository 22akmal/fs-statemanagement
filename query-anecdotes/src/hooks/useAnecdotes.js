import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdote, createAnecdote } from "../requests";
import useNotify from "./useNotify";

export const useAnecdotes = () => {
  const queryClient = useQueryClient()
  const {addNotif, votedNotif, errorNotif} = useNotify()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
    refetchOnWindowFocus: false
  })

  const anecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
      addNotif(anecdote)
    },
    onError: (e) => {
      errorNotif()
    }
  })
  
  const updateMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
      votedNotif(anecdote)
    }
  })

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (content) => anecdoteMutation.mutate({content, votes: 0}),
    handleVote: (anecdote) => updateMutation.mutate({...anecdote, votes: anecdote.votes+1})

  }
}