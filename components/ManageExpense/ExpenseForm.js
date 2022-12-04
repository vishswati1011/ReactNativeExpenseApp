import {View,StyleSheet,Text, Alert} from 'react-native'
import { useState } from 'react';
import Input from './input';
import Button from '../../components/UI/Button';

function ExpenseForm({submitButtonLabel,onCancel,onSubmit,defaultvalues}) {

    console.log("expense Form", defaultvalues)
    const [inputValue,setInputValues]=useState({
        amount:defaultvalues?defaultvalues.amount.toString():'',
        date:defaultvalues?defaultvalues.date.toISOString().slice(0,10):'',
        description:defaultvalues? defaultvalues.description:''
    });
    function inputChangeHandler(inputIdentifier,enteredValue) {
        setInputValues((currentInputValues)=>{
            return {
                ...currentInputValues,
                [inputIdentifier]:enteredValue
            }
        });
    }
    function submitHandler () {
        const expenseData = {
            amount : +inputValue.amount,
            date: new Date (inputValue.date),
            description:inputValue.description
        }
        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount>0;
        const dateIsValid = expenseData.date.toString() == 'Invalid Date';
        const descriptionIsValid =expenseData.description.trim().length>0

        if(!amountIsValid || !dateIsValid || !descriptionIsValid){
            Alert.alert("Invalid input", 'please check your input value')
            return;
        }
        onSubmit(expenseData);

    }
    return (
        <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
            <View style={styles.container}>
            <Input label="Amount" 
            style={styles.rowInput}
            textInputConfig={{
                keybordType : "decimal-pad",
                onChangeText : inputChangeHandler.bind(this,'amount'),  
                //this will refer to funtion and amount is input identifier then enteredValue is automatically pass by react native 
                value:inputValue.amount
            }}/>
            
            <Input style={styles.rowInput}
            label="Date" textInputConfig={{
                placeholder: 'YYYY-MM-DD',
                maxLength:10,
                onChangeText : inputChangeHandler.bind(this,'date'),
                value:inputValue.date
            }}/>
            </View>
            <Input label="Description" 
                textInputConfig={{
                   multiline :true,
                   onChangeText:inputChangeHandler.bind(this,'description'),
                   value:inputValue.description
                }}
            />
             <View style={styles.buttons} >
        <Button style={styles.button} mode="flat" onPress={onCancel} >
             Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
        {submitButtonLabel}
        </Button>
    </View>
        </View>
    )
}
export default ExpenseForm;
const styles =StyleSheet.create({
    form:{
        marginTop:80,
    },
    title:{
        fontSize:24,
        fontWeight:'bold',
        color:'white',
        marginVertical:24,
        textAlign:'center'
    },
    container:{
        flexDirection:'row',
        justifyContent: 'space-between'

    },
    rowInput:{
        flex:1
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

})