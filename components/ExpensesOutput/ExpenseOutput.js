import { FlatList, View, Text ,StyleSheet} from 'react-native'
import { GlobalStyles } from '../../constants/styles';
// import { ExpensesList, ExpenseSummary } from 'react-native'
import ExpensesList from './ExpenseList';
import ExpenseSummary from './ExpenseSummary';
const DUMMY_EXPENSES =[
    {
        id :'el',
        description :' A pair of shoes',
        amount : 59.99,
        date : new Date ('2022-12-19')
    },
    {
        id :'e2',
        description :'Some Mango',
        amount : 60.99,
        date : new Date ('2022-12-20')
    },
    {
        id :'e3',
        description :' Some Banana',
        amount : 80.99,
        date : new Date ('2022-01-05')
    },
    {
        id :'e4',
        description :' Some Papaya',
        amount : 40.90,
        date : new Date ('2022-02-10')
    },
    {
        id :'e5',
        description :' A pair of shoes',
        amount : 59.99,
        date : new Date ('2022-12-19')
    },
    {
        id :'e6',
        description :'Some Mango',
        amount : 60.99,
        date : new Date ('2022-12-20')
    },
    {
        id :'e7',
        description :' Some Banana',
        amount : 80.99,
        date : new Date ('2022-01-05')
    },
    {
        id :'e8',
        description :' Some Papaya',
        amount : 40.90,
        date : new Date ('2022-02-10')
    }
]
function ExpensesOutput({ expenses ,expensesPeriod }) {
    return (
        <View style={styles.container}>
            <ExpenseSummary expenses={DUMMY_EXPENSES}
               periodName={expensesPeriod}/>
            <ExpensesList  expenses={DUMMY_EXPENSES}/>
        </View>
    )
}

export default ExpensesOutput;
const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:24,
        paddingBottom:0,
        paddingTop:24,

        backgroundColor:GlobalStyles.colors.primary700,
    }
})