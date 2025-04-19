import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/RootNavigation';
// import { Provider } from 'react-redux';
const App = () => {
  return (
    // <Provider>
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
    // </Provider>
  )
}

export default App
