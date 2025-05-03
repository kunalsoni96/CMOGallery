import React, { useState, useEffect } from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Dimensions,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../constants/color';
import {
  CGMapImg,
  EditImg,
  uploadImg,
  DownNavImg,
  DownloadDarkImg,
  LogoImg
} from '../assets';
import Header from '../components/Header';
import ImageCard from '../components/ImageCard';
import { useNavigation } from '@react-navigation/native';
import commonStyle from '../components/Style';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDownload } from '../../redux/actions/EventAction';
import LoaderScreen from '../components/LoaderScreen';

const { width, height } = Dimensions.get("window");

const data = [
  // { id: 1, uri: "https://indiacsr.in/wp-content/uploads/2024/01/Vishnu-Deo-Sai-Chief-Minister-of-Chhattisgarh-_IndiaCSR.jpg", height: 200 },
  // { id: 2, uri: "https://i.pinimg.com/736x/7a/ad/c0/7aadc010cc350e426694132f5c4f5157.jpg", height: 250 },
  // { id: 3, uri: "https://i.pinimg.com/736x/0a/cf/a0/0acfa0865c9b7315d4d2f2eb50615422.jpg", height: 266 },
  // { id: 4, uri: "https://i.pinimg.com/736x/18/b7/e1/18b7e17b779525b3f0c629800f3f623d.jpg", height: 300 },
  // { id: 5, uri: "https://i.pinimg.com/474x/6e/61/c6/6e61c6d50ef83f7be2150e2a7508d411.jpg", height: 200 },
  // { id: 6, uri: "https://i.pinimg.com/474x/6e/61/c6/6e61c6d50ef83f7be2150e2a7508d411.jpg", height: 250 }

];


const ProfileScreen = () => {
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const user = useSelector(state=>state.login.user)
  const loader = useSelector(state=>state.login.loading)
  const userEventData = useSelector(state=>state.event.userDownloads)

  useEffect(()=>{
    if(user.userId){
    dispatch(getUserDownload(user.userId))
    }
  },[])
  const renderItem = ({ item }) => {
    return (
      <View>
        <ImageCard item={item} />
      </View>
    )
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header screen="Profile" />

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.imagesSection}
        ListHeaderComponent={
          <>
            {/* 👤 Profile Section */}
            <View style={styles.profileSection}>
              <ImageBackground source={CGMapImg} style={styles.map}>
                <View style={styles.profile}>
                  {user?.signInWith == 'google' ?
                  <Image
                    style={styles.profileImg}
                    source={{
                      uri: user?.user.photo,
                    }}
                  />
                    :
                  <Image
                    style={styles.profileImg}
                    source={LogoImg}
                  />

                }
                  <Text style={styles.profileName}>{user?.user?.name}</Text>
                </View>

                <View style={styles.porfileBottomSection}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("MyDashboardScreen")}
                    style={styles.profileColumn}
                  >
                    <Image source={DownNavImg} style={styles.iconImg} />
                    <Text style={styles.iconText}>My Download</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>navigation.navigate('UpdateProfile')} style={styles.profileColumn}>
                    <Image source={EditImg} style={styles.iconImg} />
                    <Text style={styles.iconText}>Edit Profile</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>

            {/* 📦 Box Stats Section */}
            <View style={styles.boxContainer}>
              <View style={[styles.box, { backgroundColor: colors.primaryBox }]}>
                <View style={styles.boxContent}>
                  <Image source={uploadImg} style={styles.boxIcon} />
                  <Text style={styles.boxValue}>{userEventData?.downloads}</Text>
                  <Text style={styles.boxLabel}>Total Download</Text>
                </View>
              </View>
              <View style={[styles.box, { backgroundColor: colors.secondaryBox }]}>
                <View style={styles.boxContent}>
                  <Image source={DownloadDarkImg} style={styles.boxIcon} />
                  <Text style={styles.boxValue}>{userEventData?.photos}</Text>
                  <Text style={styles.boxLabel}>Total Image</Text>
                </View>
              </View>
            </View>

            {/* 🕵️ Recent View Heading */}
            <View style={styles.heading}>
              <Text style={{ color: colors.primary, fontSize: 16, fontWeight: "bold" }}>
                Recent View
              </Text>
            </View>
          </>
        }
      />

      {
        data.length == 0 &&
        <View style={{...commonStyle.notAvailableText, position:'absolute',
         bottom:10}}>
          <Text>Recent view not available</Text>
        </View>
      }

      {/* 🔍 Full Image Modal */}
      <Modal visible={!!image} transparent onRequestClose={() => setImage(null)}>
        <TouchableOpacity style={styles.modalContainer} onPress={() => setImage(null)}>
          <Image source={{ uri: image }} style={styles.fullImage} resizeMode="contain" />
        </TouchableOpacity>
      </Modal>

      {loader && <LoaderScreen /> }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  profileSection: {
    backgroundColor: colors.primary,
    width: width,
    height: width / 1.1,
    justifyContent: "center",
  },
  map: {
    height: width / 1.3,
    width: width / 2,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  profile: {
    width: width,
    alignItems: "center",
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: -width / 6,
    marginBottom: 10,
  },
  profileName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  boxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: "center",
  },
  box: {
    width: width / 2.34,
    height: width / 2.35,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  boxContent: {
    width: '100%',
    alignItems: 'center',
  },
  boxIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    marginBottom: 8,
  },
  boxValue: {
    fontWeight: 'bold',
    fontSize: 24,
    marginVertical:10
  },
  boxLabel: {
    fontSize: 15,
    color:colors.primary
  },
  imagesSection: {
    flexDirection: "row",
    // paddingHorizontal: '2%',
    flexWrap:'wrap',
    justifyContent:'space-around',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width,
    height,
  },
  porfileBottomSection:{
    position:'absolute',
    bottom:'8%',
    justifyContent:'space-between',
    width:width,
    flexDirection:'row',
  },
  iconImg: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginRight: 6,
  },
  iconText:{
    fontSize:14,
    color:'white',
    marginTop:10
  },
  profileColumn:{
    width:'50%',
    alignItems:'center'
  },
  heading:{
    paddingHorizontal:25,
    paddingVertical:10  
  },
});

export default ProfileScreen;
