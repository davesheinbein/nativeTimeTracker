import React from 'react';
// import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Homepage from './Components/Homepage/Homepage';
import LoginPage from './Components/LoginPage/LoginPage';

const Stack = createStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Login'>
				{/* navigation prop is passed down to all children make sure to pass it in children who you want to be able to use navigation for */}
				{/* see homepage for example */}
				<Stack.Screen name='Home' component={Homepage} />
				<Stack.Screen
					name='Login'
					component={LoginPage}
					options={{ title: 'Sign-in or Sign-up' }} // can change the displayed name of the router
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
