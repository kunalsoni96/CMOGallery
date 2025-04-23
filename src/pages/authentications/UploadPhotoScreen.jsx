import {use, useState} from 'react';
import {Text, View, FlatList, StyleSheet, Modal, TouchableOpacity, Image, TextInput, Platform} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../constants/color'; 
import commonStyle from '../components/Style';
import { uploadImg } from '../assets';
import Header from '../components/Header';
import DateTimePicker from '@react-native-community/datetimepicker';
import {launchImageLibrary} from 'react-native-image-picker';
const UploadPhotoScreen = () => {
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState('Select An Event');
  const [showModal, setShowModal] = useState(false);
  const [dateShow, setDateShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [visibleDate, setVisibleDate] = useState('DD/MM/YYYY');
  const [userImage, setUserImage] = useState('')
  const [errorMessage, setErrorMessage] = useState(false);
  const options = ['Java', 'JavaScript'];

  const handleSelect = (value) => {
    setSelectedValue(value);
    setShowModal(false);
  };
   
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
    const year = currentDate.getFullYear();
    const updatedDate = `${day}/${month}/${year}`;
    if (event.type === "set") { // user selected something
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setVisibleDate(updatedDate)
      }
     setDateShow(false); 
  };

  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Error:', response.errorMessage);
      }
       else {
        const asset = response.assets?.[0];
        const maxFileSize = 5 * 1024 * 1024;
        if(asset.fileSize > maxFileSize){
            setErrorMessage(true)
        }
        else{
            setErrorMessage(false)
            setUserImage(response.assets[0].uri)
        }

        console.log('Selected Image URI:', asset.fileSize);
      }
    });
  };
    return (
        <SafeAreaView style={styles.container}>
            <Header screen='Upload Photo' />
            <View style={{...commonStyle.contentBox, justifyContent:'center', flex:1, borderRadius:0}}>
                <View style={commonStyle.section}>
                <Text style={styles.title}>Upload Photo</Text>
                <Text style={styles.subTitle}>& Event Details</Text>
                </View>

                <View style={commonStyle.section}>
                    {Platform.OS == 'android' ?
                    <TouchableOpacity 
                    onPress={()=>setDateShow(true)}
                    style={{...commonStyle.textInput, ...styles.dateInput}} >

                        <Text>{visibleDate}</Text>
                    </TouchableOpacity>
                    :
                    <DateTimePicker
                    value={date}
                    mode="date" // or "time"
                    display="spinner"
                    onChange={onChange}
                    />
                    }
                    {/* <Image source={} /> */}
                </View>

                <View  style={commonStyle.section}>
                <TouchableOpacity
                style={{...commonStyle.textInput, alignItems:'flex-start'}}
                onPress={() => setShowModal(true)}
                >
                <Text>{selectedValue}</Text>
                <View style={{position:'absolute', right:20}}>
                        <Image source={{uri:userImage}} style={styles.userImg} />
                </View> 
                </TouchableOpacity>

            <Modal visible={showModal} transparent animationType="slide">
                <TouchableOpacity
                style={{...styles.modalOverlay}}
                activeOpacity={1}
                onPressOut={() => setShowModal(false)}
                >
                <View style={styles.modalContent}>
                    <FlatList
                    data={options}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                        style={{...styles.option}}
                        onPress={() => handleSelect(item)}
                        >
                        <Text>{item}</Text>
                        </TouchableOpacity>
                    )}
                    />
                </View>
                </TouchableOpacity>
            </Modal>
                </View>

               

                <View style={{...commonStyle.section}}>
                    <TouchableOpacity 
                    onPress={pickImage}
                    style={{...commonStyle.textInput, flexDirection:'row', justifyContent:'flex-start'}} >
                        <Image source={uploadImg} style={{width:15, height:15}} />
                        <Text> Upload A Photo</Text>

                        <View style={{position:'absolute', right:20}}>
                        {userImage !="" &&
                        <Image source={{uri:userImage}} style={styles.userImg} />
                        }
                        </View> 
                    </TouchableOpacity>
                   <Text style={{alignSelf:'flex-start', marginLeft:25, marginTop:10}}>Upload an Image (Jpg, Jpeg, Png)</Text>
                   {errorMessage &&
                   <Text style={{alignSelf:'flex-start', marginLeft:25, marginTop:10, color:'red'}}>File size is too large! (Max - 5 MB)</Text>
                   }
                   </View>

                <View style={commonStyle.section}>
                <TouchableOpacity
                  disabled={userImage==""}
                  style={[commonStyle.submitBtn, {backgroundColor: userImage=="" ? colors.border : colors.primary}]}>
                <Text style={[styles.btnText, {color: userImage=="" ? 'gray' : colors.secondary}]}>Proceed</Text>
                </TouchableOpacity>
                </View>

            </View>

                {dateShow && Platform.OS == 'android' && (
                    <DateTimePicker
                    value={date}
                    mode="date" // or "time"
                    display="compact"
                    onChange={onChange}
                    />
                )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'white',
    },
    title:{
        color:colors.primary,
        fontWeight:"bold",
        fontSize:20,
    },
    subTitle:{
        color:colors.primary,
        fontSize:11
    },
   
    btnText:{
        color:colors.secondary,
        fontWeight:"bold"
    },
   
    googleBtnText:{

    },
    registerPrompt:{
        flexDirection:"row",
    },
    dateInput:{
        flexDirection:"row",
        justifyContent:'space-between'
    },

      modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
      },
      modalContent: {
        marginHorizontal:30,
        borderRadius: 5,
        padding: 10,
        backgroundColor:'white'
      },
      option: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      },
      userImg:{
        width:30,
        height:30, 
        borderRadius:5
    }
})

export default UploadPhotoScreen