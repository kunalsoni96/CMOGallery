import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/RootNavigation';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import NetworkListner from './src/pages/components/NetWorkListner';
import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
const App = () => {
  const [internet, setInternet] = useState(true)
  useEffect(() => {
    NetInfo.addEventListener(state => {
    if(!state.isConnected && !state.isInternetReachable){
      setInternet(false)
    }
    else{
      setInternet(true)
    }
    });

  }, []);
  return (
    <Provider store={store}>
    <NavigationContainer>
      <RootNavigation />
      {!internet &&
      <NetworkListner />
      }
    </NavigationContainer>
    </Provider>
  )
}

export default App
