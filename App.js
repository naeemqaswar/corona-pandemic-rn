import React from "react";

import DataContextProvider from './src/context/DataContext';
import AppNavigator from "./src/navigation";

// import Loader from './src/screens/Loader';

const App = () => {

	// return <Loader/>;

	return <DataContextProvider>
		<AppNavigator/>
	</DataContextProvider>;
};

export default App;