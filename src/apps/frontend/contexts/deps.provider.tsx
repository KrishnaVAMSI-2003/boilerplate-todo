import React, { createContext, ReactNode, useContext } from 'react';

import { AccessService, SignupService } from '../services';

type Deps = {
  accessService: AccessService,
  signupService: SignupService,
  isLoginPage: boolean,
  setIsLoginPage: React.Dispatch<React.SetStateAction<boolean>>,
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
