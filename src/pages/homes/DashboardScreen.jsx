import React, { useEffect, useState } from 'react';
import { Image, Modal, StyleSheet, 
  Dimensions, Text, View, 
  SafeAreaView, FlatList,
  TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import BottomSlideScreen from '../components/BottomSlideScreen';
import colors from '../../constants/color';
import Toaster from '../components/Toaster';
import commonStyle from '../components/Style';
import ImageCard from '../components/ImageCard';
import { useDispatch, useSelector } from 'react-redux';
import { getDistricts, getEvents } from '../../redux/actions/EventAction';
import { Banner1Img, Banner2Img, Banner3Img, FilterImg } from '../assets';
import LoaderScreen from '../components/LoaderScreen';
import { openFilter } from '../../redux/reducers/filterReducer';

const { width, height } = Dimensions.get("window");

const images = [
  Banner1Img,
  Banner2Img,
  Banner3Img
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
            <Image source={item} style={styles.image} />
          </View>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        
      />

      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <TouchableOpacity key={index} style={[styles.dot, currentIndex === index && styles.activeDot]} />
        ))}
      </View>

  
      {/* <Text style={styles.paginationText}>
        {currentIndex + 1} / {images.length}
      </Text> */}
    </View>
  );
};


const DashboardScreen = () => {
  const [image, setImage] = useState(null);
  // const [copy, setCopy] = useState(false)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getEvents({}))
    dispatch(getDistricts({}))
  },[])

  const event = useSelector(state=>state.event)
  const loginSuccess = useSelector(state=>state.login.loginSuccess)
  const loader = useSelector(state=>state.event.loading)
  // const copyHandle = () => {
  //   setCopy(true)
  //   setTimeout(() => {
  //     setCopy(false)
  //   }, 3000);
  // }
  const renderItem = ({item, index}) => {
  const customHeight = index % 2 === 0 ? 200 : 250;
  return (
  <ImageCard item={item} customHeight={customHeight} />
  );
};

const filterHandle = () => {
  dispatch(openFilter())
}


  return (
    <>
   <SafeAreaView style={styles.container}>
  <Header screen='DashboardScreen' />
  <View style={{flex:1, justifyContent:'space-between'}}>
  <FlatList
    data={event?.eventsList}
    renderItem={renderItem}
    keyExtractor={item => item?._id}
    contentContainerStyle={styles.imagesSection}
    ListHeaderComponent={
      <>
        <View style={{ height: height / 4 }}>
          <MyCarousel />
        </View>
        <View style={styles.heading}>
          <Text style={{ color: colors.primary, fontSize: 16, fontWeight: 'bold', width:'50%' }}>
            Recent Events
          </Text>
          <View style={{width:"50%", alignItems:"flex-end", justifyContent:"center"}}>
          <View style={{flexDirection:"row"}}>
          <TouchableOpacity onPress={filterHandle}>
            <Image source={FilterImg} style={styles.notificationImg} />
          </TouchableOpacity>
          </View>
        </View>
        </View>
      </>
    }
  />
  </View>

    {
        event?.eventsList?.length == 0 &&
        <View style={commonStyle.notAvailableText}>
          <Text>Event not available</Text>
        </View>
      }

  <Modal visible={image !== null} onRequestClose={() => setImage(null)}>
    <TouchableOpacity style={styles.modalContainer} onPress={() => setImage(null)}>
      <Image source={{ uri: image }} style={styles.fullImage} resizeMode="contain" />
    </TouchableOpacity>
  </Modal>
</SafeAreaView>
   {/* {copy && <Toaster type={'success'} message={'Copied'} />} */}
   {loginSuccess && <Toaster type={'success'} message={'LoggedIn Successfully'} />}
   <BottomSlideScreen />
   {loader && <LoaderScreen />}
   
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
    // paddingHorizontal: '2%',
    flexWrap:'wrap',
    justifyContent:'space-between',
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
    justifyContent: 'space-around',
    alignItems: 'center',

  },
  heading:{
    paddingHorizontal:25,
    paddingTop:20,
    flexDirection:'row'
    },
  notificationImg:{
    width:25,
    height:25,
    marginLeft:10,
    position:'absolute',
    right:0,
    top:-8
    },

});

export default DashboardScreen;
