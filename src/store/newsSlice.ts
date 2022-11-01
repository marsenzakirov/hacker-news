import { createSlice } from "@reduxjs/toolkit";
import { items } from "../types";

const initialState = {
  items: [] as items[],
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNews: (state: any, action: any) => {
      state.items = action.payload;
    },
    addNews: (state: any, action: any) => {
      state.items = [...state.items, ...action.payload];
    },
  },
});

export const { setNews, addNews } = newsSlice.actions;
export default newsSlice.reducer;
