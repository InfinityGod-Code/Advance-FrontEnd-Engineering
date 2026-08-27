import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Typed versions of the Redux hooks.
// Using these instead of the plain useDispatch/useSelector gives you:
//   - correct autocomplete for state slices
//   - the ability to dispatch thunks (async actions) without type errors
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
