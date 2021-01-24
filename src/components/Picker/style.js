import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
    },
    groupTitle: {
        fontSize: 16,
        color: '#9c9c9c',
        paddingHorizontal: 25,
    },
	picker: {
		flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
	},
	pickerOverlay: {
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	},
	pickerWrapper: {
		elevation: 5,
		width: width - 25 ,
		backgroundColor: '#f1f1f1',
		borderRadius: 20,
		overflow: 'hidden'
    },
    pickerHeader: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderBottomWidth: 2,
        borderColor: '#dadada',
    },
    pickerHeaderText: {
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        fontSize: 23,
        color: '#7b7b7b',
    },
    pickerContent: {
        height: (height/2) - 13,
    },
    pickerItemWrapper: {
        // flex: 1,
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    pickerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        paddingHorizontal: 25,
        paddingVertical: 10,
    },
    pickerItemSelectedContainer: {
        paddingTop: 10,
    },
    pickerItemSelected: {
        backgroundColor: '#fff',
        // elevation: 0,
    },
    pickerItemSelectedIcon: {
        flexDirection: 'row',
        width: '10%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    pickerItemImageWrapper: {
        width: '14%',
    },
    pickerItemImage: {
        width: 35,
        height: 25,
        marginRight: 5,
    },
    pickerItemTextWrapper: {
        width: '86%',
    },
    pickerItemText: {
        fontSize: 20,
        color: '#797979',
        flexShrink: 1,
    },
    pickerItemSeparatorWrapper: {
        paddingHorizontal: 25,
    },
    pickerItemSeparator: {
        width: '100%',
        backgroundColor: '#d8d8d8',
    },
    pickerFooter: {
    },
    cancelButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: 'red',
    },
    cancelButtonText: {
        color: '#fff',
        fontSize: 20,
    },
});