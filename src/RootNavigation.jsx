import DashboardNavigation from './pages/DashboardNavigation';
import AuthStackNavigation from './pages/AuthStackNavigation';
const RootNavigation = () => {
  const isAuth = false;
  return (
        <>
           {isAuth? <DashboardNavigation/>:<AuthStackNavigation/>}
        </>
  )
}

export default RootNavigation
