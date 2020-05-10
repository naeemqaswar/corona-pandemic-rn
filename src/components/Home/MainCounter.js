import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

import { colors, images } from "../../config";

const MainCounter = (props) => {

	const {value} = props;

    return <ImageBackground style={styles.mainCounterContainer}
                source={images.coronaMap}
                resizeMode="cover"
                imageStyle={{opacity:0.5}}
		    >
			<ImageBackground style={styles.mainCounterBackground}
				source={images.mainCounter}
				resizeMode="contain"
			>
				<View style={styles.mainCounterWrapper}>
					<Text style={styles.mainCounterText}>{value}</Text>
					<Text style={styles.mainCounterSubText}>Total Cases</Text>
				</View>
			</ImageBackground>
		</ImageBackground>;
}

export default MainCounter;

const styles = StyleSheet.create({
	mainCounterContainer: {
		// borderWidth: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: 'white',
		height: 260,
		width: '100%',
	},
	mainCounterBackground: {

	},
	mainCounterBackground: {
		height: 200,
		width: 200,

		justifyContent: 'center',
		alignItems: 'center',
	},
	mainCounterWrapper:{
		justifyContent: 'center',
		alignItems: 'center',
	},
	mainCounterText: {
		fontSize: 30,
		color: '#1b1b1b',
		fontWeight: "bold",
		marginBottom: 3,
	},
	mainCounterSubText: {
		fontSize: 15,
		color: '#aaaeb4',
		// fontWeight: "bold",
	},
});
