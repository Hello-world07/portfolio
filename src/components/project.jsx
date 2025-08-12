import React, { useState, useCallback, memo } from 'react';
import { ClipboardIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const PasswordGenerator = memo(({ setMessage }) => {
  const [length, setLength] = useState(12);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useDigits, setUseDigits] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [recentPasswords, setRecentPasswords] = useState([]);

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
                    (useDigits ? 10 : 0) + (useSymbols ? 32 : 0);
    const entropy = pwd.length * (poolSize > 0 ? Math.log2(poolSize) : 0);
    strengthScore += Math.min(entropy / 2, 30);

    if (strengthScore >= 80) return { label: 'Strong', color: 'text-green-500', score: strengthScore };
    if (strengthScore >= 60) return { label: 'Moderate', color: 'text-yellow-500', score: strengthScore };
    return { label: 'Weak', color: 'text-red-500', score: strengthScore };
  }, [useUppercase, useLowercase, useDigits, useSymbols]);

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
      setMessage('❌ Please select at least one character type.');
      return;
    }

    if (length <= 0) {
      setMessage('❌ Password length must be greater than 0.');
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
    
    const newPasswordEntry = {
      password: generated,
      timestamp: new Date().toLocaleString(),
      strength: calculatePasswordStrength(generated)
    };
    setRecentPasswords(prev => [newPasswordEntry, ...prev].slice(0, 5));
    setMessage('');
  }, [length, useUppercase, useLowercase, useDigits, useSymbols, excludeAmbiguous]);

  const copyToClipboard = useCallback((text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-200 mb-1">Password Length</label>
          <input
            type="number"
            min="1"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            placeholder="Enter length"
            aria-label="Password length"
          />
        </div>
        <div className="flex flex-col gap-2">
          {[
            { label: 'Uppercase Letters', checked: useUppercase, setter: setUseUppercase },
            { label: 'Lowercase Letters', checked: useLowercase, setter: setUseLowercase },
            { label: 'Digits', checked: useDigits, setter: setUseDigits },
            { label: 'Symbols', checked: useSymbols, setter: setUseSymbols },
            { label: 'Exclude Ambiguous (e.g., l, 1, I, O, 0)', checked: excludeAmbiguous, setter: setExcludeAmbiguous }
          ].map(({ label, checked, setter }) => (
            <label key={label} className="flex items-center text-sm text-gray-700 dark:text-gray-200">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => setter(!checked)}
                className="mr-2 h-4 w-4 text-indigo-500 focus:ring-indigo-500"
                aria-label={label}
              />
              {label}
            </label>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={generatePassword}
          className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-lg shadow-glow hover:from-indigo-600 hover:to-pink-600 transition-all duration-300 text-sm"
        >
          Generate Password
        </motion.button>
      </div>
      {password && (
        <div className="text-center">
          <div className="relative">
            <input
              type="text"
              value={password}
              readOnly
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none text-sm pr-10"
              aria-label="Generated password"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => copyToClipboard(password)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400"
              title="Copy to clipboard"
              aria-label="Copy password to clipboard"
            >
              <ClipboardIcon className="h-5 w-5" />
            </motion.button>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-700 dark:text-gray-200">
              Password Strength: <span className={passwordStrength?.color}>{passwordStrength?.label}</span>
            </p>
          </div>
          {copied && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-sm text-green-500 dark:text-green-400"
            >
              Copied to clipboard!
            </motion.p>
          )}
        </div>
      )}
      {recentPasswords.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Passwords</h3>
          <div className="space-y-3">
            {recentPasswords.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-3 rounded-lg"
              >
                <div>
                  <p className="text-sm text-gray-800 dark:text-gray-200">{entry.password}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{entry.timestamp}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Strength: <span className={entry.strength.color}>{entry.strength.label}</span>
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => copyToClipboard(entry.password)}
                  className="text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400"
                  title="Copy to clipboard"
                  aria-label="Copy recent password to clipboard"
                >
                  <ClipboardIcon className="h-5 w-5" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

const ATMSimulator = memo(({ setMessage }) => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [balance, setBalance] = useState({ savings: 1000.00, credit: 5000.00 });
  const [amount, setAmount] = useState('');
  const [action, setAction] = useState(null);
  const [transactions, setTransactions] = useState({ savings: [], credit: [] });

  const handlePinSubmit = useCallback(() => {
    if (pin === '1234') {
      setIsAuthenticated(true);
      setMessage('');
      setPin('');
    } else {
      setMessage('Invalid PIN! Please try again.');
      setPin('');
    }
  }, [pin, setMessage]);

  const handleCardSelection = useCallback((cardType) => {
    setSelectedCard(cardType);
    setMessage('');
    setAction(null);
    setAmount('');
  }, []);

  const handleATMAction = useCallback((selectedAction) => {
    setAction(selectedAction);
    setMessage('');
    if (selectedAction === 'check') {
      setMessage(`Your current ${selectedCard} balance is: ₹${balance[selectedCard].toFixed(2)}`);
    }
  }, [selectedCard, balance, setMessage]);

  const handleTransaction = useCallback(() => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setMessage('Invalid amount! Please enter a positive number.');
      return;
    }

    const timestamp = new Date().toLocaleString();
    if (action === 'deposit') {
      setBalance(prev => ({
        ...prev,
        [selectedCard]: prev[selectedCard] + parsedAmount
      }));
      setTransactions(prev => ({
        ...prev,
        [selectedCard]: [{
          type: 'Deposit',
          amount: parsedAmount,
          timestamp
        }, ...prev[selectedCard]].slice(0, 5)
      }));
      setMessage(`₹${parsedAmount.toFixed(2)} deposited successfully. New balance: ₹${(balance[selectedCard] + parsedAmount).toFixed(2)}`);
    } else if (action === 'withdraw') {
      if (parsedAmount > balance[selectedCard]) {
        setMessage('Insufficient balance!');
        return;
      }
      setBalance(prev => ({
        ...prev,
        [selectedCard]: prev[selectedCard] - parsedAmount
      }));
      setTransactions(prev => ({
        ...prev,
        [selectedCard]: [{
          type: 'Withdrawal',
          amount: parsedAmount,
          timestamp
        }, ...prev[selectedCard]].slice(0, 5)
      }));
      setMessage(`₹${parsedAmount.toFixed(2)} withdrawn successfully. New balance: ₹${(balance[selectedCard] - parsedAmount).toFixed(2)}`);
    }
    setAmount('');
  }, [action, amount, balance, selectedCard]);

  return (
    <div className="space-y-6">
      {!isAuthenticated ? (
        <div className="flex flex-col gap-4">
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            placeholder="Enter 4-digit PIN"
            maxLength="4"
            aria-label="Enter 4-digit PIN"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePinSubmit}
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-lg shadow-glow hover:from-indigo-600 hover:to-pink-600 transition-all duration-300 text-sm"
          >
            Submit PIN
          </motion.button>
        </div>
      ) : !selectedCard ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {['savings', 'credit'].map((cardType) => (
            <motion.button
              key={cardType}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCardSelection(cardType)}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-lg shadow-glow hover:from-indigo-600 hover:to-pink-600 transition-all duration-300 text-sm"
            >
              {cardType.charAt(0).toUpperCase() + cardType.slice(1)} Account
            </motion.button>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {['check', 'deposit', 'withdraw', 'back'].map((act) => (
                <motion.button
                  key={act}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => act === 'back' ? setSelectedCard(null) : handleATMAction(act)}
                  className={`px-5 py-2.5 text-white font-semibold rounded-lg shadow-glow transition-all duration-300 text-sm ${
                    act === 'back' ? 'bg-gray-500 hover:bg-gray-600' : 'bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600'
                  }`}
                >
                  {act === 'back' ? 'Back to Card Selection' : `${act.charAt(0).toUpperCase() + act.slice(1)}`}
                </motion.button>
              ))}
            </div>
            {(action === 'deposit' || action === 'withdraw') && (
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-200 mb-1">
                  {action === 'deposit' ? 'Deposit Amount' : 'Withdraw Amount'} (₹)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    placeholder="Enter amount"
                    aria-label={`${action} amount`}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleTransaction}
                    className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-lg shadow-glow hover:from-indigo-600 hover:to-pink-600 transition-all duration-300 text-sm"
                  >
                    Submit
                  </motion.button>
                </div>
              </div>
            )}
          </div>
          {transactions[selectedCard].length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Transactions ({selectedCard.charAt(0).toUpperCase() + selectedCard.slice(1)})
              </h3>
              <div className="space-y-3">
                {transactions[selectedCard].map((tx, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-3 rounded-lg"
                  >
                    <div>
                      <p className="text-sm text-gray-800 dark:text-gray-200">{tx.type}: ₹{tx.amount.toFixed(2)}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{tx.timestamp}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
});

const ProjectModal = ({ project, isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full m-4 backdrop-blur-md bg-opacity-80 max-h-[80vh] overflow-y-auto"
        >
          <h2 id="modal-title" className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {project.title}
          </h2>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-xs max-h-[60vh] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-400 dark:scrollbar-track-gray-700">
            <code>{project.code}</code>
          </pre>
          <div className="mt-4 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm"
              aria-label="Close modal"
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [message, setMessage] = useState('');
  const [modalProject, setModalProject] = useState(null);

  const projects = [
    {
      id: 'password',
      title: '🚀 Password Generator',
      description: 'A secure tool to generate customizable passwords with strength indicators and recent password history.',
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
    print("\\n🔐 Welcome to the Python Password Generator 🔐\\n")

    try:
        length = int(input("Enter desired password length: "))
        if length <= 0:
            print("❌ Password length must be greater than 0.")
            return
    except ValueError:
        print("❌ Invalid input. Please enter a number.")
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
        print("❌ No character types selected. Cannot generate password.")
        return

    password = [secrets.choice(char_pool) for _ in range(length)]
    random.shuffle(password)

    print("\\n✅ Generated Secure Password:")
    print(''.join(password))
    print("\\n✨ Tip: Use a password manager to store your secure passwords.")

if __name__ == "__main__":
    generate_password()`
    },
    {
      id: 'atm',
      title: '🏧 ATM Simulator',
      description: 'An interactive ATM interface with PIN authentication, support for savings and credit accounts, and transaction history.',
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

  return (
    <section
      id="projects"
      className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-12 pt-24 transition-colors duration-300"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center"
        >
          🚀 My Projects
        </motion.h1>
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-lg shadow-glow bg-gray-100 dark:bg-gray-700 p-1">
            {['all', 'password', 'atm'].map((f) => (
              <motion.button
                key={f}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  filter === f
                    ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {f === 'all' ? 'All' : f === 'password' ? 'Password Generator' : 'ATM Simulator'}
              </motion.button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects
            .filter(project => filter === 'all' || project.id === filter)
            .map(project => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{project.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-200 mb-4 text-justify">{project.description}</p>
                {project.id === 'password' ? (
                  <PasswordGenerator setMessage={setMessage} />
                ) : (
                  <ATMSimulator setMessage={setMessage} />
                )}
                <div className="mt-6 flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setModalProject(project)}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-lg shadow-glow hover:from-indigo-600 hover:to-pink-600 transition-all duration-300 text-sm"
                  >
                    View Code
                  </motion.button>
                </div>
              </motion.div>
            ))}
        </div>
        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-center text-sm text-red-500 dark:text-red-400"
          >
            {message}
          </motion.p>
        )}
      </div>
      <ProjectModal
        project={modalProject}
        isOpen={!!modalProject}
        onClose={() => setModalProject(null)}
      />
    </section>
  );
};

export default Projects;