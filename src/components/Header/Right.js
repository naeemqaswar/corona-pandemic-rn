import React, {useContext} from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';

import {Ionicons, Octicons} from "@expo/vector-icons";

import {colors} from '../../config';
import {DataContext} from '../../context/DataContext';

const Right = (props) => {

    const {region, defaultRegion, toggleRegionSelector, refreshContent} = useContext(DataContext);

    const _renderButton = (content, click) => {
        return <TouchableWithoutFeedback onPress={click}>
            <View style={styles.buttonWrapper}>
                {content}
            </View>
        </TouchableWithoutFeedback>;
    }

    const regionBtnContent = () => {
        const {iso, countryInfo} = region;

        let _regionContent = <Ionicons name="md-globe" size={37} color={colors.secondary} />;
        
        if(countryInfo && iso != defaultRegion.iso){
            _regionContent = <Image style={styles.regionFlag} source={{uri: countryInfo.flag}} />;
        }

        return _regionContent;
    };

    return <View style={styles.container}>
            {_renderButton(<Octicons name="sync" size={37} color={colors.secondary} />, () => refreshContent())}
            {_renderButton(regionBtnContent(), () => toggleRegionSelector(true))}
        </View>;
}

export default Right;

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        paddingHorizontal: 5,
        flexDirection: 'row',
    },
    buttonWrapper: {
        // borderWidth: 1,
        // borderRadius: 8,

        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginTop:5,
        marginRight: 15,
    },
    buttonText: {
      fontSize: 20,
      color: 'black'
    },
    regionFlag: {
        width: 32,
        height: 32,
        borderRadius: 40,
        borderColor: '#bdbdbd',
        borderWidth: .5,
    }
});