import {Text,StyleSheet} from 'react-native'
import ExpensesOutput from '../components/ExpensesOutput/ExpenseOutput';

function RecentExpense (){
    return <ExpensesOutput expensesPeriod="Last 7 Days"/>
}
export default RecentExpense;