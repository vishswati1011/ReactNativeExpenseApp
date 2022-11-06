import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({

    expenses : [],
    addExpense :({description,amount,date}) =>{},
    deleteExpense : (id) =>{},
    updateExpense : (id,{description,amount,date}) =>{},
});
function expenseReducer (state,action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString+Math.random().toString();
            return [{...action.payload,id:id},...state];
        case 'UPDATE':
        case "DELETE":  
        default:
            return state;  
    }
}
function ExpenseContextProvider ({children}) {
    const [expenseState,dispatch]=useReducer(expenseReducer);

    function addExpense (expenseData) {
        dispatch({type:'ADD',payload:expenseData});
    }
    function deleteExpense (id) {
        dispatch({type:"DELETE",payload:id})
    }
    function updateExpense (id,expenseData) {
        dispatch({type:"UPDATE",payload:{id:id,data:expenseData}})
    }
    return (
    <ExpensesContext.Provider>
        {children}
    </ExpensesContext.Provider>
    )
}
export default ExpenseContextProvider;
