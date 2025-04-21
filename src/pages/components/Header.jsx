import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native'
import { LogoImg, NotImg, FilterImg, BackArrowImg, EditImg  } from '../assets';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import colors from '../../constants/color';
const Header = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const filterHandle = () => {

    }
    return (
    <View style={[styles.header, { backgroundColor: props.screen === 'Profile' ? colors.primary : 'white' }]}>
      <View style={{...styles.headerColumn, flexDirection:"row", width:"100%"}}>
      {props.screen=='DashboardScreen' ?
        <TouchableOpacity  style={{flexDirection:"row",  width:"50%"}}>
          <Image source={LogoImg} style={styles.logo} />
          <Text style={styles.dashboardText}> Dashboard</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={()=>navigation.goBack()}  style={{flexDirection:"row",  width:"100%"}}>
          <Image source={BackArrowImg} style={styles.back} />
          <Text  style={[styles.searchText, { color: props.screen === 'Profile' ? 'white' : colors.primary }]}>{props.screen}</Text>
        </TouchableOpacity>
      }
        {props.screen=='DashboardScreen' &&
        <View style={{width:"50%", alignItems:"flex-end", justifyContent:"center"}}>
          <View style={{flexDirection:"row"}}>
          <TouchableOpacity onPress={filterHandle}>
            <Image source={FilterImg} style={styles.notificationImg} />
          </TouchableOpacity>
          <Image source={NotImg} style={styles.notificationImg} />
          </View>
        </View>
        }

      {props.screen=='Profile' &&
        <View style={{width:"50%", alignItems:"flex-end", justifyContent:"center"}}>
          <View style={{flexDirection:"row"}}>
          <TouchableOpacity onPress={filterHandle}>
            <Image source={EditImg} style={styles.EditImg} />
          </TouchableOpacity>
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
    marginLeft:10,
    marginTop:-1
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