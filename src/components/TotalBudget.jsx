import React from "react";
import { useBudgets } from "../context/BudgetContext";
import BudgetCard from "./BudgetCard";

export default function TotalBudget() {
	const { expenses, budgets } = useBudgets();

	const amount = expenses.reduce(
		(acc, item) => acc + parseInt(item.amount),
		0,
	);
	const max = budgets.reduce(
		(acc, item) => acc + parseInt(item.max),
		0,
	);

	if (max === 0) return null;

	return <BudgetCard gray name="Total" amount={amount} max={max} hideButton/>;
}
