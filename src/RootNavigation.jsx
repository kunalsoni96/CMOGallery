import DashboardNavigation from './pages/DashboardNavigation';
import AuthStackNavigation from './pages/AuthStackNavigation';
import { useEffect, useState } from 'react';
import * as Keychain from 'react-native-keychain';
import { useSelector } from 'react-redux';
const RootNavigation = () => {
  const [isAuth, setIsAuth] = useState(false)
  const isloggedUser = useSelector(state=>state.login.isloggedIn)
 
  const checkLoginStatus = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      console.log(credentials, '-fffffff')
      if (credentials) {
        setIsAuth(true)
      } else {
        setIsAuth(false)
      }
    } catch (error) {
      console.log('Error retrieving credentials', error);
      setIsAuth(false);
    }
  };

  useEffect(()=>{
    checkLoginStatus()
  },[isloggedUser])

  return (
        <>
           {isAuth ? <DashboardNavigation/>:<AuthStackNavigation/>}
        </>
  )
}

export default RootNavigation
