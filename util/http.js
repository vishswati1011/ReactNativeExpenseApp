import axios from 'axios';

const BACKED_URL='https://react-native-expense-app-46fe4-default-rtdb.firebaseio.com'
export async function storeExpense (expenseData) {

    const response = await axios.post(BACKED_URL + '/expense.json',expenseData);
    const id =response.data.name;
    return id;
}

//fetch data from firebase

export async function fetchExpenses() {
    const response =await axios.get(BACKED_URL + '/expense.json');

    const expenses = [];

    console.log("Fetched Data from firebase",response.data)
    for(const key in response.data){
        const expenseObj ={ 
            id:key,
            amount:response.data[key].amount,
            date:new Date (response.data[key].date),
            description:response.data[key].description
        }
        expenses.push(expenseObj);
    }
    return expenses;
}

export async function updateExpense(id, expenseData){

    axios.put(BACKED_URL + `/expense/${id}.json`,expenseData)

}
export  function deleteExpense(id){

   return  axios.delete(BACKED_URL + `/expense/${id}.json`)

}
