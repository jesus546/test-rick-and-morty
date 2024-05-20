import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface InFilterCharacter {
  species: string;
  gender: string;
  status: string;
  sort: string;
}
export interface InCommentsCharacter {
  id: string;
  comments: string[];
}
// Define a type for the slice state
export interface InCharactersState {
  filterCharacters: InFilterCharacter;
  starredCharacters: string[];
  commentsCharacters: InCommentsCharacter[];
}

interface InCommentCharacter {
  id: string;
  comment: string;
}

// Define the initial state using that type
export const initialState: InCharactersState = {
  filterCharacters: {
    species: "",
    gender: "",
    status: "",
    sort: ""
  },
  starredCharacters: ["2", "4"],
  commentsCharacters: [],
};

export const characters = createSlice({
  name: "characters",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setFilterCharacter: (state, action: PayloadAction<InFilterCharacter>) => {
      state.filterCharacters = action.payload;
    },
    setStarredCharacters: (state, action: PayloadAction<string>) => {
      state.starredCharacters = [action.payload, ...state.starredCharacters];
    },

    setDeleteStarredCharacters: (state, action: PayloadAction<string>) => {
      const result = state.starredCharacters.filter(
        (e) => e !== action.payload
      );
      state.starredCharacters = [...result];
    },
    setCommentCharacter: (state, action: PayloadAction<InCommentCharacter>) => {
      let newArray: InCommentsCharacter[] = [];
      const result = state.commentsCharacters.find(
        (e) => e.id === action.payload.id
      );
      if (result) {
        newArray = state.commentsCharacters.map((e) => {
          if (e.id === action.payload.id) {
            return {
              id: e.id,
              comments: [...e.comments, action.payload.comment],
            };
          } else {
            return e;
          }
        });
      } else {
        newArray = [
          ...state.commentsCharacters,
          { id: action.payload.id, comments: [action.payload.comment] },
        ];
      }
      state.commentsCharacters = [...newArray];
    },
  },
});

export const {
  setFilterCharacter,
  setStarredCharacters,
  setDeleteStarredCharacters,
  setCommentCharacter,
} = characters.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectFilterCharacters = (state: RootState) =>
  state.characters.filterCharacters;
export const selectStarredCharacters = (state: RootState) =>
  state.characters.starredCharacters;
export const selectCommentsCharacters = (state: RootState) =>
  state.characters.commentsCharacters;

export default characters.reducer;
