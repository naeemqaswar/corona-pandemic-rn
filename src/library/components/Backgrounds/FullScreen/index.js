import React from 'react';
import {Dimensions, ImageBackground, StyleSheet, View} from 'react-native';

const {height} = Dimensions.get('window');

export default function FullScreenBackground(props) {
    const {image, backgroundStyle, center = false} = props;

    const _backgroundStyle = [styles.background];
    if (backgroundStyle) {
        _backgroundStyle.push(backgroundStyle);
    }
    if (center) {
        _backgroundStyle.push(styles.allCenter);
    }

    return <View style={styles.container}>
        <ImageBackground
            source={image}
            resizeMode='cover'
            style={_backgroundStyle}
        >
            {props.children}
        </ImageBackground>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        height,
    },
    allCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});