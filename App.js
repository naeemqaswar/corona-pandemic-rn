import React from "react";

import DataContextProvider from './src/context/DataContext';
import AppNavigator from "./src/navigation";

const App = () => {

	return <DataContextProvider>
		<AppNavigator/>
	</DataContextProvider>;
};

export default App;