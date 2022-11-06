import { useContext } from 'react';
import {Text,StyleSheet} from 'react-native'
import ExpensesOutput from '../components/ExpensesOutput/ExpenseOutput';
import { ExpensesContext } from '../store/expense-context'
function AllExpenses (){
    const expenseCtx=useContext(ExpensesContext)
    console.log(expenseCtx)
    return (
    <ExpensesOutput
       expenses={expenseCtx.expenses} 
       expensesPeriod="Total"
       fallbackText="No Registered expenses found!"
    />
        )
}
export default AllExpenses;