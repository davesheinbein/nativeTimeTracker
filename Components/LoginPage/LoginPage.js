import React, { useState } from 'react';
import {
	SafeAreaView,
	View,
	Text,
	TextInput,
	Button,
} from 'react-native';
import styles from './LoginPage.styles';

const LoginPage = ({ navigation }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const login = () => {
		if (username === 'Admin' && password === '1234') {
			navigation.navigate('Home');
		}
	};

	return (
		<SafeAreaView>
			<Text style={styles.header}>- Login -</Text>

			<TextInput
				style={styles.input}
				value={username}
				placeholder='Enter your Username'
				onChangeText={(text) => setUsername(text)}
			/>
			<TextInput
				style={styles.input}
				value={password}
				type='password'
				secureTextEntry={true}
				placeholder='Enter your Password'
				onChangeText={(text) => setPassword(text)}
			/>

			<Button title='Login' onPress={login} />

			{/* Navigate to the previous page */}
			{/* <Button
				title='Go Back'
				onPress={() => navigation.goBack()}
			/> */}
		</SafeAreaView>
	);
};

export default LoginPage;
