import React, {useEffect} from "react";
import {YellowBox} from 'react-native';

import ErrorBoundary from 'react-native-error-boundary'

import DataContextProvider from './src/context/DataContext';
import AppNavigator from "./src/navigation";

const App = () => {

	useEffect(()=>{

		YellowBox.ignoreWarnings([
			'Remote debugger is in a background',
			'Debugger and device times have drifted by more than 60s',
		]);

	}, []);

	return <ErrorBoundary>
		<DataContextProvider>
			<AppNavigator/>
		</DataContextProvider>
	</ErrorBoundary>;
};

export default App;