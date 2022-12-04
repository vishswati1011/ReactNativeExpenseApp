import {View,StyleSheet,Text, Alert} from 'react-native'
import { useState } from 'react';
import Input from './input';
import Button from '../../components/UI/Button';
import { GlobalStyles } from '../../constants/styles';

function ExpenseForm({submitButtonLabel,onCancel,onSubmit,defaultvalues}) {

    console.log("expense Form", defaultvalues)
    const [inputs,setInputs]=useState({
        amount: {
            value:defaultvalues?defaultvalues.amount.toString():'',
            isValid:true
        },
        date:{
            value:defaultvalues?defaultvalues.date.toISOString().slice(0,10):'',
            isValid:true},
        description: {
            value: defaultvalues? defaultvalues.description:'',
            isValid : true,
        }
    });
    function inputChangeHandler(inputIdentifier,enteredValue) {
        setInputs((currentInputValues)=>{
            return {
                ...currentInputValues,
                [inputIdentifier]:{value :enteredValue,isValid:true}
            }
        });
    }
    function submitHandler () {
        const expenseData = {
            amount : +inputs.amount.value,
            date: new Date (inputs.date.value),
            description:inputs.description.value
        }
        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount>0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid =expenseData.description.trim().length>0

        if(!amountIsValid || !dateIsValid || !descriptionIsValid){
            // Alert.alert("Invalid input", 'please check your input value')
        setInputs((curInputes)=>{
            return{
                amount: {value:curInputes.amount.value,isValid:amountIsValid},
                date :{value:curInputes.date.value,isValid:dateIsValid},
                description:{value:curInputes.description.value,isValid:descriptionIsValid}
            }
        })

            return;
        }
        onSubmit(expenseData);

    }
    const formIsInvalid = 
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;
    return (
        <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
            <View style={styles.container}>
            <Input label="Amount" 
            style={styles.rowInput}
            invalid={!inputs.amount.isValid}
            textInputConfig={{
                keybordType : "decimal-pad",
                onChangeText : inputChangeHandler.bind(this,'amount'),  
                //this will refer to funtion and amount is input identifier then enteredValue is automatically pass by react native 
                value:inputs.amount.value
            }}/>
            
            <Input style={styles.rowInput}
            label="Date" 
            invalid={!inputs.date.isValid}
            textInputConfig={{
                placeholder: 'YYYY-MM-DD',
                maxLength:10,
                onChangeText : inputChangeHandler.bind(this,'date'),
                value:inputs.date.value
            }}/>
            </View>
            <Input label="Description" 
            invalid={!inputs.description.isValid}
                textInputConfig={{
                   multiline :true,
                   onChangeText:inputChangeHandler.bind(this,'description'),
                   value:inputs.description.value
                }}
            />
            {formIsInvalid && 
            <Text style={styles.errorText}>Invalid input values - please check your entered data</Text>}
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
    errorText:{
        textAlign:'center',
        color:GlobalStyles.colors.error500,
        margin:8
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