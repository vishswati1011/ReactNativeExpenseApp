import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({

    expenses : [],
    addExpense :({description,amount,date}) =>{},
    setExpense :(expenses)=>{},
    deleteExpense : (id) =>{},
    updateExpense : (id,{description,amount,date}) =>{},
});
function expenseReducer (state,action) {
    switch (action.type) {
        case 'ADD':
            return [action.payload,...state];
        case 'SET':
            const inverted =action.payload.reverse();
            return inverted;
        case 'UPDATE':
            const updatableExpenseIndex =state.findIndex((expense)=>
            expense.id===action.payload.id
            );
            const updatableExpense = state[updatableExpenseIndex];
            const updateItem = { ...updatableExpense,...action.payload.data};
            const updatedExpense = [...state];
            updatedExpense[updatableExpenseIndex] = updateItem;
            return updatedExpense;
        case "DELETE":  
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;  
    }
}
function ExpenseContextProvider ({children}) {
    const [expenseState,dispatch]=useReducer(expenseReducer,[]);

    function addExpense (expenseData) {
        dispatch({type:'ADD',payload:expenseData});
    }
    function setExpense (expenses) {
        dispatch({type:'SET',payload:expenses})
    }
    function deleteExpense (id) {
        dispatch({type:"DELETE",payload:id})
    }
    function updateExpense (id,expenseData) {
        dispatch({type:"UPDATE",payload:{id:id,data:expenseData}})
    }
    const value = {
        expenses :expenseState,
        addExpense:addExpense,
        setExpense:setExpense,
        deleteExpense:deleteExpense,
        updateExpense:updateExpense
    }
    return (
    <ExpensesContext.Provider value={value}>
        {children}
    </ExpensesContext.Provider>
    )
}
export default ExpenseContextProvider;
