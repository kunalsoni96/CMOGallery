import {useState} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../constants/color'; 
import commonStyle from '../components/Style';
import Footer from '../components/Footer';
import GoogleSignIn from '../components/GoogleSignIn';
import { useDispatch, useSelector } from 'react-redux';
import { isValidMobile, isStrongPassword } from '../../utils/Validation';
import { loginUser } from '../../redux/actions/loginAction';
import * as Keychain from 'react-native-keychain';
import LoaderScreen from '../components/LoaderScreen';
import Toaster from '../components/Toaster';
const LoginScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [isInvalid, setIsInvalid] = useState({mobile:false, password:false});
    const [error, setError] = useState(false);
    const loader = useSelector(state=>state.login.loading)
    const submitHandle = async() => {
        try{
        if(!isValidMobile(mobile)){
            setIsInvalid({...isInvalid, mobile:true})
            return;
        }
        else if(!isStrongPassword(password)){
            setIsInvalid({...isInvalid, password:true})
            return;
        }
        let result =  await dispatch(loginUser({mobile, password}))
        console.log(result,'f')
        if(result.error)
        {   
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 3000);
        }
        else
        {
            const dataToStore = {
                user: result.payload,
                auth_token: result.payload.userId,
                signInWith: 'mobile',
              };
            await Keychain.setGenericPassword('user', JSON.stringify(dataToStore));
        }
        }

        catch(error){
            console.log('---', error)
        }
        
    }

    

    return (
        <SafeAreaView style={styles.container}>
            <View style={commonStyle.contentBox}>
                <View style={commonStyle.section}>
                <Text style={styles.title}>AI Based CMO Gallery</Text>
                <Text style={styles.subTitle}>On Click Download</Text>
                </View>

                <GoogleSignIn callback={() => setLoader(true)} />

                <View style={commonStyle.dividerContainer}>
                    <View style={{...commonStyle.hr, width:"20%"}}></View>
                    <View style={commonStyle.centerText}><Text>Or Sign In With Mobile</Text></View>
                    <View style={{...commonStyle.hr, width:"20%"}}></View>
                </View>

                <View style={commonStyle.section}>
                    <TextInput 
                    value={mobile} 
                    keyboardType="numeric"
                    contextMenuHidden={true} maxLength={10} 
                    placeholder='Mobile No.' 
                    placeholderTextColor="#888"
                    onChangeText={(text)=>{
                        setMobile(text)
                        setError(false)
                        setIsInvalid({...isInvalid, mobile:false})
                    }}
                    style={[commonStyle.textInput, isInvalid && styles.inputError]} />
                    {isInvalid.mobile &&
                    <Text style={commonStyle.errorMessage}>Please enter 10 digit valid mobile</Text>
                    }
                    <TextInput
                    onChangeText={(text)=>{
                        setPassword(text)
                        setError(false)
                        setIsInvalid({...isInvalid, password:false})
                    }}
                    value={password}
                     placeholder='Password' 
                     placeholderTextColor="#888"
                     style={{...commonStyle.textInput, marginTop:10}} />
                    {isInvalid.password &&
                        <Text style={commonStyle.errorMessage}>Please enter valid password</Text>
                    }
                    
                    <TouchableOpacity onPress={submitHandle} style={commonStyle.submitBtn}>
                            <Text style={styles.btnText}>Sign In</Text>
                    </TouchableOpacity>
                </View>

                <View style={commonStyle.section}>
                        <TouchableOpacity style={{marginBottom:10}} onPress={() => navigation.navigate("ForgotPasswordScreen")}>
                            <Text style={commonStyle.linkText}>Forgot Password</Text>
                        </TouchableOpacity>
                <View style={styles.registerPrompt}>
                        <Text style={commonStyle.questionText}>Not Register Yet? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("MobileRegisterScreen")}>
                            <Text style={commonStyle.linkText}>Register Now</Text>
                        </TouchableOpacity>
                </View>
                </View>

         <Footer/>
            </View>
            
        {loader && <LoaderScreen show="nope" />}
        {error && <Toaster /> }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        flex:1,
        paddingHorizontal:10
    },
    
    title:{
        color:colors.primary,
        fontWeight:700,
        fontSize:24,
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

export default LoginScreen