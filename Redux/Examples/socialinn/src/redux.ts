import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

// The shape of our Redux state for the "user" slice.
// - user:   the fetched user object (null until a successful request)
// - status: tracks the lifecycle of the async API call
// - error:  holds an error message when the request fails
type UserState = {
  user: any | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
};

// The starting point of the slice before any API call is made.
const initialState: UserState = {
  user: null,
  status: 'idle',
};

// Async thunk that performs the actual API call.
// It takes a userId (string) and returns the fetched user data.
// Redux Toolkit generates three "action" states for it automatically:
//   fetchUser.pending    -> request started
//   fetchUser.fulfilled  -> request succeeded
//   fetchUser.rejected   -> request failed
// We export it so the UI (App.tsx) can dispatch it.
export const fetchUser = createAsyncThunk('user/fetchUser', async (userId: string) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  const data = await response.json();
  return data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  // extraReducers let us react to the async thunk's lifecycle actions.
  extraReducers: (builder) => {
    builder
      // Request in flight: show a loading state.
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      // Request succeeded: store the returned user and mark success.
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      // Request failed: store the error message for the UI to show.
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || undefined;
      });
  },
});

export default userSlice.reducer;
