import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	SafeAreaView,
	Dimensions,
	Button,
} from 'react-native';
// import Todo from './components/Todo';
import {
	BarChart,
	LineChart,
} from 'react-native-chart-kit';
import moment from 'moment';

const App = () => {
	const [description, setDescription] = useState('');
	const [amount, setAmount] = useState('');
	const [total, setTotal] = useState(0);
	const [data, setData] = useState([
		{
			date: moment().format('LL'),
			amount: 2000,
		},
		{
			date: moment().subtract(1, 'days').format('LL'),
			amount: 2500,
		},
		{
			date: moment().subtract(2, 'days').format('LL'),
			amount: 3500,
		},
		{
			date: moment().subtract(3, 'days').format('LL'),
			amount: 5500,
		},
		{
			date: moment().subtract(4, 'days').format('LL'),
			amount: 1500,
		},
	]);
	const [tranformedData, setTransformedData] = useState([]);
	const [gigs, setGigs] = useState([
		{
			description: 'Freelancing job',
			amount: 599.99,
			timestamp: new Date(),
		},
	]);

	const groupBy = (array, key) =>
		array.reduce((rv, x) => {
			(rv[x[key]] = rv[x[key]] || []).push(x);
			return rv;
		}, {});

	const getDates = () =>
		tranformedData.map((pair) => pair.date);
	const getAmounts = () =>
		tranformedData.map((pair) => pair.amount);

	const transformData = (groupedData) => {
		const transformedArray = [];
		Object.entries(groupedData).forEach((entry) => {
			// sums ups each day entries
			const total = entry[1].reduce(
				(total, pair) => total + pair.amount,
				0
			);
			transformedArray.push({
				date: entry[0],
				amount: total,
			});
		});
		return transformedArray;
		console.log(transformedArray, '<< transformedArray');
	};

	// console.log(data, '<< data');
	// console.log(getAmounts(), '<< getAmounts');
	// console.log(getDates(), '<< getDates');
	// console.log(groupBy(data, 'date'), '<< groupBy');
	// console.log(
	// 	Object.entries(data, 'date'),
	// 	'<< Object.entries(data)'
	// );
	console.log(
		transformData(groupBy(data, 'date')),
		'<<< transformData(groupBy(data, date)'
	);

	const addGig = () => {
		setGigs([
			...gigs,
			{
				description: description,
				amount: amount,
				timestamp: new Date(),
			},
		]);

		setDescription('');
		setAmount('');
	};

	useEffect(() => {
		setTransformedData(
			transformData(groupBy(data, 'date'))
		);
		return () => {
			console.log('<< Hitting use effect');
		};
	}, [data]);

	useEffect(() => {
		setTotal(
			gigs.reduce(
				(total, gig) => total + Number(gig.amount),
				0
			)
		);
		// return console.log('<<< hitting use effect');
	}, [gigs]);

	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text style={styles.titleText}>
					- Money Tracker -
				</Text>
			</View>
			<View>
				<Text style={styles.subTitleText}>
					Monthly Earnings Chart
				</Text>
				<LineChart
					data={{
						labels: getDates(),
						datasets: [
							{
								data: getAmounts(),
							},
						],
					}}
					width={Dimensions.get('window').width} // from react-native
					height={220}
					yAxisLabel='$'
					// yAxisSuffix='K'
					yAxisInterval={1} // optional, defaults to 1
					chartConfig={{
						backgroundColor: '#e26a00',
						backgroundGradientFrom: '#4CA1AF',
						backgroundGradientTo: '#C4E0E5',
						decimalPlaces: null, // optional, defaults to 2dp
						color: (opacity = 1) =>
							`rgba(50, 50, 50, ${opacity})`,
						labelColor: (opacity = 1) =>
							`rgba(50, 50, 50, ${opacity})`,
						style: {
							borderRadius: 16,
						},
						propsForDots: {
							r: '4',
							strokeWidth: '1.5',
							stroke: '#ffffff',
						},
					}}
					bezier
					style={{
						marginVertical: 8,
						borderRadius: 16,
					}}
				/>
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
	subTitleText: {
		fontSize: 12,
		fontWeight: 'bold',
		textAlign: 'left',
		marginHorizontal: 10,
		marginTop: 10,
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
