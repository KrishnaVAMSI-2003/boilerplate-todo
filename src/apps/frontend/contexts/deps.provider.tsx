import React, { createContext, ReactNode, useContext } from 'react';

import { AccessService, SignupService } from '../services';
import { SnackBar } from '../types/task.types';

type Deps = {
  accessService: AccessService,
  signupService: SignupService,
  isLoginPage: boolean,
  setIsLoginPage: React.Dispatch<React.SetStateAction<boolean>>,
  snackbar: SnackBar,
  setSnackbar: React.Dispatch<React.SetStateAction<SnackBar>>,
};

const DepsContext = createContext<Deps | undefined>(undefined);

export function useDeps(): Deps {
  return useContext(DepsContext);
}

export function DepsProvider(props: {
  children: ReactNode,
  deps: Deps,
}): React.ReactElement {
  const {
    children,
    deps,
  } = props;

  return (
    <DepsContext.Provider value={deps}>
      {children}
    </DepsContext.Provider>
  );
}
