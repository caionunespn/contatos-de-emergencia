import React from 'react';

import {SnackbarProvider} from "./snackbar";
import {ThemeProvider} from "./theme";
import {AuthProvider} from "./auth";

const ContextProvider = ({children}) => {
  return (
    <SnackbarProvider>
      <AuthProvider>
        <ThemeProvider>
            {children}
        </ThemeProvider>
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default ContextProvider;