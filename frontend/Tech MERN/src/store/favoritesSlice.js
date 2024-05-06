import { createSlice } from '@reduxjs/toolkit';
import { localStorageConfig } from '../config/localStorageConfig';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favoriteItems: [],
  },
  reducers: {
    setAddToFavorites: (state, action) => {
      let copyFavoriteItems = [...state.favoriteItems];
      let findIndex = null;

      copyFavoriteItems.find((item, index) => {
        if (item._id === action.payload._id) {
          findIndex = index;
          return;
        }
      });

      if (findIndex === null && !action.payload.isLiked) {
        copyFavoriteItems.push({
          ...action.payload,
          isLiked: true,
        });
      } else if (findIndex !== null) {
        copyFavoriteItems.splice(findIndex, 1);
      }

      state.favoriteItems = copyFavoriteItems;
      console.log(state.favoriteItems);
    },
    setRemoveFromFavorites: (state, action) => {
      let copyFavoriteItems = [...state.favoriteItems];
      let findIndex = null;

      copyFavoriteItems.find((item, index) => {
        if (item._id === action.payload._id) {
          findIndex = index;
          return;
        }
      });

      if (findIndex !== null) {
        copyFavoriteItems.splice(findIndex, 1);
      }

      state.favoriteItems = copyFavoriteItems;
    },
    setFavorites: (state, action) => {
      state.favoriteItems = action.payload;
    },
  },
});

export const { setAddToFavorites, setRemoveFromFavorites, setFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
