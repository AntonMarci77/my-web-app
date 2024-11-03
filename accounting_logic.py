class AccountingApp:
    def __init__(self):
        # Initialize journal, accounts_totals, etc.
        self.journal = []
        self.accounts_totals = {
            "AC": 0,  # Current Assets
            "AN": 0,  # Non-Current Assets
            "EQ": 0,  # Equity (without profit/loss)
            "LC": 0,  # Current Liabilities
            "LN": 0,  # Non-Current Liabilities
            "RE": 0,  # Revenues
            "EX": 0,  # Expenses
        }

    def add_transaction(self, date, transaction_id, description, debit_account, credit_account, amount):
        transaction = (date, transaction_id, description, debit_account, credit_account, amount)
        self.journal.append(transaction)
        self.update_statements(transaction)

    def update_statements(self, transaction):
        _, _, _, debit_account, credit_account, amount = transaction
        if debit_account in ["AC", "AN", "EX"]:
            self.accounts_totals[debit_account] += amount
        else:
            self.accounts_totals[debit_account] -= amount

        if credit_account in ["LC", "LN", "EQ", "RE"]:
            self.accounts_totals[credit_account] += amount
        else:
            self.accounts_totals[credit_account] -= amount

    def get_financial_position(self):
        # Calculate individual components
        current_assets = self.accounts_totals["AC"]
        non_current_assets = self.accounts_totals["AN"]
        equity = self.accounts_totals["EQ"]
        current_liabilities = self.accounts_totals["LC"]
        non_current_liabilities = self.accounts_totals["LN"]
        profit = self.accounts_totals["RE"] - self.accounts_totals["EX"]

        # Calculate totals
        total_assets = current_assets + non_current_assets
        total_equity_liabilities = equity + current_liabilities + non_current_liabilities + profit

        # Return all components, including totals
        return {
            "assets": {
                "current_assets": current_assets,
                "non_current_assets": non_current_assets,
                "total_assets": total_assets
            },
            "equity_liabilities": {
                "equity": equity,
                "current_liabilities": current_liabilities,
                "non_current_liabilities": non_current_liabilities,
                "profit": profit,
                "total_equity_liabilities": total_equity_liabilities
            }
        }

    def get_income_statement(self):
        # Return a summary of the income statement
        return {
            "expenses": self.accounts_totals["EX"],
            "revenues": self.accounts_totals["RE"],
            "profit": self.accounts_totals["RE"] - self.accounts_totals["EX"]
        }
