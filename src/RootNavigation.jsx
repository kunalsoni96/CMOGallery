import DashboardNavigation from './pages/DashboardNavigation';
import AuthStackNavigation from './pages/AuthStackNavigation';
import { useEffect, useState } from 'react';
const RootNavigation = () => {
  const [isAuth, setIsAuth] = useState(false)
  const checkLoginStatus = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
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
  },[])
  return (
        <>
           {isAuth? <DashboardNavigation/>:<AuthStackNavigation/>}
        </>
  )
}

export default RootNavigation
