import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch } from './types';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector = useSelector;
