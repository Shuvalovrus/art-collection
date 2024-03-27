import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import type { RootState } from "../../app/store"

interface Card {
  id: number
  title: string
  culture: string
  primaryimageurl: string
}

interface CardsState {
  cards: Card[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null // Указываем, что error может быть строкой или null
}

const initialState: CardsState = {
  cards: [],
  status: "idle",
  error: null,
}

export const fetchData = async (page: number) => {
  const response = await fetch(
    `https://api.harvardartmuseums.org/object?apikey=b32e07c4-2a7c-4f05-aea1-0be744328ef4&hasimage=1&classification=26&q=imagepermissionlevel:0&page=${page}`,
  )
  const data = await response.json()
  return data
}

export const fetchCards = createAsyncThunk("quotes/fetchCards", fetchData)

export const cardsApiSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCards.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.cards = state.cards.concat(action.payload.records)
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "An error occurred"
      })
  },
})

export const selectAllCards = (state: RootState): Card[] => state.cards.cards

export const selectCardById = (state: RootState, postId: number) =>
  state.cards.cards.find(post => post.id === postId)
