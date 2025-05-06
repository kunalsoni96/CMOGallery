import {useEffect, useState} from 'react'
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
import { loggedInSuccess } from '../../redux/reducers/loginReducer';
const LoginScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [isInvalid, setIsInvalid] = useState({mobile:false, password:false});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true)
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
                password:password
              };
            
            await Keychain.setGenericPassword('user', JSON.stringify(dataToStore));
            dispatch(loggedInSuccess())
        }
        }

        catch(error){
            console.log('---', error)
        }
        
    }

    useEffect(()=>{
        if(loader){
            setLoading(true)
        }
        else{
            setTimeout(() => {
                setLoading(false)
            }, 1500);
        }
    },[loader])
    

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
                <View style={{width:'100%', alignItems:'center'}}>
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
                    </View>
                    <View  style={{width:'100%', alignItems:'center'}}>
                    <TextInput
                    onChangeText={(text)=>{
                        setPassword(text)
                        setError(false)
                        setIsInvalid({...isInvalid, password:false})
                    }}
                     value={password}
                     secureTextEntry={secureTextEntry}
                     placeholder='Password' 
                     placeholderTextColor="#888"
                     style={{...commonStyle.textInput, marginTop:10}} />
                     <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)} style={styles.passwordSeeBtn}>
                        <Text style={{color:colors.primary, fontWeight:'bold'}}>
                            {secureTextEntry ?
                            'Show'
                            :
                            'Hide'
                            }
                            </Text>
                     </TouchableOpacity>
                    {isInvalid.password &&
                        <Text style={commonStyle.errorMessage}>Please enter valid password</Text>
                    }
                    </View>
                    
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
            
        {loading && <LoaderScreen message2={"Authenticating"} message="Signing you in" />}
        {error && !loading && <Toaster type='error' message='Mobile or Password is Invalid' /> }
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
    passwordSeeBtn:{
        position:'absolute',
        right:25,
        top:25
    }
})

export default LoginScreen