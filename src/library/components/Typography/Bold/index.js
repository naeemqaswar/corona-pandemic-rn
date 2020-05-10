import React from 'react';
import {StyleSheet, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function Bold(props) {
    const {font, color} = props;

    let textStyle = {};

    if (font) textStyle['fontSize'] = EStyleSheet.value(font);
    if (color) textStyle['color'] = color;

    return <Text style={{...styles.text, ...textStyle}}>
        {props.children}
    </Text>;
}

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
    }
});