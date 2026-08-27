import { configureStore} from '@reduxjs/toolkit';
import userSlice from './redux';

const store = configureStore({
  reducer: {
    user : userSlice
  },
});

// Type helpers derived from the store, so the UI gets full type safety:
// - RootState: the overall shape of the Redux state (used by useSelector)
// - AppDispatch: the dispatch function type (used by useDispatch, supports thunks)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;