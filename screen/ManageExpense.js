import { useContext, useLayoutEffect } from 'react';
import {Text,StyleSheet,View} from 'react-native'
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/UI/Button';
import {ExpensesContext} from '../store/expense-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';

function ManageExpense ({route,navigation}){

    const expenseCtx=useContext(ExpensesContext)
    const editedExpenseId = route.params?.expenseId;
    const isEditing =!!editedExpenseId

    useLayoutEffect(()=>{
        navigation.setOptions ({
            title: isEditing? 'Edit Expense': 'Add Expense'
        })
    },[navigation,isEditing]);
    
    function deleteExpenseHandler(){
        expenseCtx.deleteExpense(editedExpenseId)
        navigation.goBack();
    }
    function confirmHandler () {
        if(isEditing){
            expenseCtx.updateExpense(
                editedExpenseId,
                {
                    description:"Notes!!!!!",
                    amount:19.99,
                    date : new Date('2022-11-20')
                }
                )
            }else{
                expenseCtx.addExpense({description:"Notes new",amount:19.99,date : new Date('2022-11-6')})
            }
            navigation.goBack();

    }
    function cancelHandler () {
        navigation.goBack();
        
    }
    return (
    <View style={styles.container}>
    <ExpenseForm/>

    <View style={styles.buttons} >
        <Button style={styles.button} mode="flat" onPress={cancelHandler} >
             Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
        {isEditing? 'Update' :'Add'}
        </Button>
    </View>
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
    buttons:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    },
    button:{
        width:200,
        marginHorizontal:8
    },
    deleteContainer :{
        marginTop:16,
        paddingTop:8,
        borderTopWidth:2,
        borderTopColor:GlobalStyles.colors.primary200,
        alignItems:'center',
    }
})