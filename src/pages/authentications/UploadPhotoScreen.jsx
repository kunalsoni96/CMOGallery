import {Text, View, StyleSheet, TouchableOpacity, Image, TextInput} from 'react-native'
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../constants/color'; 
import {useEffect} from 'react';
import commonStyle from '../components/Style';
import { uploadImg } from '../assets';
const UploadPhotoScreen = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View style={commonStyle.contentBox}>
                <View style={commonStyle.section}>
                <Text style={styles.title}>Upload Photo</Text>
                <Text style={styles.subTitle}>& Event Details</Text>
                </View>

                <View style={commonStyle.section}>
                    <TextInput placeholder='Full Name' style={commonStyle.textInput} />
                </View>

                <View style={commonStyle.section}>
                    <TextInput placeholder='Email Id' style={commonStyle.textInput} />
                </View>

                <View style={commonStyle.section}>
                    <TouchableOpacity style={{...commonStyle.textInput, flexDirection:'row'}} >
                        <Image source={uploadImg} style={{width:15, height:15}} />
                        <Text>Upload A Photo</Text>
                    </TouchableOpacity>
                </View>

                <View style={commonStyle.section}>
                <TouchableOpacity  style={commonStyle.submitBtn}>
                            <Text style={styles.btnText}>Proceed</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        flex:1,
        paddingHorizontal:10,
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
})

export default UploadPhotoScreen