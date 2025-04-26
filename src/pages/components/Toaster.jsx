import { useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import colors from "../../constants/color";

const Toaster = () => {

useEffect(()=>{
Toast.show({
    type: 'success',
    text1: 'Success!',
    text2: 'Your login successful 🎉',
    position: 'top', // or 'bottom'
    visibilityTime: 3000,
});
},[])

const toastConfig = {
success: ({ text1, text2 }) => (
    <View style={styles.toastContainer}>
    <View>
    <Text style={styles.toastText}>{text1}</Text>
    <Text style={styles.toastSubText}>{text2}</Text>
    </View>
    {/* <TouchableOpacity style={styles.close}>
        <Text style={{color:'white', fontSize:30}}>x</Text>
    </TouchableOpacity> */}
    </View>
),
error: ({ text1, text2 }) => (
    <View style={styles.errorToastContainer}>
    <Text style={styles.errorToastText}>{text1}</Text>
    <Text style={styles.errorToastSubText}>{text2}</Text>
    </View>
),
};

    return (
        <Toast config={toastConfig} />
    )
}

const styles = StyleSheet.create({
    toastContainer: {
        backgroundColor: '#34A853',
        borderRadius: 10,
        padding:10,
        width:"90%",
        marginTop:10,
        flexDirection:'row',
        },
        toastText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        paddingVertical:5
        },
        toastSubText: {
        color: 'white',
        fontSize: 14,
        paddingVertical:5
        },
        errorToastContainer: {
        backgroundColor: 'red',
        borderRadius: 15,
        padding: 10,
        marginHorizontal: 20,
        },
        errorToastText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        },

        close:{
        position:'absolute',
        right:10,
        alignSelf:'center'
        }
    })

export default Toaster;