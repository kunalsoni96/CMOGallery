import {use, useState} from 'react';
import {Text, View, StyleSheet, 
    TouchableOpacity, TextInput} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../constants/color'; 
import commonStyle from '../components/Style';
import Header from '../components/Header';
const UpdateProfile = () => {
  const navigation = useNavigation();
  const [isInvalid, setIsInvalid] = useState({mobile:false, password:false})
  const submitHandle = () => {
    if(!isValidMobile(mobile)){
        setIsInvalid({...isInvalid, mobile:true})
        return;
    }
}
    return (
        <SafeAreaView style={styles.container}>
            <Header screen='Update Profile' />
            <View style={{...commonStyle.contentBox, justifyContent:'center', flex:1, borderRadius:0}}>
                <View style={commonStyle.section}>
                <Text style={styles.title}>Update</Text>
                </View>
                <View style={commonStyle.section}>
                    <View style={styles.inputSection}>
                    <TextInput placeholder='Full Name'
                     placeholderTextColor="#888"
                     style={commonStyle.textInput} />
                     {isInvalid.name &&
                        <Text style={commonStyle.errorMessage}>Please enter your name</Text>
                    }
                    </View>

                    <View style={styles.inputSection}>
                    <TextInput placeholder='Enter Mobile No.'
                     placeholderTextColor="#888"
                     keyboardType="numeric"
                     contextMenuHidden={true} maxLength={10} 
                     style={commonStyle.textInput} />
                     {isInvalid.mobile &&
                        <Text style={commonStyle.errorMessage}>Please enter 10 digit valid mobile</Text>
                    }
                    </View>

                    <View style={styles.inputSection}>
                    <TextInput placeholder='Enter Email'
                     placeholderTextColor="#888"
                     style={commonStyle.textInput} />
                     {isInvalid.email &&
                        <Text style={commonStyle.errorMessage}>Please enter valid email</Text>
                    }
                    </View>


                    <View style={styles.inputSection}>
                    <TextInput placeholder='Enter your new password'
                     placeholderTextColor="#888"
                     style={commonStyle.textInput} />

                    </View>
                    <TouchableOpacity onPress={submitHandle} style={commonStyle.submitBtn}>
                            <Text style={styles.btnText}>Proceed</Text>
                    </TouchableOpacity>
                </View>

            </View>
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

    btnText:{
    color:colors.secondary,
    fontWeight:"bold"
    },

    inputSection:{
    paddingVertical:10, 
    width:'100%',
    alignItems:'center'
    }
})

export default UpdateProfile