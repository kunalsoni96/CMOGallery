import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from './homes/DashboardScreen';
import MyDashboardScreen from './homes/MyDashboardScreen';
import UploadPhotoScreen from './homes/UploadPhotoScreen';
import SearchEventScreen from './homes/SearchEventScreen';
import ProfileScreen from './homes/ProfileScreen';
import colors from '../constants/color';
import {View, Text, StyleSheet} from 'react-native'
const BottomStack = createBottomTabNavigator();
const RootNavigation = () => {
  return (
        <BottomStack.Navigator 
        screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor:colors.primary,
              height: 60,
            }
          }}
          >
            <BottomStack.Screen
            options={{
                tabBarIcon: ({ focused }) => (
                  <View style={styles.tab}>
                    <Text style={{ color: 'black', fontSize: 12 }}>
                      My Download
                    </Text>
                  </View>
                ),
              }}
            name="DashboardScreen" component={DashboardScreen} />

<          BottomStack.Screen
            options={{
                tabBarIcon: ({ focused }) => (
                  <View style={styles.tab}>
                    <Text style={{ color: 'black', fontSize: 12 }}>
                      My Download
                    </Text>
                  </View>
                ),
              }}
            name="DashboardScreen" component={DashboardScreen} />

            <BottomStack.Screen
            options={{
                tabBarIcon: ({ focused }) => (
                  <View style={styles.tab}>
                    <Text style={{ color: 'black', fontSize: 12 }}>
                      My Download
                    </Text>
                  </View>
                ),
              }}
            name="DashboardScreen" component={DashboardScreen} />
        </BottomStack.Navigator>
  )
}

const styles = StyleSheet.create({
    tab:{
        backgroundColor:"yellow",
        height:50,
        paddingHorizontal:30,
        borderRadius:40,
    }
})

export default RootNavigation
