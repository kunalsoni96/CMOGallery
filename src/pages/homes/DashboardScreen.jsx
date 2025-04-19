import React, { useState } from 'react';
import { Image, Modal, StyleSheet, 
  Dimensions, Text, View, ImageBackground, 
  SafeAreaView, FlatList,
  TouchableOpacity, ScrollView } from 'react-native';
import { CGMapImg, LogoImg, FilterImg, EditImg, DownloadDarkImg, uploadImg, LinkImg, NotImg } from '../assets';
import MasonryList from '@react-native-seoul/masonry-list';
import colors from '../../constants/color';
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

const Header = ({ onBackPress, onEditPress }) => (
  <View style={styles.header}>
    <View style={{...styles.headerColumn, flexDirection:"row", width:"100%"}}>
      <TouchableOpacity  style={{flexDirection:"row",  width:"50%"}} onPress={onBackPress}>
        <Image source={LogoImg} style={styles.logo} />
        <Text style={styles.dashboardText}> Dashboard</Text>
      </TouchableOpacity>
      <View style={{width:"50%", alignItems:"flex-end", justifyContent:"center"}}>
        <View style={{flexDirection:"row"}}>
        <Image source={FilterImg} style={styles.notificationImg} />
        <Image source={NotImg} style={styles.notificationImg} />
        </View>
      </View>
    </View>
    <View style={[styles.headerColumn, { alignItems: "flex-end" }]}>
      <TouchableOpacity onPress={onEditPress}>
        <Image style={styles.headerIcon} source={EditImg} />
      </TouchableOpacity>
    </View>
  </View>
);

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

  const handleBackPress = () => {
    // Handle back button press
  };

  const handleEditPress = () => {
    // Handle edit button press
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={handleBackPress} onEditPress={handleEditPress} />
      <ScrollView>
      <MyCarousel />
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
  dashboardText:{
    fontWeight:"bold",
    fontSize:20,
    marginTop:4
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
  header: {
    top: 0,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
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
});

export default DashboardScreen;
