import React, { useEffect, useState } from 'react';
import {
	Text,
	TextInput,
	SafeAreaView,
	View,
	Dimensions,
	Button,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';
import styles from './Homepage.styles';
import { ScrollView } from 'react-native-gesture-handler';

const Homepage = ({ navigation }) => {
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
			date: moment().subtract(5, 'days').format('LL'),
			amount: 3500,
		},
		{
			date: moment().subtract(4, 'days').format('LL'),
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
		// {
		// 	description: 'Freelancing job',
		// 	amount: 599.99,
		// 	timestamp: new Date(),
		// },
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
			const total = entry[1].reduce(
				(total, pair) => total + pair.amount,
				0
			); // sums ups each day entries
			transformedArray.push({
				date: moment(entry[0]).format('MMM DD'),
				amount: total,
			});
		});
		const sortedArray = transformedArray.sort((a, b) =>
			moment(a['date']).diff(moment(b['date']))
		);
		console.log(transformedArray, '<< transformedArray');
		console.log(sortedArray, '<< sortedArray');

		return sortedArray;
	};

	// console.log(data, '<< data');
	// console.log(getAmounts(), '<< getAmounts');
	// console.log(getDates(), '<< getDates');
	// console.log(groupBy(data, 'date'), '<< groupBy');
	// console.log(
	// 	Object.entries(data, 'date'),
	// 	'<< Object.entries(data)'
	// );
	// console.log(
	// 	transformData(groupBy(data, 'date')),
	// 	'<<< transformData(groupBy(data, date)'
	// );

	const addGig = () => {
		setGigs([
			{
				description: description,
				amount: amount,
				timestamp: new Date(),
			},
			...gigs,
		]);

		setData([
			...data,
			{
				date: moment().format('LL'),
				amount: Number(amount),
			},
		]);

		setDescription('');
		setAmount('');
	};

	useEffect(() => {
		setTransformedData(
			transformData(groupBy(data, 'date'))
		);
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
		<SafeAreaView>
			<View>
				<Text style={styles.titleText}>
					- Money Tracker -
				</Text>
				<Button
					title='Login'
					onPress={() => navigation.navigate('Login')}
				/>
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
			<Text style={styles.incomeText}>
				Total Income: ${total}
			</Text>
			<TextInput
				style={styles.textInput}
				value={description}
				maxLength={50}
				placeholder='Enter a job description'
				onChangeText={(text) => setDescription(text)}
			/>
			<TextInput
				style={styles.textInput}
				value={amount}
				maxLength={42}
				keyboardType='numeric'
				placeholder='Enter the amount of money made in USD ($)'
				onChangeText={(text) => setAmount(text)}
			/>
			<Button
				title='Add Gig'
				onPress={addGig}
				disabled={!amount && !description}
			/>
			<ScrollView>
				{gigs.map((gig, idx) => (
					// console.log(
					// 	idx,
					// 	'<< idx',
					// 	gig.description,
					// 	'<< gig.description',
					// 	idx + ' ' + gig.description,
					// 	'<<< idx + gig.description'
					// ),
					<View
						key={idx + gig.description}
						style={styles.incomeInfoContainer}>
						<Text style={styles.incomeInfoDescription}>
							{gig.description}
						</Text>
						<Text style={styles.incomeInfoAmount}>
							${gig.amount}
						</Text>
					</View>
				))}
			</ScrollView>
		</SafeAreaView>
	);
};

export default Homepage;
