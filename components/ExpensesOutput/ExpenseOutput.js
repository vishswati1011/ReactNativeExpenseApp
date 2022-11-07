import { FlatList, View, Text ,StyleSheet} from 'react-native'
import { GlobalStyles } from '../../constants/styles';
// import { ExpensesList, ExpenseSummary } from 'react-native'
import ExpensesList from './ExpenseList';
import ExpenseSummary from './ExpenseSummary';

function ExpensesOutput({ expenses ,expensesPeriod,fallbackText }) {
    let content = <Text style={styles.infoText}>{fallbackText}</Text>;
    console.log("Expense",expenses)

    if(expenses.length>0)
    {
        content =<ExpensesList expenses={expenses}/>;
    }
    return (
        <View style={styles.container}>
            <ExpenseSummary expenses={expenses}
               periodName={expensesPeriod}/>
                {content}
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
    },
    infoText: {
        color:"white",
        fontSize:16,
        textAlign:'center',
        marginTop:32
    }
});