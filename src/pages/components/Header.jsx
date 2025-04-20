import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native'
import { LogoImg, NotImg, FilterImg, BackArrowImg  } from '../assets';
import { useNavigation } from '@react-navigation/native';
const Header = (props) => {
    const navigation = useNavigation();
    return (
    <View style={styles.header}>
      <View style={{...styles.headerColumn, flexDirection:"row", width:"100%"}}>
      {props.screen=='DashboardScreen' ?
        <TouchableOpacity  style={{flexDirection:"row",  width:"50%"}}>
          <Image source={LogoImg} style={styles.logo} />
          <Text style={styles.dashboardText}> Dashboard</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={()=>navigation.goBack()}  style={{flexDirection:"row",  width:"100%"}}>
          <Image source={BackArrowImg} style={styles.back} />
          <Text  style={styles.searchText}>{props.screen}</Text>
        </TouchableOpacity>
      }
        {props.screen=='DashboardScreen' &&
        <View style={{width:"50%", alignItems:"flex-end", justifyContent:"center"}}>
          <View style={{flexDirection:"row"}}>
          <Image source={FilterImg} style={styles.notificationImg} />
          <Image source={NotImg} style={styles.notificationImg} />
          </View>
        </View>
        }
      </View>
    </View>
  );
    }

  const styles = StyleSheet.create({
    header: {
    top: 0,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    },
    dashboardText:{
    fontWeight:"bold",
    fontSize:20,
    marginTop:4
    },
    searchText:{
    fontWeight:"bold",
    fontSize:20,
    marginLeft:10
    },
    headerColumn: {
    width: "33%",
    },
    logo:{
    width:35,
    height:35
    },
    notificationImg:{
    width:20,
    height:20,
    marginLeft:10
    },

    headerIcon: {
    width: 25,
    height: 25,
    },
    headerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    },

    })
  export default Header;