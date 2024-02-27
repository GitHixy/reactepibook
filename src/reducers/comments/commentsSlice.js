import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "../books/booksSlice";


const initialState = {
    comments: [],
    status: 'idle',
    error: null,
};

export const getComments = createAsyncThunk(
    'comments/GETcomments',
    async(elementId) => {
        try {
            const urlGET = `https://striveschool-api.herokuapp.com/api/books/${elementId}/comments/`;
            const res = await axios.get(urlGET, {
                headers: {'Authorization': `Bearer ${token}`}
              });
              return await res.data;
        } catch (e) {
            console.log(e)
            throw(e)
        }
    }
)

export const addComment = createAsyncThunk(
    'comments/ADDcomments',
    async({elementId, comment, rate}) => {
        try{
            const urlPOST = 'https://striveschool-api.herokuapp.com/api/comments/'
            const res = await axios.post(urlPOST, {elementId, comment, rate},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                return res.data;
        } catch (e) {
            console.log(e)
            throw(e)
        }
    }
)

export const editComment = createAsyncThunk(
    'comments/EDITcomment',
    async ({ commentId, comment, rate }) => {
      try {
        const urlPUT = `https://striveschool-api.herokuapp.com/api/comments/${commentId}`
        const response = await axios.put(urlPUT,
        { comment, rate },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        return response.data;
      } catch (e) {
        console.log(e)
        throw(e)
      }
    }
  );

  export const deleteComment = createAsyncThunk(
    'comments/DELETEcomment',
    async (commentId) => {
      try {
        const urlDELETE = `https://striveschool-api.herokuapp.com/api/comments/${commentId}`;
        await axios.delete(urlDELETE, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        return commentId;
      } catch (e) {
        console.log(e)
        throw(e)
      }
    }
  );

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    extraReducers(builder) {
        builder
                .addCase(getComments.pending, (state) => {
                    state.status = 'loading';
                })
                .addCase(getComments.fulfilled, (state, action) =>{
                    state.status = 'succeeded';
                    state.comments = action.payload.reverse().slice(0, 5);
                })
                .addCase(getComments.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message;
                })
                .addCase(addComment.fulfilled, (state, action) => {
                    state.comments.unshift(action.payload); 
                  })
                .addCase(editComment.fulfilled, (state, action) => {
                    const index = state.comments.findIndex(comment => comment._id === action.payload._id);
                    if (index !== -1) {
                      state.comments[index] = action.payload; 
                    }
                  })
                .addCase(deleteComment.fulfilled, (state, action) => {
                    state.comments = state.comments.filter(comment => comment._id !== action.payload);
                  });
    },
});

export const {resetComments} = commentsSlice.actions;
export const allComments = (state) => state.commentsData.comments;
export default commentsSlice.reducer;