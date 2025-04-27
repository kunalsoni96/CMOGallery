import React, { useState } from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Dimensions,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MasonryList from '@react-native-seoul/masonry-list';
import colors from '../../constants/color';
import {
  CGMapImg,
  BackWImg,
  EditImg,
  uploadImg,
  NotWhiteImg,
  DownNavImg,
  NotImg,
  DownloadDarkImg
} from '../assets';
import Header from '../components/Header';

const { width, height } = Dimensions.get("window");

const imageData = [
  { id: 1, uri: "https://indiacsr.in/wp-content/uploads/2024/01/Vishnu-Deo-Sai-Chief-Minister-of-Chhattisgarh-_IndiaCSR.jpg", height: 200 },
  { id: 2, uri: "https://i.pinimg.com/736x/7a/ad/c0/7aadc010cc350e426694132f5c4f5157.jpg", height: 250 },
  { id: 3, uri: "https://i.pinimg.com/736x/0a/cf/a0/0acfa0865c9b7315d4d2f2eb50615422.jpg", height: 266 },
  { id: 4, uri: "https://i.pinimg.com/736x/18/b7/e1/18b7e17b779525b3f0c629800f3f623d.jpg", height: 300 },
  { id: 5, uri: "https://i.pinimg.com/474x/6e/61/c6/6e61c6d50ef83f7be2150e2a7508d411.jpg", height: 200 },
  { id: 6, uri: "https://i.pinimg.com/474x/6e/61/c6/6e61c6d50ef83f7be2150e2a7508d411.jpg", height: 250 }
];

const ProfileScreen = () => {
  const [image, setImage] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <Header screen="Profile" />

      <ScrollView>
        <View style={styles.profileSection}>
          <ImageBackground source={CGMapImg} style={styles.map}>
            <View style={styles.profile}>
              <Image
                style={styles.profileImg}
                source={{ uri: "https://grandnews.in/wp-content/uploads/2024/02/WhatsApp-Image-2024-02-29-at-6.48.35-PM-e1709213548759.jpeg" }}
              />
              <Text style={styles.profileName}>विष्णुदेव साय</Text>
            </View>

            <View style={styles.porfileBottomSection}>
                <TouchableOpacity style={styles.profileColumn}>
                    <Image source={DownNavImg} style={styles.iconImg} />
                    <Text style={styles.iconText}>My Download</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileColumn}>
                    <Image source={EditImg} style={styles.iconImg} />
                    <Text style={styles.iconText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.boxContainer}>
          <View style={[styles.box, { backgroundColor: colors.primaryBox }]}>
            <View style={styles.boxContent}>
              <Image source={uploadImg} style={styles.boxIcon} />
              <Text style={styles.boxValue}>872</Text>
              <Text style={styles.boxLabel}>Total Download</Text>
            </View>
          </View>
          <View style={[styles.box, { backgroundColor: colors.secondaryBox }]}>
            <TouchableOpacity style={styles.boxContent}>
              <Image source={DownloadDarkImg} style={styles.boxIcon} />
              <Text style={styles.boxValue}>872</Text>
              <Text style={styles.boxLabel}>Total Image</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.heading}>
            <Text style={{color:colors.primary, fontSize:16, fontWeight:"bold"}}>Recent View</Text>
        </View>
        <View style={styles.imagesSection}>
          <MasonryList
            data={imageData}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={styles.imageWrapper}>
                <TouchableOpacity onPress={() => setImage(item.uri)}>
                  <Image
                    source={{ uri: item.uri }}
                    style={[styles.galleryImage, { height: item.height }]}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </ScrollView>

      <Modal visible={!!image} transparent onRequestClose={() => setImage(null)}>
        <TouchableOpacity style={styles.modalContainer} onPress={() => setImage(null)}>
          <Image source={{ uri: image }} style={styles.fullImage} resizeMode="contain" />
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.primary,
  },
  headerColumn: {
    width: "33%",
  },
  centerAlign: {
    alignItems: "center",
  },
  endAlign: {
    alignItems: "flex-end",
  },
  headerIcon: {
    width: 25,
    height: 25,
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginTop:-1
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
    paddingHorizontal: 20,
  },
  imageWrapper: {
    margin: 5,
    flex: 1,
  },
  galleryImage: {
    width: '100%',
    borderRadius: 10,
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
    }
});

export default ProfileScreen;
