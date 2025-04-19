import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from './homes/DashboardScreen';
import LoginScreen from './authentications/LoginScreen';
import VerificationScreen from './authentications/VerificationScreen';
import SplashScreen from './authentications/SplashScreen';
import RegisterScreen from './authentications/RegisterScreen';
// import ProfileScreen from './homes/ProfileScreen';
const Stack = createNativeStackNavigator();
const RootNavigation = () => {
  return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='SplashScreen'>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
        </Stack.Navigator>
  )
}

export default RootNavigation
