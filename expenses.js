document.addEventListener('DOMContentLoaded', function () {
    const expenseList = document.getElementById('expenseList');

    // Function to fetch and display expenses
    function fetchAndDisplayExpenses() {
        fetch('/expenses')
            .then(response => response.json())
            .then(expenses => {
                expenseList.innerHTML = ''; // Clear previous list
                expenses.forEach(expense => {
                    const expenseItem = document.createElement('div');
                    expenseItem.classList.add('expense-item');
                    expenseItem.innerHTML = `<strong>${expense.description}</strong>: $${expense.amount}`;
                    expenseList.appendChild(expenseItem);
                });
            })
            .catch(error => console.error('Error fetching expenses:', error));
    }

    // Fetch and display expenses on page load
    fetchAndDisplayExpenses();
});
