import React, { useState } from 'react';
import { Image, Modal, StyleSheet, Dimensions, Text, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CGMapImg, BackWImg, EditImg, DownloadDarkImg, uploadImg, LinkImg } from '../assets';
import MasonryList from '@react-native-seoul/masonry-list';
import colors from '../../constants/color';
import Header from '../components/Header';

const { width, height } = Dimensions.get("window");


// Reusable ImageCard Component
const ImageCard = ({ item, onPress }) => (
  <View style={{ margin: 5 }}>
    <TouchableOpacity
      style={{ borderRadius: 15, overflow: 'hidden' }}
      onPress={() => onPress(item.uri)}
    >
      <ImageBackground
        source={{ uri: item.uri }}
        style={{ width: '100%', height: item.height }}
        resizeMode="cover"
      >
        <View style={styles.directionContent}>
          <View>
            <Text style={styles.imageCountText}>250</Text>
            <Text style={styles.photosText}>photos</Text>
          </View>
          <View style={styles.eventDateSection}>
            <Text style={styles.eventDate}>02 Nov 2024</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.imgBottomSection}>
        <Text>CI Young Indians Conferences</Text>
        <View style={styles.linksSection}>
        <TouchableOpacity>
            <Image source={LinkImg} />
        </TouchableOpacity>
        <TouchableOpacity>
            <Image source={LinkImg} />
        </TouchableOpacity>
        <TouchableOpacity>
            <Image source={LinkImg} />
        </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  </View>
);

const MyDashboardScreen = () => {
  const data = [
    { id: 1, uri: "https://indiacsr.in/wp-content/uploads/2024/01/Vishnu-Deo-Sai-Chief-Minister-of-Chhattisgarh-_IndiaCSR.jpg", height: 200 },
    { id: 2, uri: "https://i.pinimg.com/736x/7a/ad/c0/7aadc010cc350e426694132f5c4f5157.jpg", height: 250 },
    { id: 3, uri: "https://i.pinimg.com/736x/0a/cf/a0/0acfa0865c9b7315d4d2f2eb50615422.jpg", height: 266 },
    { id: 4, uri: "https://i.pinimg.com/736x/18/b7/e1/18b7e17b779525b3f0c629800f3f623d.jpg", height: 300 },
    { id: 5, uri: "https://i.pinimg.com/474x/6e/61/c6/6e61c6d50ef83f7be2150e2a7508d411.jpg", height: 200 },
    { id: 6, uri: "https://i.pinimg.com/474x/6e/61/c6/6e61c6d50ef83f7be2150e2a7508d411.jpg", height: 250 }
  ];

  const [image, setImage] = useState(null);

  const handleBackPress = () => {
    // Handle back button press
  };

  const handleEditPress = () => {
    // Handle edit button press
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header screen="My Download" />
      <ScrollView>
        <View style={styles.imagesSection}>
          <MasonryList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            renderItem={({ item }) => (
              <ImageCard item={item} onPress={setImage} />
            )}
          />
        </View>
      </ScrollView>

      <Modal visible={image !== null} onRequestClose={() => setImage(null)}>
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
    top: 0,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.primary,
  },
  headerColumn: {
    width: "33%",
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
  imagesSection: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  directionContent: {
    flexDirection: "row",
    position: "absolute",
    paddingBottom: 10,
    bottom: -1,
    width: "100%",
    paddingHorizontal: 5,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  imageCountText: {
    color: "white",
    fontSize: 18,
  },
  photosText: {
    color: "white",
  },
  eventDateSection:{
     width: width / 4, 
     justifyContent: "center", 
     alignItems: "flex-end" 
  },
  eventDate: {
    fontSize: 11,
    color: "white",
    position: "absolute",
    bottom: 2,
    right: 0, 
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: width,
    height: height,
  },
  imgBottomSection:{
     marginTop:10
  },
  linksSection:{
    flexDirection:"row",
    justifyContent:"space-between",
    width:width/3,
    marginTop:10
  }
});

export default MyDashboardScreen;