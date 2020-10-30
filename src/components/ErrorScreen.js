import React from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity, ImageBackground, ScrollView, Dimensions, Image } from "react-native";

import { colors, images } from "../config";

const {height, width} = Dimensions.get('window');

export default function ErrorScreen(props) {

    const {message, defaultAction} = props;

    let _messageComponent = <View>
        <Text style={styles.msgText}>It seems something unexpected has happened. Brace yourself till we get it fixed.</Text>
        <Text style={[styles.msgText, {marginBottom:0}]}>You may also refresh the page or try again later!</Text>
    </View>;

    if(message) _messageComponent = <Text style={styles.msgText}>{message}</Text>;

    return <View style={styles.container}>
        <Image 
            style={styles.screenImage} 
            source={images.errorScreen}
            resizeMode="contain"
        />
        <View style={styles.textContainer}>
            <Text style={styles.msgTitle}>Ooops! Something went wrong</Text>
            {_messageComponent}
        </View>
        <TouchableOpacity onPress={defaultAction} style={styles.action}>
            <Text style={styles.actionText}>TRY AGAIN</Text>
        </TouchableOpacity>
    </View>;
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
		height: height - 100,
		justifyContent: 'center',
		alignItems:'center',
		backgroundColor: '#fff',
		paddingHorizontal: 40,
	},
	screenImage:{
		height: 220,
		marginBottom: 50,
	},
	textContainer:{
		marginBottom: 25,
	},
	msgTitle:{
		fontSize: 22,
		color: "#190933",
		marginBottom: 20,
		textAlign: "center",
		textAlignVertical: "center",
	},
	msgText:{
		fontSize: 14,
		color: "#190933",
		textAlign: "center",
		textAlignVertical: "center",
		// lineHeight: 25,
	},
	action:{
		padding: 10,
		backgroundColor: "#190933",
	},
	actionText:{
		color: '#fff',
		fontSize: 14,
	},
});