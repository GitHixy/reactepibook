import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'https://striveschool-api.herokuapp.com/books'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWNmNjA2NzA0NTcyZjAwMTk0OTM5NDIiLCJpYXQiOjE3MDgwODk0NDcsImV4cCI6MTcwOTI5OTA0N30.4kLfeBI7P4IfRFuz6GSWjcR0NNWLy3Z83VDASt-3j1k'

const initialState = {
    books: [],
    filteredBooks: [],
    isLoading: false,
    error: null
}

export const getBooks = createAsyncThunk(
    'books/GETBooks',
    async() => {
        try {
            const res = await axios.get(url, {
                headers: {'Authorization': `Bearer ${token}`}
              });
              return await res.data
            
        } catch (e) {
            console.log(e)
            throw(e)
        }
    }
)

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        filterBooks: (state, action) => {
            const inputPayload = action.payload.toLowerCase()
            if (inputPayload === '') {
                state.filteredBooks = [...state.books];
            }else {
                state.filteredBooks = state.books.filter((book) => {
                    return book.title.toLowerCase().includes(inputPayload);
            })
        }
        }
    },
    extraReducers: (builder) => {
        builder
                 .addCase(getBooks.pending, (state) =>{
                    state.isLoading = true;
                    state.error = null;
                 })
                 .addCase(getBooks.fulfilled, (state, action) =>{
                    state.isLoading = false;
                    state.books = action.payload;
                    state.filteredBooks = action.payload;
                    state.error = null;
                 })
                 .addCase(getBooks.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = `${action.error.code}: ${action.error.message}`;
                 })

    }
})

export const allBooks = (state) => state.booksData.filteredBooks;
export const isAllBooksLoading = (state) => state.booksData.isLoading
export const isAllBooksError = (state) => state.booksData.error
export const {filterBooks} = booksSlice.actions
export default booksSlice.reducer