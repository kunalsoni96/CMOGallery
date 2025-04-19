import {Text, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {useEffect} from 'react';
const ProfileScreen = () => {

    return (
        <View style={styles.container}>
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
                    <View style={styles.centerText}><Text>Or Sign In With Mobile</Text></View>
                    <View style={{...styles.hr, width:"20%"}}></View>
                </View>

                <View style={styles.section}>
                    <TextInput placeholder='Mobile No.' style={styles.textInput} />
                    <TouchableOpacity onPress={() => {}} style={styles.submitBtn}>
                            <Text style={styles.btnText}>Sign In</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.section}>
                <View style={styles.registerPrompt}>
                        <Text>Not Register Yet? </Text>
                        <TouchableOpacity>
                            <Text>Register Now</Text>
                        </TouchableOpacity>
                </View>
                </View>
            </View>
        </View>
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
        color:"#170645",
        fontWeight:"bold",
        fontSize:20,
    },
    subTitle:{
        color:"#170645",
        fontSize:11
    },
    submitBtn:{
        backgroundColor:"#170645",
        width:"90%",
        height:50,
        borderRadius:40,
        justifyContent:"center",
        alignItems:"center",
        marginTop:10
    },
    btnText:{
        color:"#FFE100",
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
    }
})

export default ProfileScreen