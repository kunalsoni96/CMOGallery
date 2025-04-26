import React, { useEffect, useState } from 'react';
import { Image, Modal, StyleSheet, 
  Dimensions, Text, View, ImageBackground, 
  SafeAreaView, FlatList,
  TouchableOpacity, ScrollView } from 'react-native';
import { DownloadImg, LinkImg, ShareImg } from '../assets';
import MasonryList from '@react-native-seoul/masonry-list';
import Header from '../components/Header';
import BottomSlideScreen from '../components/BottomSlideScreen';
import commonStyle from '../components/Style';
import colors from '../../constants/color';
import Toaster from '../components/Toaster';
const { width, height } = Dimensions.get("window");

const images = [
  { id: '1', uri: 'https://bloggingbistro.com/wp-content/uploads/2018/05/unsplash-tips-for-using-stock-photos.jpg' },
  { id: '2', uri: 'https://bloggingbistro.com/wp-content/uploads/2018/05/unsplash-tips-for-using-stock-photos.jpg' },
  { id: '3', uri: 'https://bloggingbistro.com/wp-content/uploads/2018/05/unsplash-tips-for-using-stock-photos.jpg' },
  { id: '4', uri: 'https://bloggingbistro.com/wp-content/uploads/2018/05/unsplash-tips-for-using-stock-photos.jpg' },
];

const MyCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50, 
  };

  return (
    <View style={styles.sliderContainer}>
      {/* Image Slider */}
      <FlatList
        data={images}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.uri }} style={styles.image} />
          </View>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />

      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <TouchableOpacity key={index} style={[styles.dot, currentIndex === index && styles.activeDot]} />
        ))}
      </View>

      {/* Optional: Text for Current Page */}
      <Text style={styles.paginationText}>
        {currentIndex + 1} / {images.length}
      </Text>
    </View>
  );
};


// Reusable ImageCard Component
const ImageCard = ({ item, onPress }) => (
  <View style={{ marginHorizontal:5, marginVertical:10 }}>
    <TouchableOpacity
      style={{ borderRadius: 15, overflow: 'hidden' }}
      onPress={() => onPress(item.uri)}
    >
      <ImageBackground
        source={{ uri: item.uri }}
        style={{ width: '100%', height: item.height }}
        resizeMode="cover"
      >
        <View style={commonStyle.directoryContent}>
          <View>
            <Text style={commonStyle.imageCountText}>250</Text>
            <Text style={commonStyle.photosText}>photos</Text>
          </View>
          <View style={styles.eventDateSection}>
            <Text style={styles.eventDate}>02 Nov 2024</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.imgBottomSection}>
        <Text style={commonStyle.title}>CI Young Indians Conferences</Text>
        <View style={commonStyle.linksSection}>
          <TouchableOpacity>
            <Image source={DownloadImg} style={commonStyle.linkIMg} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={ShareImg} style={commonStyle.linkIMg} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={LinkImg} style={commonStyle.linkIMg} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>

    <BottomSlideScreen />
  </View>
);

const DashboardScreen = () => {
  const data = [
    { id: 1, uri: "https://indiacsr.in/wp-content/uploads/2024/01/Vishnu-Deo-Sai-Chief-Minister-of-Chhattisgarh-_IndiaCSR.jpg", height: 200 },
    { id: 2, uri: "https://i.pinimg.com/736x/7a/ad/c0/7aadc010cc350e426694132f5c4f5157.jpg", height: 250 },
    { id: 3, uri: "https://i.pinimg.com/736x/0a/cf/a0/0acfa0865c9b7315d4d2f2eb50615422.jpg", height: 266 },
    { id: 4, uri: "https://i.pinimg.com/736x/18/b7/e1/18b7e17b779525b3f0c629800f3f623d.jpg", height: 300 },
    { id: 5, uri: "https://i.pinimg.com/474x/6e/61/c6/6e61c6d50ef83f7be2150e2a7508d411.jpg", height: 200 },
    { id: 6, uri: "https://i.pinimg.com/474x/6e/61/c6/6e61c6d50ef83f7be2150e2a7508d411.jpg", height: 250 }
  ];

  const [image, setImage] = useState(null);

  return (
    <>
    <SafeAreaView style={styles.container}>
      <Header screen='DashboardScreen' />
      <ScrollView>
      <MyCarousel />
      <View style={styles.heading}>
            <Text style={{color:colors.primary, fontSize:16, fontWeight:"bold"}}>Recent View</Text>
        </View>
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
   <Toaster />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  
  imagesSection: {
    flexDirection: "row",
    paddingHorizontal: 10,
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
  imageContainer: {
    width: width,  // Full width of the device
    height: 200,   // Height for image
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Inactive dots color
  },
  activeDot: {
    backgroundColor: 'white', // Active dot color
  },
  paginationText: {
    position: 'absolute',
    bottom: 20,
    fontSize: 16,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading:{
    paddingHorizontal:25,
    paddingTop:20  
    },
});

export default DashboardScreen;
