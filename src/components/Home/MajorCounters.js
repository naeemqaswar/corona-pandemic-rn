import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ElevatedView from 'react-native-elevated-view';

import {colors} from '../../config';

const MajorCounters = (props) => {

    const {counters: {recovered, deaths, critical}} = props;

    const itemDivider = () => <View style={styles.counterItemDivider}></View>;

    const counterItem = (title, value, color = '#000') => (
        <View style={styles.counterItem}>
            <Text style={[styles.counterValue, {color}]}>{value}</Text>
            <Text style={[styles.counterTitle]}>{title}</Text>
        </View>
    );

    return <View style={styles.container}>
        <ElevatedView
            elevation={10}
            style={styles.wrapper}
        >
            {counterItem('Recovered', recovered, colors.success)}
            {itemDivider()}
            {counterItem('Critical', critical, colors.warning)}
            {itemDivider()}
            {counterItem('Deaths', deaths, colors.error)}
        </ElevatedView>
    </View>
}

export default MajorCounters;

const styles = StyleSheet.create({
	container:{
		// backgroundColor: '#e2e1e0',
		alignItems: 'center',
		marginTop: -36,
		// borderWidth: 1,
	},
	wrapper: {
        // borderWidth: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
		width: '90%',
        height: 70,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 50,
    },
    counterItemDivider:{
        width: 1,
        backgroundColor: '#efefef',
    },
    counterItem:{
        // borderWidth: 1,
        width: '33.33%',
        justifyContent:'center',
        alignItems: 'center',
    },
    counterValue:{
		fontSize: 21,
		color: '#1b1b1b',
		fontWeight: "bold",
		marginBottom: 2,
    },
    counterTitle:{
		fontSize: 13,
        // fontWeight: 'bold',
		color: '#9c9c9c',
    },
});