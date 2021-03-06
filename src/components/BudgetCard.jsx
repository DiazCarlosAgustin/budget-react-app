import React from "react";
import { Card, ProgressBar, Button, Stack } from "react-bootstrap";
import { correncyFormatter } from "../utils";

export default function BudgetCard({
	name,
	amount,
	max,
	gray,
	onAddExpensesClick,
	hideButton,
	onViewExpensesClick
}) {
	const className = [];
	if (amount > max) {
		className.push("bg-danger", "bg-opacity-10");
	} else if (gray) {
		className.push("gb-light");
	}

	return (
		<Card className={className.join(" ")}>
			<Card.Body>
				<Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
					<div className="me-2">{name}</div>
					<div className="d-flex align-items-baseline">
						{correncyFormatter.format(amount)}{" "}
						{max && (
							<span className="text-muted fs-6 ms-1">
								/ {max && correncyFormatter.format(max)}
							</span>
						)}
					</div>
				</Card.Title>
				{max && (
					<ProgressBar
						className="rounded-pill"
						min={0}
						max={max}
						now={amount}
						variant={getProgressBarVariant(amount, max)}
					></ProgressBar>
				)}
				{!hideButton && (
					<Stack direction="horizontal" gap="2" className="mt-4">
						<Button
							variant="outline-primary"
							className="ms-auto"
							onClick={onAddExpensesClick}
						>
							Add Expense
						</Button>
						<Button variant="outline-secondary" onClick={onViewExpensesClick}>
							View Expenses
						</Button>
					</Stack>
				)}
			</Card.Body>
		</Card>
	);
}
function getProgressBarVariant(amount, max) {
	const ratio = amount / max;
	if (ratio < 0.5) return "primary";
	if (ratio < 0.75) return "warning";
	return "danger";
}
