import { SignInContext } from './SignInProvider';
import React from 'react';

export function useSignIn() {
    const context = React.useContext(SignInContext);

    if (!context) {
        throw new Error('use only context provider!');
    }

    return context;
}
