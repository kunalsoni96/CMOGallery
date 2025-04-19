import {Text, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
const LoginScreen = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        flex:1,
        paddingHorizontal:10
    },
})

export default LoginScreen