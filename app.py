import os
from flask import Flask, render_template, request, redirect, url_for, session
from accounting_logic import AccountingApp
import uuid

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # For session management

# Helper function to retrieve user's transactions from the session
def get_user_transactions():
    return session.setdefault('transactions', [])

# Helper function to save user's transactions in the session
def save_user_transactions(transactions):
    session['transactions'] = transactions

# Helper function to update the accounting app with current user's transactions
def update_accounting_app_with_transactions():
    transactions = get_user_transactions()
    accounting_app = AccountingApp()  # Reset for each session
    for transaction in transactions:
        accounting_app.add_transaction(
            transaction['date'],
            transaction['transaction_id'],
            transaction['description'],
            transaction['debit_account'],
            transaction['credit_account'],
            transaction['amount']
        )
    return accounting_app

@app.route('/')
def index():
    accounting_app = update_accounting_app_with_transactions()  # Ensure up-to-date session data
    transactions = get_user_transactions()
    financial_position = accounting_app.get_financial_position()
    income_statement = accounting_app.get_income_statement()
    return render_template(
        'index.html',
        journal=transactions,
        financial_position=financial_position,
        income_statement=income_statement
    )

@app.route('/add_transaction', methods=['POST'])
def add_transaction():
    date = request.form['date']
    transaction_id = str(uuid.uuid4())  # Unique identifier for each transaction
    description = request.form['description']
    debit_account = request.form['debit_account']
    credit_account = request.form['credit_account']
    amount = float(request.form['amount'])

    # Create the transaction dictionary
    transaction = {
        'id': transaction_id,
        'date': date,
        'transaction_id': transaction_id,
        'description': description,
        'debit_account': debit_account,
        'credit_account': credit_account,
        'amount': amount
    }

    # Save to user's session
    transactions = get_user_transactions()
    transactions.append(transaction)
    save_user_transactions(transactions)

    return redirect(url_for('index'))

@app.route('/delete_transaction/<transaction_id>', methods=['POST'])
def delete_transaction(transaction_id):
    transactions = get_user_transactions()
    transactions = [t for t in transactions if t['id'] != transaction_id]
    save_user_transactions(transactions)
    return redirect(url_for('index'))

@app.route('/edit_transaction/<transaction_id>', methods=['POST'])
def edit_transaction(transaction_id):
    transactions = get_user_transactions()
    for transaction in transactions:
        if transaction['id'] == transaction_id:
            transaction['date'] = request.form['date']
            transaction['description'] = request.form['description']
            transaction['debit_account'] = request.form['debit_account']
            transaction['credit_account'] = request.form['credit_account']
            transaction['amount'] = float(request.form['amount'])
            break
    save_user_transactions(transactions)
    return redirect(url_for('index'))

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
