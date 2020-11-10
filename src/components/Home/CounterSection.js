import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import ElevatedView from 'react-native-elevated-view';

import {colors} from '../../config';

const SymbolIconConfig = {
    // color: "#dcdcdc",
    // color: "#42A5F5",
    color: "#E91E63",
    // color: colors.main,
    size: 22,
};

const CounterSection = props => {

    const {head, subHead = '', icon = '', list=[]} = props;

    const _renderHeader = () => <View style={styles.headerContainer}>
        <View style={styles.headerTextWrapper}>
            {_renderIcon()}
            <Text style={styles.headerTitle}>{head}</Text>
        </View>
        <View style={[styles.headerTextWrapper, {justifyContent: 'flex-end'}]}>
            <Text style={styles.headerTitleInfo}>{subHead}</Text>
        </View>
    </View>;

    const _renderCounterItem = ({title, value}, index) => {

        return <View style={[styles.counterItem, (index & 1 ? {...styles.counterItemRight}:{}) ]} key={index}>
        {/* return <View style={[styles.counterItem]} key={index}> */}
            <Text style={styles.counterItemTitle}>{title}</Text>
            <Text style={styles.counterItemValue}>{value}</Text>
        </View>;
    };

    const _renderCounterItems = () => {

        if(!list || list.length === 0) return null;

        let _renderItems = list.map((item, index) => _renderCounterItem(item, index));

        return <View style={styles.counterItemsContainer}>
            {_renderItemDivider()}
            {_renderItems}
        </View>;
    }

    const _renderItemDivider = () => {
        return <View style={styles.counterItemDividerContainer}>
            <View style={styles.counterItemDivider}></View>
        </View>;
    };

    const _renderIcon = () => {

        if(!icon) return null;

        let _symbolIcon;

        if(icon.type === 'material'){
            _symbolIcon = <MaterialCommunityIcons name={icon.name} size={SymbolIconConfig.size} color={SymbolIconConfig.color} style={styles.symbolIcon}/>;
        } else {
            _symbolIcon = <Ionicons name={icon} size={SymbolIconConfig.size} color={SymbolIconConfig.color} style={styles.symbolIcon}/>;
        }

        // return <View style={styles.symbolIconWrapper}>{_symbolIcon}</View>
        return _symbolIcon
    };

    const _renderSectionDivider = () => <View style={styles.sectionDividerWrapper}><View style={styles.sectionDivider}></View></View>

    return <View style={styles.container}>
        <ElevatedView elevation={1} style={styles.wrapper}>
            {_renderHeader()}
            {_renderSectionDivider()}
            {_renderCounterItems()}
        </ElevatedView>
    </View>
};

export default CounterSection

let standardPadding = 20;
const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        backgroundColor: 'transparent',
        paddingHorizontal: 20,
    },
    wrapper: {
        backgroundColor: 'white',
        borderRadius: 5,
    },
    sectionDividerWrapper: {
        marginHorizontal: standardPadding,
    },
    sectionDivider: {
        width: '100%',
        height: 1,
        backgroundColor: '#efefef',
    },
    headerContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: standardPadding,
        // borderBottomWidth: 1,
        // borderBottomColor: '#efefef'
    },
    headerTextWrapper: {
        // borderWidth: 1,

        flexDirection: 'row',
        width: '50%',
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#717171',
        fontFamily: 'Roboto',
        // color: '#1565C0',
        // color: colors.main,
    },
    headerTitleInfo: {
        // borderWidth: 1,

        fontSize: 15,
        color: '#949494',
        lineHeight: 22,
    },
    symbolIconWrapper: {
        // borderWidth: 1,

        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    symbolIcon: {
        // backgroundColor: 'white',
        // marginTop: 1,
        lineHeight: 24,
        marginRight: 10,
    },
    counterItemsContainer: {
        flexDirection: 'row',
        // borderWidth:1,
        // paddingVertical: 15,
    },
    counterItem: {
        // borderWidth:1,

        width: '50%',
        paddingVertical: standardPadding - 5,
        paddingHorizontal: standardPadding,
    },
    counterItemRight: {
        paddingLeft: 30,
    },
    counterItemDividerContainer: {
        // borderWidth:1,

        // width: '10%',
        // borderRightWidth: 1,
        // borderColor: '#efefef',
        // marginRight: 10,

        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    counterItemDivider: {
        // borderWidth:1,

        width: 1,
        height: 65,
        // borderRightWidth: 1,
        backgroundColor: '#efefef',
        // marginRight: 10,
    },
    counterItemTitle: {
        color: '#949494',
        // color: '#E91E63',
        // color: '#1565C0',
        // color: colors.secondary,
        fontSize: 15,
        // fontWeight: 'bold',
        // lineHeight: 20,
    },
    counterItemValue: {
        color: '#616161',
        fontSize: 22,
        fontWeight: 'bold',
        // textAlign: 'center',
    },
});