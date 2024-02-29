document.addEventListener('DOMContentLoaded', function () {
    const expenseForm = document.getElementById('expenseForm') as HTMLFormElement;
    const expenseList = document.getElementById('expenseList');

    if (expenseForm && expenseList) { // Ensure elements exist before proceeding
        // Function to fetch and display expenses
        function fetchAndDisplayExpenses() {
            fetch('/expenses')
                .then(response => response.json())
                .then(expenses => {
                    if (expenseList) {
                        expenseList.innerHTML = ''; // Clear previous list
                        expenses.forEach(expense => {
                            const expenseItem = document.createElement('div');
                            expenseItem.classList.add('expense-item');
                            expenseItem.innerHTML = `<strong>${expense.description}</strong>: $${expense.amount}`;
                            if (expenseList) {
                                expenseList.appendChild(expenseItem);
                            }
                        });
                    }
                })
                .catch(error => console.error('Error fetching expenses:', error));
        }

        // Fetch and display expenses on page load
        fetchAndDisplayExpenses();

        // Handle form submission
        expenseForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const descriptionInput = document.getElementById('description') as HTMLInputElement;
            const amountInput = document.getElementById('amount') as HTMLInputElement;

            if (descriptionInput && amountInput) { // Ensure inputs exist before proceeding
                const description = descriptionInput.value;
                const amount = amountInput.value;

                // Send expense data to server
                fetch('/expense', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ description, amount })
                })
                .then(response => {
                    if (response.ok) {
                        // Clear form inputs
                        expenseForm.reset();
                        // Fetch and display updated expenses
                        fetchAndDisplayExpenses();
                    } else {
                        throw new Error('Error adding expense');
                    }
                })
                .catch(error => console.error('Error adding expense:', error));
            }
        });
    }
});
