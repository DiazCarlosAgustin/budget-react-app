import { Container, Stack, Button } from "react-bootstrap";
import { useState } from "react";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";
import TotalBudget from "./components/TotalBudget";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "./context/BudgetContext";

function App() {
	const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
	const [showAddExpenseModalBudgetId, setAddExpenseModalBudgetId] =
		useState(false);
	const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] =
		useState();
	const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
	const { budgets, getBudgetExpenses } = useBudgets();
	function handleClose() {
		setShowAddBudgetModal(false);
	}

	function openAddExpenseModal(budgetId) {
		setShowAddExpenseModal(true);
		setAddExpenseModalBudgetId(budgetId);
	}

	return (
		<>
			<Container className="my-4">
				<Stack direction="horizontal" gap="2" className="mb-4">
					<h1 className="me-auto">Budgets</h1>
					<Button
						className="primary"
						onClick={() => setShowAddBudgetModal(true)}
					>
						Add Budget
					</Button>
					<Button
						className="outline-primary"
						onClick={() => openAddExpenseModal()}
					>
						Add Expense
					</Button>
				</Stack>
				<div
					style={{
						display: "grid",
						gridTemplateColumns:
							"repeat(auto-fill, minmax(300px, 1fr))",
						gap: "1rem",
						alingItems: "flex-start",
					}}
				>
					{budgets.map((budget) => {
						const amount = getBudgetExpenses(budget.id).reduce(
							(acc, item) => acc + item.amount,
							0,
						);
						return (
							<BudgetCard
								key={budget.id}
								name={budget.name}
								amount={amount}
								max={budget.max}
								onViewExpensesClick={() =>
									setViewExpensesModalBudgetId(budget.id)
								}
								onAddExpensesClick={() =>
									openAddExpenseModal(budget.id)
								}
							/>
						);
					})}
					<UncategorizedBudgetCard
						onAddExpensesClick={openAddExpenseModal}
						onViewExpensesClick={() =>
							setViewExpensesModalBudgetId(
								UNCATEGORIZED_BUDGET_ID,
							)
						}
					/>
					<TotalBudget />
				</div>
			</Container>
			<AddBudgetModal
				show={showAddBudgetModal}
				handleClose={handleClose}
			/>
			<AddExpenseModal
				show={showAddExpenseModal}
				defaultBudgetId={showAddExpenseModalBudgetId}
				handleClose={() => setShowAddExpenseModal(false)}
			/>
			<ViewExpensesModal
				budgetId={viewExpensesModalBudgetId}
				handleClose={() => setViewExpensesModalBudgetId()}
			/>
		</>
	);
}

export default App;
