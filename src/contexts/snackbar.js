import React, { createContext, useState, useContext } from "react";
import Snackbar from "../components/Snackbar";

const SnackbarContext = createContext({
    createSnackbar: null,
});

const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState(null);

  const createSnackbar = (information) => {
    if (!snackbar) return setSnackbar(information);
  }
  const destroySnackbar = () => setSnackbar(null);

  return (
    <SnackbarContext.Provider
      value={{ 
        createSnackbar
      }}
    >
      {children}
      {snackbar !== null && (<Snackbar handleClose={destroySnackbar} information={snackbar} />)}
    </SnackbarContext.Provider>
  );
};

const useSnackbar = () => {
    const snackbarContext = useContext(SnackbarContext);
    return snackbarContext;
}

export {SnackbarProvider, useSnackbar};