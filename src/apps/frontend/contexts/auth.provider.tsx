import React, { createContext, ReactNode, useContext } from 'react';
import { AuthContextType } from '../types/auth.types';


const AuthDetailsContext = createContext<AuthContextType | undefined>(undefined);

export function useAuthDetails(): AuthContextType {
    return useContext(AuthDetailsContext);
}

export function AuthDetailsProvider(props: {
        children: ReactNode,
        authDetails: AuthContextType,
    }): React.ReactElement {
    const {
        children,
        authDetails,
    } = props;

    return (
        <AuthDetailsContext.Provider value={authDetails}>
            {children}
        </AuthDetailsContext.Provider>
    );
}
