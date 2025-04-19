import {View, Text} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from './pages/homes/DashboardScreen';
import LoginScreen from './pages/authentications/LoginScreen';
import VerificationScreen from './pages/authentications/VerificationScreen';
import SplashScreen from './pages/authentications/SplashScreen';
import RegisterScreen from './pages/authentications/RegisterScreen';
// import ProfileScreen from './pages/homes/ProfileScreen';
const Stack = createNativeStackNavigator();
const RootNavigation = () => {
  return (
        <Stack.Navigator initialRouteName='SplashScreen'>
            <Stack.Screen options={{ headerShown: false }} name="SplashScreen" component={SplashScreen} />
            <Stack.Screen options={{headerShown:false}} name="LoginScreen" component={LoginScreen} />
            <Stack.Screen options={{headerShown:false}} name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen options={{headerShown:false}} name="VerificationScreen" component={VerificationScreen} />
        </Stack.Navigator>
  )
}

export default RootNavigation
