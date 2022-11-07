import {View,StyleSheet,Text} from 'react-native'
import Input from './input';
function ExpenseForm() {

    function amountChangeHandler() {

    }
    return (
        <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
            <View style={styles.container}>
            <Input label="Amount" 
            style={styles.rowInput}
            textInputConfig={{
                keybordType : "decimal-pad",
                onChangeText : amountChangeHandler,
            }}/>
            
            <Input style={styles.rowInput}
            label="Date" textInputConfig={{
                placeholder: 'YYYY-MM-DD',
                maxLength:10,
                onChangeText : () =>{}
            }}/>
            </View>
            <Input label="Description" 
                textInputConfig={{
                   multiline :true,
                }}
            />
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
    }
})