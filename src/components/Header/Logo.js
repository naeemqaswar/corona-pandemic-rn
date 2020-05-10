import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native';

import {images} from '../../config';

const Logo = () => {
    return <Image
        style={styles.logo}
        source={images.logo}
        resizeMode="contain"
    />
}

export default Logo;

const styles = StyleSheet.create({
    logo: { 
        width: 120, 
        // borderWidth: 1, 
        borderColor: 'black' 
    },
});