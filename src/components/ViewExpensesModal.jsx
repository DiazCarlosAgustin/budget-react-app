import React from "react";
import { Modal, Stack, Button } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../context/BudgetContext";
import { correncyFormatter } from "../utils";

export default function ViewExpensesModal({ budgetId, handleClose }) {
	const { getBudgetExpenses, budgets, deleteExpenses, deleteBudgets } =
		useBudgets();

	const budget =
		UNCATEGORIZED_BUDGET_ID === budgetId
			? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
			: budgets.find((b) => b.id === budgetId);

    const expenses = getBudgetExpenses(budgetId);

	return (
		<Modal show={budgetId != null} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>
					<Stack direction="horizontal" gap="2">
						<div>Expenses - {budget?.name}</div>
						{budgetId !== UNCATEGORIZED_BUDGET_ID && (
							<Button
								onClick={() => {
									deleteBudgets(budget);
									handleClose(budget);
								}}
								variant="outline-danger"
							>
								Delete
							</Button>
						)}
					</Stack>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
                <Stack direction="vertical" gap="3">
                    {expenses.map(expense => (
                        <Stack direction="horizontal" gap="2" key={expense.id}>
                            <div className="me-auto fs-4">
                                {expense.description}
                            </div>
                            <div className="me-auto fs-5">
                                {correncyFormatter.format(expense.amount)}
                            </div>
                            <Button onClick={() => deleteExpenses(expense)} size="small" variant="outline-danger" >&times;</Button>
                        </Stack>
                    ))}
                </Stack>
            </Modal.Body>
		</Modal>
	);
}
