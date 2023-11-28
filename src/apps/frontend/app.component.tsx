import React, { useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

// import { Header, Footer } from './components';
import { DepsProvider } from './contexts';
import { Config } from './helpers';
import { About, Login } from './pages';
import { AccessService, SignupService } from './services';
import InspectLet from './vendor/inspectlet';

import './app.global.scss';
import { Footer, Navbar } from './components';
import Home from './pages/home/home.component';
import SnackbarComponent from './components/snackbar/snackbar.component';
import { SnackBar } from './types/task.types';

export default function App(): React.ReactElement {
  const [isLoginPage, setIsLoginPage] = React.useState(true);
  const [snackbar, setSnackbar] = React.useState<SnackBar>({
    open: false,
    message: '',
    severity: 'info'
  });

  useEffect(() => {
    const inspectletKey = Config.getConfigValue('inspectletKey');

    if (inspectletKey) {
      InspectLet();
    }
    
    if(window.location.pathname === '/home') {
      setIsLoginPage(false);
    }
  }, []);

  return (
        <DepsProvider deps={{
          accessService: new AccessService(),
          signupService: new SignupService(),
          isLoginPage: isLoginPage,
          setIsLoginPage: setIsLoginPage,
          snackbar, setSnackbar
        }}>
          <Router>
          <Navbar/>
          <Routes>
            <Route path='/about' element={<About />} />
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<Home />} />
            {/* <Route path='*' element={<NotFound />} /> */}
          </Routes>
          <Footer/>
          </Router>
          {snackbar.open && <SnackbarComponent/>}
        </DepsProvider>
  );
}