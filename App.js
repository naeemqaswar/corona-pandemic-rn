import React from "react";

import ErrorBoundary from 'react-native-error-boundary'

import DataContextProvider from './src/context/DataContext';
import AppNavigator from "./src/navigation";

const App = () => {

	return <ErrorBoundary>
		<DataContextProvider>
			<AppNavigator/>
		</DataContextProvider>
	</ErrorBoundary>;
};

export default App;