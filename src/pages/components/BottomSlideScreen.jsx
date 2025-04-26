import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput,
  Dimensions, ScrollView, 
  TouchableOpacity } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import {closeFilter} from '../../redux/reducers/filterReducer';
import colors from '../../constants/color';
import commonStyle from './Style';

const { height, width } = Dimensions.get('window')
export default function BottomSlideScreen(props) {
  const refRBSheet = useRef();
  const [isChecked, setChecked] = useState(false);
  const isOpen = useSelector((state) => state.filter.isOpen);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isOpen) {
      refRBSheet.current?.open();
    } else {
      refRBSheet.current?.close(); 
    }
  }, [isOpen]);

  const handleClose = () => {
    dispatch(closeFilter())
  }

  return (
    <View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
          draggableIcon: {
            backgroundColor: "#000"
          },
          container:{
            height:height/1.2,
            borderTopEndRadius:30,
            borderTopLeftRadius:30
          }
        }}

        onClose={() => {
          handleClose();
        }}
      >
        <View style={styles.sheetContent}>
          <View style={styles.topHR}></View>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.eventText}>Districts</Text>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.clearAll}>
                <Text>Clear All</Text>
              </TouchableOpacity>
            </View>
          </View>


          <View style={{width:'100%', alignItems:'flex-start'}}>
          <ScrollView>
          <View style={styles.list}>
          <TouchableOpacity onPress={() => setChecked(!isChecked)} style={styles.checkboxContainer}>
          <View style={[styles.checkbox, isChecked && styles.checkedBox]}>
            {isChecked && <Text style={styles.checkmark}>✓</Text>}
          </View>
            <Text style={styles.label}>Azadi ka  Mahatsav</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setChecked(!isChecked)} style={styles.checkboxContainer}>
          <View style={[styles.checkbox, isChecked && styles.checkedBox]}>
            {isChecked && <Text style={styles.checkmark}>✓</Text>}
          </View>
            <Text style={styles.label}>Azadi </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setChecked(!isChecked)} style={styles.checkboxContainer}>
          <View style={[styles.checkbox, isChecked && styles.checkedBox]}>
            {isChecked && <Text style={styles.checkmark}>✓</Text>}
          </View>
            <Text style={styles.label}>Azadi </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setChecked(!isChecked)} style={styles.checkboxContainer}>
          <View style={[styles.checkbox, isChecked && styles.checkedBox]}>
            {isChecked && <Text style={styles.checkmark}>✓</Text>}
          </View>
            <Text style={styles.label}>Azadi </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setChecked(!isChecked)} style={styles.checkboxContainer}>
          <View style={[styles.checkbox, isChecked && styles.checkedBox]}>
            {isChecked && <Text style={styles.checkmark}>✓</Text>}
          </View>
            <Text style={styles.label}>Azadi </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setChecked(!isChecked)} style={styles.checkboxContainer}>
          <View style={[styles.checkbox, isChecked && styles.checkedBox]}>
            {isChecked && <Text style={styles.checkmark}>✓</Text>}
          </View>
            <Text style={styles.label}>Azadi </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setChecked(!isChecked)} style={styles.checkboxContainer}>
          <View style={[styles.checkbox, isChecked && styles.checkedBox]}>
            {isChecked && <Text style={styles.checkmark}>✓</Text>}
          </View>
            <Text style={styles.label}>Azadi </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setChecked(!isChecked)} style={styles.checkboxContainer}>
          <View style={[styles.checkbox, isChecked && styles.checkedBox]}>
            {isChecked && <Text style={styles.checkmark}>✓</Text>}
          </View>
            <Text style={styles.label}>Azadi </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setChecked(!isChecked)} style={styles.checkboxContainer}>
          <View style={[styles.checkbox, isChecked && styles.checkedBox]}>
            {isChecked && <Text style={styles.checkmark}>✓</Text>}
          </View>
            <Text style={styles.label}>Azadi </Text>
          </TouchableOpacity>
          </View>
          </ScrollView>

          <View style={{...styles.header, ...styles.date}}>
            <View style={styles.headerLeft}>
              <Text style={styles.eventText}>Date</Text>
            </View>
          </View>

            <View style={styles.dateSection}>
              <TouchableOpacity style={{...commonStyle.textInput, alignItems:'flex-start'}}>
                <Text>DD / MM / YYYY</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{...commonStyle.textInput, alignItems:'flex-start', marginTop:10}}>
                <Text>DD / MM / YYYY</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  sheetContent: {
    paddingVertical: 40,
    alignItems: 'center',
    paddingHorizontal:20
  },
  topHR:{
    width:width/3,
    height:2,
    backgroundColor:colors.secondary,
    position:'absolute',
    top:10
  },
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:10
  },
  headerLeft:{
    width:'50%',

  },
  headerRight:{
    width:'50%',
    alignItems:'flex-end'
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:colors.border,
    paddingHorizontal:25,
    paddingVertical:5,
    borderRadius:20,
    marginTop:10,
    marginHorizontal:5
  },
  checkbox: {
    width: 17,
    height: 17,
    borderWidth: 1,
    borderColor: '#00000',
    marginRight: 10,
    borderRadius:5
  },
  checkedBox: {
   
  },
  checkmark: {
    color: '#00000',
    fontSize: 18,
    fontWeight: 'bold',
    position:'absolute',
    marginTop:-3,
    marginLeft:-1
  },
  label:{
    fontSize:14
  },
  eventText:{
    fontSize:16, 
    color:'#00000',
    fontWeight:'bold'
  },
  clearAll:{
    backgroundColor:colors.border,
    borderRadius:20,
    paddingHorizontal:20,
    paddingVertical:5
  },
  list:{
    flexDirection:'row',
    flexWrap:'wrap'
  },

  date:{
    marginTop:20, 
    borderTopWidth:1, 
    width:'100%', 
    borderColor:colors.border, 
    paddingTop:20
  },
  dateSection:{
    width:'100%'
  }
});
