import { createSlice } from '@reduxjs/toolkit';

const savedTheme = localStorage.getItem('theme') || 'light';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    value: savedTheme,
  },
  reducers: {
    toggleTheme: state => {
      const newTheme = state.value === 'light' ? 'dark' : 'light';
      state.value = newTheme;
      localStorage.setItem('theme', newTheme);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
