import React, { useState, useCallback, memo } from 'react';
import { ClipboardIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

// -------------------------------------------------
// Global data (projects)
const PROJECTS_DATA = [
  {
    id: 'password',
    title: 'Password Generator',
    description: 'Generate secure, customizable passwords with strength evaluation and history.',
    code: `"""
Password Generator - Python Project
-----------------------------------
This is a secure and customizable password generator built using Python.
It allows users to define the password length, choose character sets
(uppercase, lowercase, digits, symbols), and optionally exclude ambiguous characters.

Modules Used:
- string   : For predefined character sets.
- secrets  : For secure, cryptographic randomization.
- random   : For optional character shuffling.
"""

import string
import secrets
import random

def generate_password():
    print("\\nWelcome to the Python Password Generator\\n")

    try:
        length = int(input("Enter desired password length: "))
        if length <= 0:
            print("Password length must be greater than 0.")
            return
    except ValueError:
        print("Invalid input. Please enter a number.")
        return

    use_uppercase = input("Include UPPERCASE letters? (y/n): ").strip().lower() == 'y'
    use_lowercase = input("Include lowercase letters? (y/n): ").strip().lower() == 'y'
    use_digits    = input("Include digits? (y/n): ").strip().lower() == 'y'
    use_symbols   = input("Include symbols? (y/n): ").strip().lower() == 'y'
    exclude_ambiguous = input("Exclude ambiguous characters (e.g. l, 1, I, O, 0)? (y/n): ").strip().lower() == 'y'

    char_pool = ""
    if use_uppercase:
        char_pool += string.ascii_uppercase
    if use_lowercase:
        char_pool += string.ascii_lowercase
    if use_digits:
        char_pool += string.digits
    if use_symbols:
        char_pool += string.punctuation

    if exclude_ambiguous:
        ambiguous = "l1I0O"
        char_pool = ''.join(c for c in char_pool if c not in ambiguous)

    if not char_pool:
        print("No character types selected. Cannot generate password.")
        return

    password = [secrets.choice(char_pool) for _ in range(length)]
    random.shuffle(password)

    print("\\nGenerated Secure Password:")
    print(''.join(password))
    print("\\nTip: Use a password manager to store your secure passwords.")

if __name__ == "__main__":
    generate_password()`
  },
  {
    id: 'atm',
    title: 'ATM Simulator',
    description: 'Simulate ATM operations with PIN authentication and multiple accounts.',
    code: `"""
ATM Simulator - Python Project
-----------------------------
This is an enhanced ATM simulator with PIN authentication and support for multiple card types.
It supports checking balance, depositing, withdrawing, viewing transaction history, and exiting.

Modules Used:
- datetime: For timestamping transactions.
"""

from datetime import datetime

def display_menu():
    print("\\n--- ATM MENU ---")
    print("1. Check Balance")
    print("2. Deposit")
    print("3. Withdraw")
    print("4. View Transaction History")
    print("5. Switch Card")
    print("6. Exit")

def check_balance(balance, card_type):
    print(f"Your current {card_type} balance is: ₹{balance:.2f}")

def deposit(balance, transactions, card_type):
    try:
        amount = float(input("Enter amount to deposit: ₹"))
        if amount > 0:
            balance += amount
            transactions.append({
                'type': 'Deposit',
                'amount': amount,
                'timestamp': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            })
            print(f"₹{amount:.2f} deposited successfully. New {card_type} balance: ₹{balance:.2f}")
        else:
            print("Invalid deposit amount! Must be positive.")
    except ValueError:
        print("Invalid input! Please enter a number.")
    return balance

def withdraw(balance, transactions, card_type):
    try:
        amount = float(input("Enter amount to withdraw: ₹"))
        if amount > balance:
            print("Insufficient balance!")
        elif amount <= 0:
            print("Invalid withdrawal amount! Must be positive.")
        else:
            balance -= amount
            transactions.append({
                'type': 'Withdrawal',
                'amount': amount,
                'timestamp': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            })
            print(f"₹{amount:.2f} withdrawn successfully. New {card_type} balance: ₹{balance:.2f}")
    except ValueError:
        print("Invalid input! Please enter a number.")
    return balance

def view_history(transactions, card_type):
    if not transactions:
        print(f"No transactions yet for {card_type} account.")
        return
    print(f"\\n--- {card_type.capitalize()} Transaction History ---")
    for tx in transactions:
        print(f"{tx['timestamp']} - {tx['type']}: ₹{tx['amount']:.2f}")

def main():
    correct_pin = "1234"
    attempts = 3
    while attempts > 0:
        pin = input("Enter your 4-digit PIN: ")
        if pin == correct_pin:
            break
        attempts -= 1
        print(f"Invalid PIN! {attempts} attempts remaining.")
    if attempts == 0:
        print("Too many incorrect attempts. Exiting.")
        return

    accounts = {
        'savings': {'balance': 1000.00, 'transactions': []},
        'credit': {'balance': 5000.00, 'transactions': []}
    }
    current_card = None

    while True:
        if not current_card:
            print("\\n--- Select Card Type ---")
            print("1. Savings Account")
            print("2. Credit Account")
            try:
                card_choice = int(input("Enter your choice (1-2): "))
                if card_choice == 1:
                    current_card = 'savings'
                elif card_choice == 2:
                    current_card = 'credit'
                else:
                    print("Invalid choice! Please select 1 or 2.")
                    continue
            except ValueError:
                print("Invalid input! Please enter a number.")
                continue

        display_menu()
        try:
            choice = int(input("Enter your choice (1-6): "))
            if choice == 1:
                check_balance(accounts[current_card]['balance'], current_card)
            elif choice == 2:
                accounts[current_card]['balance'] = deposit(
                    accounts[current_card]['balance'],
                    accounts[current_card]['transactions'],
                    current_card
                )
            elif choice == 3:
                accounts[current_card]['balance'] = withdraw(
                    accounts[current_card]['balance'],
                    accounts[current_card]['transactions'],
                    current_card
                )
            elif choice == 4:
                view_history(accounts[current_card]['transactions'], current_card)
            elif choice == 5:
                current_card = None
            elif choice == 6:
                print("Thank you for using the ATM. Goodbye!")
                break
            else:
                print("Invalid choice! Please select between 1-6.")
        except ValueError:
            print("Invalid input! Please enter a number.")

if __name__ == "__main__":
    main()`
  }
];

// -------------------------------------------------
// Password Generator (memoized)
const PasswordGenerator = memo(() => {
  const [length, setLength] = useState(12);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useDigits, setUseDigits] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [recentPasswords, setRecentPasswords] = useState([]);
  const [passwordStrength, setPasswordStrength] = useState(null);
  const [error, setError] = useState('');

  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const ambiguous = 'l1I0O';

  const calculatePasswordStrength = useCallback((pwd) => {
    let strengthScore = 0;
    const charTypes = [
      pwd.match(/[A-Z]/),
      pwd.match(/[a-z]/),
      pwd.match(/[0-9]/),
      pwd.match(/[^A-Za-z0-9]/)
    ].filter(Boolean).length;

    if (pwd.length >= 16) strengthScore += 40;
    else if (pwd.length >= 12) strengthScore += 30;
    else if (pwd.length >= 8) strengthScore += 20;
    else strengthScore += 10;

    strengthScore += charTypes * 15;

    const poolSize = (useUppercase ? 26 : 0) + (useLowercase ? 26 : 0) +
                     (useDigits ? 10 : 0) + (useSymbols ? symbols.length : 0);
    const entropy = pwd.length * (poolSize > 0 ? Math.log2(poolSize) : 0);
    strengthScore += Math.min(entropy / 2, 30);

    if (strengthScore >= 80) return { label: 'Strong', color: 'bg-green-600', score: strengthScore };
    if (strengthScore >= 60) return { label: 'Moderate', color: 'bg-yellow-600', score: strengthScore };
    return { label: 'Weak', color: 'bg-red-600', score: strengthScore };
  }, [useUppercase, useLowercase, useDigits, useSymbols, symbols]);

  const generatePassword = useCallback(() => {
    let charPool = '';
    if (useUppercase) charPool += uppercase;
    if (useLowercase) charPool += lowercase;
    if (useDigits) charPool += digits;
    if (useSymbols) charPool += symbols;

    if (excludeAmbiguous) {
      charPool = charPool.split('').filter(c => !ambiguous.includes(c)).join('');
    }

    if (!charPool) {
      setError('Please select at least one character type.');
      return;
    }

    if (length <= 0) {
      setError('Password length must be greater than 0.');
      return;
    }

    const randomValues = new Uint8Array(length);
    crypto.getRandomValues(randomValues);
    const charArray = charPool.split('');
    const generated = Array.from(randomValues)
      .map(val => charArray[val % charArray.length])
      .join('');

    setPassword(generated);
    setCopied(false);

    const newEntry = {
      password: generated,
      timestamp: new Date().toLocaleString(),
      strength: calculatePasswordStrength(generated)
    };
    setRecentPasswords(prev => [newEntry, ...prev].slice(0, 5));
    setPasswordStrength(newEntry.strength);
    setError('');
  }, [length, useUppercase, useLowercase, useDigits, useSymbols, excludeAmbiguous, calculatePasswordStrength]);

  const copyToClipboard = useCallback((text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.focus(); ta.select();
      try { document.execCommand('copy'); setCopied(true); setTimeout(() => setCopied(false), 2000); }
      catch (e) { console.error(e); }
      document.body.removeChild(ta);
    }
  }, []);

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="text-sm text-red-600 text-center">{error}</motion.p>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password Length</label>
          <input type="number" min="1" value={length}
                 onChange={e => setLength(Number(e.target.value))}
                 className="w-full px-4 py-3 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm"
                 placeholder="Enter length" aria-label="Password length"/>
        </div>

        <div className="flex flex-col gap-3">
          {[
            { label: 'Uppercase Letters', checked: useUppercase, setter: setUseUppercase },
            { label: 'Lowercase Letters', checked: useLowercase, setter: setUseLowercase },
            { label: 'Digits', checked: useDigits, setter: setUseDigits },
            { label: 'Symbols', checked: useSymbols, setter: setUseSymbols },
            { label: 'Exclude Ambiguous (e.g., l, 1, I, O, 0)', checked: excludeAmbiguous, setter: setExcludeAmbiguous }
          ].map(({ label, checked, setter }) => (
            <label key={label} className="flex items-center text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
              <input type="checkbox" checked={checked} onChange={() => setter(!checked)}
                     className="mr-3 h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                     aria-label={label}/>
              {label}
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <motion.button whileHover={{ scale: 1.05, rotate: 2 }} whileTap={{ scale: 0.95 }}
                       onClick={generatePassword}
                       className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 text-sm shadow-lg">
          Generate Password
        </motion.button>
      </div>

      {password && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-2">
          <div className="relative">
            <input type="text" value={password} readOnly
                   className="w-full px-4 py-3 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none text-sm pr-10 shadow-sm"
                   aria-label="Generated password"/>
            <motion.button whileHover={{ scale: 1.1, rotate: 5 }} onClick={() => copyToClipboard(password)}
                           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
                           title="Copy to clipboard" aria-label="Copy password">
              <ClipboardIcon className="h-5 w-5"/>
            </motion.button>
          </div>

          {passwordStrength && (
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                Strength: <span className={`${passwordStrength.color.replace('bg', 'text')}`}>{passwordStrength.label}</span>
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(passwordStrength.score, 100)}%` }}
                            transition={{ duration: 0.5 }} className={`${passwordStrength.color} h-2 rounded-full`}/>
              </div>
            </div>
          )}

          {copied && (
            <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-green-600">
              Copied!
            </motion.p>
          )}
        </motion.div>
      )}

      {recentPasswords.length > 0 && (
        <div className="mt-8">
          <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">Recent Passwords</h3>
          <div className="space-y-4">
            <AnimatePresence>
              {recentPasswords.map((entry, i) => (
                <motion.div key={i}
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                  <div>
                    <p className="text-sm font-mono text-gray-900 dark:text-gray-100">{entry.password}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{entry.timestamp}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Strength: <span className={`${entry.strength.color.replace('bg', 'text')}`}>{entry.strength.label}</span>
                    </p>
                  </div>
                  <motion.button whileHover={{ scale: 1.1, rotate: 5 }} onClick={() => copyToClipboard(entry.password)}
                                 className="text-gray-500 hover:text-blue-500" title="Copy" aria-label="Copy recent password">
                    <ClipboardIcon className="h-5 w-5"/>
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
});

// -------------------------------------------------
// ATM Simulator (memoized)
const ATMSimulator = memo(() => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [balance, setBalance] = useState({ savings: 1000.00, credit: 5000.00 });
  const [amount, setAmount] = useState('');
  const [action, setAction] = useState(null);
  const [transactions, setTransactions] = useState({ savings: [], credit: [] });
  const [localMessage, setLocalMessage] = useState('');
  const [isInvalidPin, setIsInvalidPin] = useState(false);

  const handlePinSubmit = useCallback(() => {
    if (pin === '1234') {
      setIsAuthenticated(true);
      setLocalMessage('');
      setPin('');
    } else {
      setLocalMessage('Invalid PIN. Try again.');
      setIsInvalidPin(true);
      setTimeout(() => setIsInvalidPin(false), 500);
      setPin('');
    }
  }, [pin]);

  const handleCardSelection = useCallback((card) => {
    setSelectedCard(card);
    setLocalMessage('');
    setAction(null);
    setAmount('');
  }, []);

  const handleATMAction = useCallback((act) => {
    setAction(act);
    setLocalMessage('');
    if (act === 'check') {
      setLocalMessage(`Current ${selectedCard} balance: ₹${balance[selectedCard].toFixed(2)}`);
    } else if (act === 'back') {
      setSelectedCard(null);
      setLocalMessage('');
    }
  }, [selectedCard, balance]);

  const handleTransaction = useCallback(() => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) { setLocalMessage('Enter a valid positive amount.'); return; }

    const ts = new Date().toLocaleString();
    if (action === 'deposit') {
      setBalance(p => ({ ...p, [selectedCard]: p[selectedCard] + val }));
      setTransactions(p => ({
        ...p,
        [selectedCard]: [{ type: 'Deposit', amount: val, timestamp: ts }, ...p[selectedCard]].slice(0, 5)
      }));
      setLocalMessage(`Deposited ₹${val.toFixed(2)}. New balance: ₹${(balance[selectedCard] + val).toFixed(2)}`);
    } else if (action === 'withdraw') {
      if (val > balance[selectedCard]) { setLocalMessage('Insufficient balance.'); return; }
      setBalance(p => ({ ...p, [selectedCard]: p[selectedCard] - val }));
      setTransactions(p => ({
        ...p,
        [selectedCard]: [{ type: 'Withdrawal', amount: val, timestamp: ts }, ...p[selectedCard]].slice(0, 5)
      }));
      setLocalMessage(`Withdrew ₹${val.toFixed(2)}. New balance: ₹${(balance[selectedCard] - val).toFixed(2)}`);
    }
    setAmount('');
  }, [action, amount, balance, selectedCard]);

  return (
    <div className="space-y-6">
      {/* PIN entry */}
      {!isAuthenticated ? (
        <div className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Demo PIN: 1234</p>
          <motion.div animate={isInvalidPin ? { x: [-5, 5, -5, 5, 0] } : { x: 0 }} transition={{ duration: 0.3 }}>
            <input type="password" value={pin} onChange={e => setPin(e.target.value)}
                   className={`w-full px-4 py-3 rounded-md bg-white dark:bg-gray-800 border ${isInvalidPin ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm`}
                   placeholder="Enter 4-digit PIN" maxLength="4" aria-label="Enter PIN"/>
          </motion.div>

          <AnimatePresence>
            {localMessage && (
              <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="text-sm text-red-600 text-center">{localMessage}</motion.p>
            )}
          </AnimatePresence>

          <div className="flex justify-center">
            <motion.button whileHover={{ scale: 1.05, rotate: -2 }} whileTap={{ scale: 0.95 }}
                           onClick={handlePinSubmit}
                           className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 text-sm shadow-lg">
              Submit PIN
            </motion.button>
          </div>
        </div>
      ) : !selectedCard ? (
        /* Card selection */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {['savings', 'credit'].map(c => (
            <motion.button key={c} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                           whileHover={{ scale: 1.05, rotate: 2 }} whileTap={{ scale: 0.95 }}
                           onClick={() => handleCardSelection(c)}
                           className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 text-sm shadow-lg">
              {c.charAt(0).toUpperCase() + c.slice(1)} Account
            </motion.button>
          ))}
        </div>
      ) : (
        /* ATM actions */
        <>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {['check', 'deposit', 'withdraw', 'back'].map(act => (
                <motion.button key={act}
                               whileHover={{ scale: 1.05, rotate: act === 'back' ? -2 : 2 }}
                               whileTap={{ scale: 0.95 }}
                               onClick={() => handleATMAction(act)}
                               className={`px-5 py-2.5 text-white font-medium rounded-md transition-all duration-300 text-sm shadow-lg ${
                                 act === 'back'
                                   ? 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700'
                                   : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
                               }`}>
                  {act === 'back' ? 'Back' : act.charAt(0).toUpperCase() + act.slice(1)}
                </motion.button>
              ))}
            </div>

            {(action === 'deposit' || action === 'withdraw') && (
              <motion.div key="transaction-input" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {action.charAt(0).toUpperCase() + action.slice(1)} Amount (₹)
                </label>
                <div className="flex gap-3">
                  <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
                         className="flex-1 px-4 py-3 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm"
                         placeholder="Enter amount" aria-label={`${action} amount`}/>
                  <motion.button whileHover={{ scale: 1.05, rotate: 2 }} whileTap={{ scale: 0.95 }}
                                 onClick={handleTransaction}
                                 className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 text-sm shadow-lg">
                    Submit
                  </motion.button>
                </div>
              </motion.div>
            )}

            <AnimatePresence>
              {localMessage && (
                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                          className={`text-sm text-center ${localMessage.includes('Invalid') || localMessage.includes('Insufficient') ? 'text-red-600' : 'text-green-600'}`}>
                  {localMessage}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {transactions[selectedCard].length > 0 && (
            <div className="mt-8">
              <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">Recent Transactions</h3>
              <div className="space-y-4">
                <AnimatePresence>
                  {transactions[selectedCard].map((tx, i) => (
                    <motion.div key={i}
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                      <p className="text-sm text-gray-900 dark:text-gray-100">{tx.type}: ₹{tx.amount.toFixed(2)}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{tx.timestamp}</p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
});

// -------------------------------------------------
// Modal for code view
const ProjectModal = ({ project, isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={onClose}
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                  role="dialog" aria-labelledby="modal-title" aria-modal="true">
        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
                    onClick={e => e.stopPropagation()}
                    className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          <h2 id="modal-title" className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {project.title}
          </h2>
          <div className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 rounded-md mb-4 shadow-inner">
            <pre className="text-xs whitespace-pre-wrap break-words text-gray-800 dark:text-gray-200">
              <code>{project.code}</code>
            </pre>
          </div>
          <div className="flex justify-end">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onClose}
                           className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-md hover:from-gray-600 hover:to-gray-700 text-sm shadow-md"
                           aria-label="Close modal">
              Close
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// -------------------------------------------------
// Main Portfolio component
const Portfolio = () => {
  const [filter, setFilter] = useState('all');
  const [modalProject, setModalProject] = useState(null);

  const filteredProjects = PROJECTS_DATA.filter(p => filter === 'all' || p.id === filter);

  return (
    <section id="projects"
             className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 pt-24 transition-colors duration-300"
             style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.6, ease: 'easeOut' }}
                   className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          My Projects
        </motion.h1>

        {/* Professional note */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-center mb-12 max-w-3xl mx-auto">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            These are my foundational projects that demonstrate core programming concepts and interactive user experiences.
            <span className="block mt-2 font-medium text-blue-600 dark:text-blue-400">
              More advanced and professional-grade projects are in active development — stay tuned!
            </span>
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden">
            {['all', 'password', 'atm'].map((f, i) => (
              <motion.button key={f} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                             onClick={() => setFilter(f)}
                             className={`px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                               filter === f
                                 ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                                 : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                             } ${i === 0 ? 'rounded-l-md' : i === 2 ? 'rounded-r-md' : ''}`}>
                {f === 'all' ? 'All' : f === 'password' ? 'Password Generator' : 'ATM Simulator'}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((proj, idx) => (
              <motion.div key={proj.id}
                          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }}
                          transition={{ duration: 0.5, delay: idx * 0.2, ease: 'easeOut' }}
                          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{proj.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{proj.description}</p>

                {proj.id === 'password' ? <PasswordGenerator/> : <ATMSimulator/>}

                <div className="mt-6 flex justify-center">
                  <motion.button whileHover={{ scale: 1.05, rotate: 3 }} whileTap={{ scale: 0.95 }}
                                 onClick={() => setModalProject(proj)}
                                 className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 text-sm shadow-md">
                    View Code
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <ProjectModal project={modalProject} isOpen={!!modalProject} onClose={() => setModalProject(null)}/>
    </section>
  );
};

export default Portfolio;