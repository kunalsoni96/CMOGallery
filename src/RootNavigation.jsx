import DashboardNavigation from './pages/DashboardNavigation';
import AuthStackNavigation from './pages/AuthStackNavigation';
import { useEffect, useState } from 'react';
import * as Keychain from 'react-native-keychain';
import { useDispatch, useSelector } from 'react-redux';
import SplashScreen from './pages/authentications/SplashScreen';
import { googleLoggedIn } from './redux/actions/loginAction';

const RootNavigation = () => {
  const dispatch = useDispatch()
  const isloggedUser = useSelector(state => state.login.isloggedIn);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkLoginStatus = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        console.log(credentials, 'credentialscredentialscredentials')
        setIsAuthenticated(true);
        dispatch(googleLoggedIn(credentials.password))
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log('Error', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    setTimeout(() => {
      checkLoginStatus();
    }, 1000); 
  }, [isloggedUser]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return isAuthenticated ? <DashboardNavigation /> : <AuthStackNavigation />;
};

export default RootNavigation;
