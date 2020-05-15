import React from 'react';
import { View, Text, StyleSheet, Image, Modal } from 'react-native';

const Loader = (props) => {

    const {visible} = props;

    return <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}
    >
      <View style={styles.container}>
        <View style={styles.overlay}></View>
        <View style={styles.loaderWrapper}>
          <Image
            style={styles.loader}
            resizeMode="cover"
            source={require('../../../assets/loader.gif')}
          />
        </View>
      </View>
    </Modal>;
}

export default Loader;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      justifyContent: 'center', 
      alignContent: 'center',
    },
    overlay: {
      backgroundColor: 'rgba(255,255,255,0.75)',
      // backgroundColor: '#fff',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    loaderWrapper: {
      justifyContent: 'center', 
      alignContent: 'center',
    },
    loader: {
      alignSelf: 'center',
      width: 150,
      height: 150
    }
  });