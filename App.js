import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	SafeAreaView,
	Button,
} from 'react-native';
// import Todo from './components/Todo';

const App = () => {
	const [description, setDescription] = useState('');
	const [amount, setAmount] = useState('');
	const [total, setTotal] = useState(0);
	const [gigs, setGigs] = useState([
		{ description: 'Freelancing job', amount: 599.99 },
	]);

	const addGig = () => {
		setGigs([
			...gigs,
			{
				description: description,
				amount: amount,
			},
		]);

		setDescription('');
		setAmount('');
	};

	useEffect(() => {
		setTotal(
			gigs.reduce(
				(total, gig) => total + Number(gig.amount),
				0
			)
		);
		return console.log('hitting use effect');
	}, [gigs]);

	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text style={styles.titleText}>Time Tracker</Text>
			</View>
			<Text>Total Income: ${total}</Text>
			<TextInput
				style={styles.textInput}
				value={description}
				placeholder='Enter a job description'
				onChangeText={(text) => setDescription(text)}
			/>
			<TextInput
				style={styles.textInput}
				value={amount}
				keyboardType='numeric'
				placeholder='Enter the amount of money made in USD ($)'
				onChangeText={(text) => setAmount(text)}
			/>
			<Button
				title='Add Gig'
				onPress={addGig}
				disabled={!amount && !description}
			/>
			{gigs.map((gig) => (
				<View key={gig.description}>
					<Text>{gig.description}</Text>
					<Text>${gig.amount}</Text>
				</View>
			))}
		</SafeAreaView>
	);
};

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	titleText: {
		fontSize: 30,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	textInput: {
		height: 40,
		borderColor: 'red',
		borderWidth: 0.5,
		marginVertical: 10,
		marginHorizontal: 20,
		paddingHorizontal: 10,
	},
});
