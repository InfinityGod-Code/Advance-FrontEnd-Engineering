import { useEffect } from 'react'
import './App.css'
// Use our TYPED Redux hooks (gives state autocomplete + thunk dispatch support).
import { useAppSelector, useAppDispatch } from './hooks';
// Import the async thunk so we can dispatch it from the UI.
import { fetchUser } from './redux';

function App() {
  // Read the whole "user" slice from the Redux store.
  // It contains: { user, status, error }
  const { user, status, error } = useAppSelector((state) => state.user);

  // Typed dispatch: allows dispatching both normal actions and async thunks.
  const dispatch = useAppDispatch();

  // Auto-fetch on mount: as soon as the component renders, we kick off the API call
  // for user id "1". The empty dependency array means this runs only once.
  useEffect(() => {
    dispatch(fetchUser('1'));
  }, [dispatch]);

  return (
    <>
      <h1>User from API</h1>

      {/* While the request is in flight, show a loading message. */}
      {status === 'loading' && <p>Loading user…</p>}

      {/* If the request failed, show the error message. */}
      {status === 'failed' && <p>Error: {error}</p>}

      {/* Once the request succeeds, render the fetched user data. */}
      {status === 'succeeded' && user && (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Website:</strong> {user.website}</p>
        </div>
      )}
    </>
  )
}

export default App
