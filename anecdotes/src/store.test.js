import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(), 
    createNew: vi.fn(), 
    update: vi.fn()
  }
}))

import anecdoteService from './services/anecdotes'
import useAnecdoteStore, {useAnecdotes, useAnecdotesControl} from "./store";

beforeEach(() => {
  useAnecdoteStore.setState({anecdotes: [], filter: ''})
  vi.clearAllMocks()
})

describe('useAnecdotesControl', () => {
  it('initialize loads anecdotes from service', async () => {
    const mockAnecdotes = [{content: 'Test', id: 'abcd', votes: 0}]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const {result} = renderHook(() => useAnecdotesControl())

    await act(async () => {
      await result.current.initialize()
    })

    const {result: anecdoteResult} = renderHook(() => useAnecdotes())
    expect(anecdoteResult.current).toEqual(mockAnecdotes)
  })

  it('displaying anecdotes sorted by votes', async () => {
    const mockAnecdotes = [
      {content: 'Test', id: 'abcd', votes: 0},
      {content: 'Example', id: 'qwiqe', votes: 1}
    ]
    useAnecdoteStore.setState({anecdotes: mockAnecdotes})

    const {result: anecdoteResult} = renderHook(() => useAnecdotes())
    expect(anecdoteResult.current[0]).toEqual(mockAnecdotes[1])
  })

  it('displaying properly filtered list of anecdotes', async () => {
    const mockAnecdotes = [
      {content: 'Test', id: 'abcd', votes: 0},
      {content: 'Example', id: 'qwiqe', votes: 1}
    ]
    useAnecdoteStore.setState({anecdotes: mockAnecdotes})

    const {result} = renderHook(() => useAnecdotesControl())

    await act(async () => {
      await result.current.setFilter('Test')
    })

    const {result: anecdoteResult} = renderHook(() => useAnecdotes())

    expect(anecdoteResult.current).toHaveLength(1)
    expect(anecdoteResult.current[0]).toEqual(mockAnecdotes[0])
  })

  it('voting increases the number of votes', async () => {
    const mockAnecdotes = [{content: 'Test', id: 'abcd', votes: 0}]
    useAnecdoteStore.setState({anecdotes: mockAnecdotes})
    anecdoteService.update.mockResolvedValue({...mockAnecdotes[0], votes: 1})

    const {result} = renderHook(() => useAnecdotesControl())

    await act(async () => {
      await result.current.addVote('abcd')
    })

    const {result: anecdoteResult} = renderHook(() => useAnecdotes())

    expect(anecdoteResult.current[0].votes).toEqual(1)
  })
})