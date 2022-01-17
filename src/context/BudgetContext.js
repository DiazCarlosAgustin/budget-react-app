import React, { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage"
import {v4 as uuidV4} from "uuid";

const BudgetsContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export function useBudgets() {
	return useContext(BudgetsContext);
}

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage("budgets",[])
    const [expenses, setExpenses] = useLocalStorage("expenses",[])

    function getBudgetExpenses(budgetId){
        return expenses.filter(expense => expense.budgetId === budgetId)
    }

    function addBudgets({name, max}){
        setBudgets(prevBudgets => {
            if(prevBudgets.find(budgets => budgets.name === name)){
                return prevBudgets
            }
            return [...prevBudgets, {id:uuidV4(),name, max}]
        })
    }
    function addExpenses({description,amount, budgetId}){
        setExpenses(prevExpenses => {
            return [...prevExpenses, {id:uuidV4(), description,amount, budgetId}]
        })
    }
    function deleteBudgets({id}){
        setExpenses(prev => {
            return prev.map(expense => {
                if(expense.budgetId !== id) return expense;
                return {...expense, budgetId: UNCATEGORIZED_BUDGET_ID};
            })
        })
        setBudgets(prev => {
            return prev.filter(budget => budget.id !== id)
        })
    }
    function deleteExpenses({id}){
        setExpenses(prev => {
            return prev.filter(expense => expense.id !== id)
        })
    }

	return (
		<BudgetsContext.Provider
			value={{
				budgets,
				expenses,
				getBudgetExpenses,
				addExpenses,
				addBudgets,
				deleteBudgets,
				deleteExpenses,
			}}
		>
			{children}
		</BudgetsContext.Provider>
	);
};
