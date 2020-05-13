import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import AnimatedLoader from "react-native-animated-loader";

const Loader = (props) => {

    const {visible} = props;

    return <AnimatedLoader
        visible={visible}
        // overlayColor="rgba(255,255,255,0.75)"
        overlayColor="#fff"
        source={require("./loader.json")}
        animationStyle={styles.lottie}
        speed={1}
    />;
}

export default Loader;

const styles = StyleSheet.create({
    lottie: {
      width: 400,
      height: 400
    }
  });