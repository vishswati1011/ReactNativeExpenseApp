import { useContext, useLayoutEffect, useState } from 'react';
import {Text,StyleSheet,View} from 'react-native'
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import {ExpensesContext} from '../store/expense-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';

function ManageExpense ({route,navigation}){

    const expenseCtx=useContext(ExpensesContext)
    const editedExpenseId = route.params?.expenseId;
    const isEditing =!!editedExpenseId
    const [isSubmiting,isSetSubmiting]=useState(false);
    const [error,setError]=useState()
    const selectedExpense =expenseCtx.expenses.find(expense=>expense.id === editedExpenseId)
    useLayoutEffect(()=>{
        navigation.setOptions ({
            title: isEditing? 'Edit Expense': 'Add Expense'
        })
    },[navigation,isEditing]);
    
    async function deleteExpenseHandler(){
        try{
            await deleteExpense(editedExpenseId);
            expenseCtx.deleteExpense(editedExpenseId)
            navigation.goBack();
        }catch(error){
            setError("Counld not delete expense - please try again later!")
            isSetSubmiting(false)
        }
        
    }
    function errorHandler () {
        setError(null);
    }

    if(error && !isSubmiting){
        console.log("error")
        return <ErrorOverlay message={error} onConfirm={errorHandler}/>;
    }
    
    if(isSubmiting)
    {
        return <LoadingOverlay />;
    }
    async function confirmHandler (expenseData) {
        isSetSubmiting(true);
        try{
            if(isEditing){
                expenseCtx.updateExpense(
                    editedExpenseId,
                    expenseData
                    )
                    await updateExpense(editedExpenseId,
                        expenseData);
                        isSetSubmiting(false)
                }else{
                    const id = await storeExpense(expenseData);
                    expenseCtx.addExpense({...expenseData,id:id})
                    isSetSubmiting(false)
    
                }
                navigation.goBack();
        }catch(error)
        {
            setError("Could not save data - please try again later!")
            isSetSubmiting(false)
        }

    }
    function cancelHandler () {
        navigation.goBack();
        
    }
    if(isSubmiting){
        return <LoadingOverlay/>
    }
    return (
    <View style={styles.container}>
    <ExpenseForm 
    submitButtonLabel={isEditing?'Update':'Add'} 
    onCancel={cancelHandler}
    onSubmit={confirmHandler}
    defaultvalues={selectedExpense}
    />

   
        {isEditing && (
            <View style={styles.deleteContainer}>
            <IconButton 
            icon="trash" color={GlobalStyles.colors.error500}
                size={36}
                onPress={deleteExpenseHandler}
            />
        </View>)}
    </View>
    )
}
export default ManageExpense;

const styles =StyleSheet.create({
    container: {
        flex:1,
        padding:24,
        backgroundColor:GlobalStyles.colors.primary800,
    },
   
    deleteContainer :{
        marginTop:16,
        paddingTop:8,
        borderTopWidth:2,
        borderTopColor:GlobalStyles.colors.primary200,
        alignItems:'center',
    }
})