import { useContext } from 'react';
import {ExpensesContext} from '../store/expense-context';
import { getDateMinusDays } from '../util/date';
import ExpensesOutput from '../components/ExpensesOutput/ExpenseOutput';

function RecentExpense (){
    const expenseCtx=useContext(ExpensesContext)
    const recentExpenses = expenseCtx.expenses.filter((expense)=>{
        const today =new Date();
        const date7DaysAgo = getDateMinusDays(today,7);
        return (expense.date >date7DaysAgo) && (expense.date <=today);

    })

    return <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" fallbackText="No expenses registered for the last 7 days"/>
}
export default RecentExpense;