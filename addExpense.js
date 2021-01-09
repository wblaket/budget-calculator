var row, col;
var tableRow;
var columnData;
var tableLength;
var yearlySalary, monthlySalary;
var monthlyCosts = 0;
var yearlyCosts = 0;
var totalMonthlyItems = 0;
var mostExpensiveMonthlyItem, mostExpensiveYearlyItem, mostExpensiveWeeklyItem;

var mostExpensiveMonthlyItemAmount = 0;
var mostExpensiveYearlyItemAmount = 0;
var mostExpensiveWeeklyItemAmount = 0;

var expenseTable = document.getElementById("expenseTable"); //create a reference to the table.

function addExpense() {
	let expenseName = document.getElementById("expenseName").value; // get the expense name from user input
	let expenseCost= document.getElementById("expenseCost").value; // get the cost of the expense from user input.
	let expenseReoccurence = document.querySelector('input[name = "recurring"]:checked').value; // get the value of whichever was checked.
	console.log("The expense cost is " + expenseCost);
	if (expenseName == "" || expenseCost == "") {

		window.alert("One or more fields are blank. Please enter the name of your expense and its cost.");
		return;
	}

	//create a new row when button is clicked and insert three cells.
	let row = expenseTable.insertRow(1);
	let cell1 = row.insertCell(0);
	let cell2 = row.insertCell(1);
	let cell3 = row.insertCell(2);

	cell1.innerHTML = expenseName;
	cell2.innerHTML = "$" + expenseCost;
	cell3.innerHTML = expenseReoccurence;
	updateTable();
}


function updateTable() {

	var totalYearlyCost = 0;
	var totalCost = 0;
	var totalMonthlyCost = 0;
	tableLength = expenseTable.rows.length;
	let totalYearlyItems = 0; // The number of unique monthly expenses.
	let totalMonthlyItems = 0; // The number of unique weekly expenses.


	// This will loop through each row of the table.
	for (row = 1; row < tableLength; row++) {

		columnData = expenseTable.rows[row].cells[1].innerHTML;
		columnData = removeDollarSign(columnData);
		console.log("The column data is " + columnData);

		// This will determine if the cost is weekly, monthly, or yearly. If it's a one-time expense, it only will add to the total costs.
		let reoccurenceValue = expenseTable.rows[row].cells[2].innerHTML;

		if (reoccurenceValue == "yearly") {
			 totalYearlyCost += columnData;
			 document.getElementById("displayYearlyCost2").innerHTML = "$" + totalYearlyCost;
			 totalYearlyItems++; // Increase the number of yearly Items;

			 // Check and see if the yearly expense is the most expensive yet.
			 if (columnData > mostExpensiveYearlyItemAmount) {
				 mostExpensiveYearlyItemAmount = columnData;
				 document.getElementById("displayMostExpensiveYearlyItem").innerHTML = expenseTable.rows[row].cells[0].innerHTML;
			 }

		}
		if (reoccurenceValue == "monthly") {
			totalMonthlyCost += columnData;
			document.getElementById("displayMonthlyCost2").innerHTML = "$" + totalMonthlyCost;
			totalMonthlyItems++;

			// Check and see if the monthly expense is the most expensive yet.
			 if (columnData > mostExpensiveMonthlyItemAmount) {
				 mostExpensiveMonthlyItemAmount = columnData;
				 mostExpensiveMonthlyItem = expenseTable.rows[row].cells[0].innerHTML;
				 document.getElementById("displayMostExpensiveMonthlyItem").innerHTML = expenseTable.rows[row].cells[0].innerHTML;
			 }
		}
	}

	let totalExpenses = getTotalExpenses();
	document.getElementById("displayTotalExpenses").innerHTML = "$" + totalExpenses;
	document.getElementById("displayNumOfYearlyExpenses").innerHTML = totalYearlyItems;
	document.getElementById("displayNumOfMonthlyExpenses").innerHTML = totalMonthlyItems;
	document.getElementById("totalNumberOfExpenses").innerHTML = totalMonthlyItems + totalYearlyItems;
}

function removeDollarSign(amount) {
		amount = amount.split("$");
		amount = parseInt(amount[1]);
		return amount;
}

function getTotalExpenses() {

	monthlyCosts = document.getElementById("displayMonthlyCost2").innerHTML;
	monthlyCosts = 12 * removeDollarSign(monthlyCosts);
	//monthlyCosts = (12 * parseInt(document.getElementById("displayMonthlyCost2").innerHTML));
	if (isNaN(monthlyCosts)) { monthlyCosts = 0; }

	yearlyCosts = document.getElementById("displayYearlyCost2").innerHTML;
	yearlyCosts = removeDollarSign(yearlyCosts);
	//yearlyCosts = parseInt(document.getElementById("displayYearlyCost2").innerHTML);
	if (isNaN(yearlyCosts)) { yearlyCosts = 0;}


	let totalExpenses =  monthlyCosts + yearlyCosts;
	return totalExpenses;
}


function calculateAnnualSalary(){
	let totalExpenses = getTotalExpenses();
	let yearlySalary = document.getElementById("yearlyIncome").value;
	let remainingIncome = yearlySalary - totalExpenses;
	document.getElementById("remainingYearlyIncome").innerHTML = remainingIncome;
}


function calculateMonthlyCost() {
	let monthlyIncome = document.getElementById("monthlyIncome").value;
	console.log("Your monthly Salary is " + monthlyIncome);

	monthlyCosts = document.getElementById("displayMonthlyCost2").innerHTML;
	monthlyCosts = removeDollarSign(monthlyCosts);

	let remainingMonthlyIncome = monthlyIncome - monthlyCosts;
	console.log("The remaining income is " + remainingMonthlyIncome);
	document.getElementById("remainingMonthlyIncome").innerHTML = remainingMonthlyIncome;

}
