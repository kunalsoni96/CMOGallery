// App.js

import React, { useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

export default function BottomSlideScreen(props) {
  const refRBSheet = useRef();

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
          }
        }}
      >
        <View style={styles.sheetContent}>
          <Text style={{ fontSize: 18 }}>Yeh ek simple bottom sheet hai 😎</Text>
        </View>
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  sheetContent: {
    padding: 20,
    alignItems: 'center',
  },
});
