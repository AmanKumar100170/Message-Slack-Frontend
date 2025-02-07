import { AuthContextProvider } from '@/context/AuthContext';

import combineContext from './combineContext';

export const AppContextProvider = combineContext(
    AuthContextProvider
);