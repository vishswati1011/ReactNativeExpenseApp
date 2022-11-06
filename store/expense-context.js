import { createContext, useReducer } from "react";
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
    const [expenseState,dispatch]=useReducer(expenseReducer,DUMMY_EXPENSES);

    function addExpense (expenseData) {
        dispatch({type:'ADD',payload:expenseData});
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
