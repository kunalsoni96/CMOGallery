import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './authentications/LoginScreen';
import SplashScreen from './authentications/SplashScreen';
import RegisterScreen from './authentications/RegisterScreen';
import LoaderScreen from './components/LoaderScreen';
import UploadPhotoScreen from './authentications/UploadPhotoScreen';
import MobileRegisterScreen from './authentications/MobileRegisterScreen';
import ForgotPasswordScreen from './authentications/ForgotPasswordScreen';
import PrivacyPolicyScreen from './components/PrivacyPolicyScreen';
import TermServiceScreen from './components/TermServiceScreen';
// import ProfileScreen from './homes/ProfileScreen';
const Stack = createNativeStackNavigator();
const RootNavigation = () => {
  return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='LoginScreen'>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="UploadPhotoScreen" component={UploadPhotoScreen} />
            <Stack.Screen name="LoaderScreen" component={LoaderScreen} />
            <Stack.Screen name="MobileRegisterScreen" component={MobileRegisterScreen} />
            <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
            <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} />
            <Stack.Screen name="TermServiceScreen" component={TermServiceScreen} />
        </Stack.Navigator>
  )
}

export default RootNavigation
