import {Text, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../constants/color'; 
import {useEffect} from 'react';
const RegisterScreen = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentBox}>
                <View style={styles.section}>
                <Text style={styles.title}>AI Based CMO Gallery</Text>
                <Text style={styles.subTitle}>On Click Download</Text>
                </View>

                <View style={styles.section}>
                    <TouchableOpacity onPress={() => {}} style={styles.googleBtn}>
                            <Text style={styles.googleBtnText}>Sign In With Google</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.dividerContainer}>
                    <View style={{...styles.hr, width:"20%"}}></View>
                    <View style={styles.centerText}><Text>Or Sign Up With Your Email</Text></View>
                    <View style={{...styles.hr, width:"20%"}}></View>
                </View>

                <View style={styles.section}>
                    <TextInput placeholder='Full Name' style={styles.textInput} />
          
                </View>

                <View style={styles.section}>
                    <TextInput placeholder='Mobile No.' style={styles.textInput} />
                </View>

                <View style={styles.section}>
                    <TextInput placeholder='Email Id' style={styles.textInput} />
                </View>

                <View style={styles.section}>
                    <TextInput placeholder='Create Your Password' style={styles.textInput} />
                </View>

                <View style={styles.section}>
                <TouchableOpacity  style={styles.submitBtn}>
                            <Text style={styles.btnText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                <View style={styles.registerPrompt}>
                        <Text style={styles.questionText}>Already Registered? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
                            <Text style={styles.linkText}>Sign In</Text>
                        </TouchableOpacity>
                </View>
                </View>

                <View style={styles.policySection}>
                    <TouchableOpacity style={styles.extraBtn}>
                        <Text style={styles.questionText}>Privacy Policy </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.extraBtn}>
                        <Text style={styles.questionText}>Terms Of Services </Text>
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
        paddingHorizontal:10
    },
    contentBox:{
        backgroundColor:"white",
        paddingHorizontal:10,
        paddingVertical:50,
        width:"100%",
        borderRadius:20,
        alignItems:"center"
    },
    section:{
        width:"100%",
        alignItems:"center",
        paddingVertical:10
    },
    dividerContainer:{
        width:"90%",
        alignItems:"center",
        flexDirection:"row",
        paddingVertical:20
    },
    hr:{
        borderBottomColor: '#e6e6e6',
        borderBottomWidth: 1,
        marginHorizontal:5
    },
    centerText:{
        paddingHorizontal:10
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
    submitBtn:{
        backgroundColor:colors.primary,
        width:"90%",
        height:50,
        borderRadius:40,
        justifyContent:"center",
        alignItems:"center",
        marginTop:10
    },
    btnText:{
        color:colors.secondary,
        fontWeight:"bold"
    },
    googleBtn:{
        backgroundColor:"white",
        width:"90%",
        height:50,
        borderRadius:40,
        justifyContent:"center",
        alignItems:"center",
        borderWidth:1,
        borderColor:"#e6e6e6",
    },
    googleBtnText:{

    },
    textInput:{
        backgroundColor:"white",
        width:"90%",
        height:50,
        borderRadius:40,
        justifyContent:"center",
        alignItems:"center",
        borderWidth:1,
        borderColor:"#e6e6e6",
        paddingLeft:20
    },
    registerPrompt:{
        flexDirection:"row",
    },
    questionText:{
        color:"gray",
        fontSize:12
    },
    linkText:{
        fontSize:12
    },
    policySection:{
        position:"absolute",
        bottom:20,
        flexDirection:"row"
    },
    extraBtn:{
        marginHorizontal:5
    }
})

export default RegisterScreen