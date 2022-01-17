import React from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../context/BudgetContext";
import BudgetCard from "./BudgetCard";

export default function UncategorizedBudgetCard(props) {
	const { getBudgetExpenses } = useBudgets();
	const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
		(acc, item) => acc + item.amount,
		0,
	);

	if (amount === 0) return null;

	return (
		<BudgetCard
			gray
			name="uncategorized"
			amount={amount}
			{...props}
			onAddExpensesClick={props.onAddExpensesClick}
			onViewExpensesClick={props.onViewExpensesClick}
		/>
	);
}
