import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
	incomeText: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'left',
		marginHorizontal: 10,
		marginBottom: 0,
	},
	textInput: {
		height: 40,
		borderColor: 'red',
		borderWidth: 0.5,
		marginVertical: 10,
		marginHorizontal: 20,
		paddingHorizontal: 10,
	},
	incomeInfoContainer: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		height: 40,
		borderColor: 'gray',
		borderWidth: 0.5,
		marginVertical: 10,
		marginHorizontal: 20,
		paddingHorizontal: 10,
	},
	incomeInfoDescription: {
		fontWeight: 'bold',
	},
	incomeInfoAmount: {
		fontStyle: 'italic',
	},
});
