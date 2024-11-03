import os
from flask import Flask, render_template, request, redirect, url_for, session
from accounting_logic import AccountingApp  # Import your accounting logic class

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # For session management

# Initialize the accounting logic
accounting_app = AccountingApp()

@app.route('/')
def index():
    # Display the main page with current journal and statements
    return render_template(
        'index.html',
        journal=accounting_app.journal,
        financial_position=accounting_app.get_financial_position(),
        income_statement=accounting_app.get_income_statement()
    )

@app.route('/add_transaction', methods=['POST'])
def add_transaction():
    # Get data from the form
    date = request.form['date']
    transaction_id = request.form['transaction_id']
    description = request.form['description']
    debit_account = request.form['debit_account']
    credit_account = request.form['credit_account']
    amount = float(request.form['amount'])
    
    # Add transaction
    accounting_app.add_transaction(date, transaction_id, description, debit_account, credit_account, amount)
    return redirect(url_for('index'))

if __name__ == '__main__':
    # Use Heroku's PORT environment variable or default to 5000
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
