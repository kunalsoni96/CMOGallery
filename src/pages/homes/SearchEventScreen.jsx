import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, 
  Dimensions, Text, View, 
  SafeAreaView, TextInput, FlatList,
  TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import colors from '../../constants/color';
import Header from '../components/Header';
import commonStyle from '../components/Style';
import { ViewMoreImg } from '../assets';
const { width, height } = Dimensions.get("window");
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getEvents, searchEvent } from '../../redux/actions/EventAction';


const ListCard = ({item}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.card}>
              <View style={styles.left}>
                  <ImageBackground 
                  imageStyle={{ borderRadius: 15 }} 
                  style={styles.eventImg}
                  source={{uri:item?.cover}} >
                    <View style={{...commonStyle.directoryContent}}>
                      <View>
                      <Text style={{...commonStyle.imageCountText, fontSize:14}}>200</Text>
                      <Text style={{...commonStyle.photosText, fontSize:12}}>photos</Text>
                      </View>
                    </View>
                    </ImageBackground>
              </View>
              <View style={styles.right}>
                <Text style={commonStyle.title}>
                {item?.name?.length > 15 ? item?.name?.substring(0, 15) + '...' : item?.name}
                </Text>

                <View style={{paddingVertical:15}}>
                  <Text style={styles.date}>02 Nov 2024</Text>
                </View>

                <TouchableOpacity onPress={()=>navigation.navigate('ImageListScreen', { id: item?._id, title:item?.name })} style={{flexDirection:'row'}}>
                  <Text style={styles.viewMore}>View More </Text>
                  <Image source={ViewMoreImg} style={{width:25, height:15, marginTop:2}} />
                </TouchableOpacity>
              </View>
      </View>
  )
}



const SearchEventScreen = () => {
  const navigation = useNavigation();
  const [text, setText] = useState('')
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getEvents({}))
  },[])

  const event = useSelector(state=>state.event)

  const renderItem = ({item, index}) => {
    return (
    <ListCard item={item} />
    );
  };

  const searchEventHandle = () => {
    dispatch(searchEvent(text))
  }

  const handleSearch = (text) => {
    setText(text)

    const filtered = event.eventsList?.filter(item =>
      item?.name.toLowerCase()?.includes(text.toLowerCase())
    );
    setSuggestions(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header screen='Search' />
        <View style={commonStyle.section}>
        <View style={{width:'100%', alignItems:'center', paddingBottom:10}}>
          <TextInput 
          value={text}
          onChangeText={(text)=>handleSearch(text)}
          placeholder='Search' 
          placeholderTextColor="black" style={commonStyle.textInput} />
          {/* <TouchableOpacity onPress={() => searchEventHandle()} style={{position:'absolute', right:'5%', top:-5, padding:20}}>
            <Text style={{fontWeight:'bold'}}>Go</Text>
          </TouchableOpacity> */}

          {text.length > 0 && (
          <View style={styles.suggestionBox}>
            <FlatList
              data={suggestions}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity 
                onPress={()=>navigation.navigate('ImageListScreen', { id: item?._id, title:item?.name })}>
                  <Text style={styles.suggestion}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
        </View>
        <FlatList
        data={event?.eventsList}
        renderItem={renderItem}
        keyExtractor={item => item?._id}
          />
        </View>
        
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white",
  },
  card:{
    flexDirection:"row",
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginHorizontal:15,
    
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width:'91%',
    marginVertical:5
  },
  eventImg:{
    width:width/3.4,
    height:width/3.4,
  },
  left:{
    width:'35%',
  },
  right:{
    width:'65%',
    padding:10,
    justifyContent:'center'
  },
  date:{
    fontSize:12
  },
  viewMore:{
    color:'gray',
    fontSize:12
  },
  suggestionBox: {
    width:width/1.2,
    position: 'absolute',
    top: 45,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    maxHeight: 200,
    zIndex: 10,
    elevation: 5, 
    shadowColor: '#000', 
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  suggestion: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});

export default SearchEventScreen;
