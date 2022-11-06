

import React from 'react';
import {
  StyleSheet,
  StatusBar
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome';
import AllExpenses from './screen/AllExpenses';
import ManageExpense from './screen/ManageExpense';
import RecentExpense from './screen/RecentExprense'
import { GlobalStyles } from './constants/styles';
import IconButton from './components/UI/IconButton';
import ExpenseContextProvider from './store/expense-context';
const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpenseOverView () {
  return <BottomTabs.Navigator 
    screenOptions={({navigation})=>({
      headerStyle :{backgroundColor :GlobalStyles.colors.primary500},
      headerTintColor :'white',
      tabBarStyle :{backgroundColor:GlobalStyles.colors.primary500},
      tabBarActiveTintColor : GlobalStyles.colors.accent500,
      headerRight : ({tintColor}) => (
        <IconButton icon="add" size={24} color={tintColor} onPress={()=>{
          navigation.navigate('ManageExpense');
        }}/>
      )
    })}>
    <BottomTabs.Screen name="RecentExpense" component={RecentExpense}
      options ={{
        title : 'Recent Expenses',
        tabBarLabel : 'Recent',
        tabBarIcon :({color,size} )=>
          <Icon name="hourglass-1" color={color} size={size} />
      }}
    />
    <BottomTabs.Screen name="AllExpenses" component={AllExpenses}
      options ={{
        title : 'All Expenses',
        tabBarLabel : 'All',
        tabBarIcon :({color,size} )=>
          <Icon name="calendar" color={color} size={size} />
      }}
    />
  </BottomTabs.Navigator>
}

function App (){
  return (
    <>
    <StatusBar style="dark"/>
    <ExpenseContextProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='ExpensesOverview'
      screenOptions={{
        headerStyle : {backgroundColor :GlobalStyles.colors.primary500},
        headerTintColor : "white"
 
      }}> 
      <Stack.Screen 
        name="ExpensesOverview" 
        component={ExpenseOverView} 
        options={{
          headerShown:false
        }}
      />
      <Stack.Screen name="ManageExpense" component={ManageExpense}
          options={{
            presentation :"modal",
          }}
      />
      </Stack.Navigator>
    </NavigationContainer>
    </ExpenseContextProvider>
    </>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
