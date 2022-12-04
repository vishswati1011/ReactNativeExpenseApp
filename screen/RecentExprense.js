import { useContext, useEffect, useState } from 'react';
import {ExpensesContext} from '../store/expense-context';
import { getDateMinusDays } from '../util/date';
import ExpensesOutput from '../components/ExpensesOutput/ExpenseOutput';
import { fetchExpenses } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay'
function RecentExpense (){

    const [isFetching,isSetFetching]=useState(true);
    const [error,setError]=useState();
    const expenseCtx=useContext(ExpensesContext)
    
    useEffect (()=>{
        async function getExpenses() {
            isSetFetching(true)
            try{
                const expenses = await fetchExpenses();
                expenseCtx.setExpense(expenses);

            }catch(error){
                setError('could not fetch expenses!')
            }
            isSetFetching(false);
        }
        getExpenses();

    },[]);
    function errorHandler () {
        setError(null);
    }

    if(error && !isFetching){
        console.log("error")
        return <ErrorOverlay message={error} onConfirm={errorHandler}/>;
    }
    
    if(isFetching)
    {
        return <LoadingOverlay />;
    }

    
    const recentExpenses = expenseCtx.expenses.filter((expense)=>{
        const today =new Date();
        console.log("today",expense.date)
        const date7DaysAgo = getDateMinusDays(today,7);
        console.log("date7 days ago",date7DaysAgo)
        if(expense.date <date7DaysAgo)
        {
            return expense;
        }

    })


        console.log("RECEN EXPENSE",recentExpenses)
    return <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" fallbackText="No expenses registered for the last 7 days"/>
}
export default RecentExpense;