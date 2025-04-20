import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import DashboardScreen from './homes/DashboardScreen';
import ImageListScreen from './homes/ImageListScreen';
import MyDashboardScreen from './homes/MyDashBoardScreen';
import SearchEventScreen from './homes/SearchEventScreen';
import colors from '../constants/color';
import { DownNavImg, SearchFaceImg, ProfileNavImg, SearchImg, SerachDarkImg, HomeDarkImg, DownloadDarkImg, ProfileDarkImg, HomeWhiteImg, UploadDarkImg } from './assets';
import ProfileScreen from './homes/ProfileScreen';

const BottomStack = createBottomTabNavigator();
const { width } = Dimensions.get('window');

// 🔧 Custom TabBar
const CustomTabBar = ({ state, descriptors, navigation }) => {
  const icons = [
    {
     default:HomeWhiteImg, 
     active:HomeDarkImg,
    },
    {
      default:SearchImg, 
      active:SerachDarkImg
    },
    {
      default:SearchFaceImg,
      active:UploadDarkImg
    }, 
    {
     default:DownNavImg, 
     active:DownloadDarkImg
    },
    {
     default:ProfileNavImg,
     active:ProfileDarkImg
    }
    ];
  const labels = ['Home', 'Search', 'Upload', 'My Download', 'Profile'];

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const tabWidth = isFocused ? width * 0.3 : width * 0.15;
        const iconSource = isFocused ? icons[index].active : icons[index].default;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={[
              styles.tabButton,
              {
                width: tabWidth,
                backgroundColor: isFocused ? colors.secondary : 'transparent',
              },
            ]}
          >
            <Image source={iconSource} style={styles.iconImg} />
            {isFocused && <Text style={styles.labelText}>{labels[index]}</Text>}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const DashboardNavigation = () => {
  return (
    <BottomStack.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <BottomStack.Screen name="DashboardScreen" component={DashboardScreen} />
      <BottomStack.Screen name="SearchEventScreen" component={SearchEventScreen} />
      <BottomStack.Screen name="ImageListScreen" component={ImageListScreen} />
      <BottomStack.Screen name="MyDashboardScreen" component={MyDashboardScreen} />
      <BottomStack.Screen name="ProfileScreen" component={ProfileScreen} />
    </BottomStack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tabButton: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginHorizontal: 2,
    paddingHorizontal: 8,
  },
  iconImg: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 6,
  },
  labelText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight:"bold"
  },
});

export default DashboardNavigation;