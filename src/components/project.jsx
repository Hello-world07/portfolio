import React, { useState } from 'react';
import { ClipboardIcon } from '@heroicons/react/24/outline';

const Projects = () => {
  // State for password generator
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
  const [passwordError, setPasswordError] = useState('');

  // State for age calculator
  const [birthDate1, setBirthDate1] = useState('');
  const [age1, setAge1] = useState(null);
  const [compare, setCompare] = useState('');
  const [birthDate2, setBirthDate2] = useState('');
  const [ageDifference, setAgeDifference] = useState(null);
  const [ageError, setAgeError] = useState('');

  // State for code snippet visibility
  const [showPasswordCode, setShowPasswordCode] = useState(false);
  const [showAgeCode, setShowAgeCode] = useState(false);

  // State for card background colors
  const [activeCard, setActiveCard] = useState(null);

  // Character sets for password generator
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const ambiguous = 'l1I0O';

  // Calculate password strength
  const calculatePasswordStrength = (pwd) => {
    let strengthScore = 0;
    const charTypes = [
      pwd.match(/[A-Z]/),
      pwd.match(/[a-z]/),
      pwd.match(/[0-9]/),
      pwd.match(/[^A-Za-z0-9]/),
    ].filter(Boolean).length;

    if (pwd.length >= 16) strengthScore += 40;
    else if (pwd.length >= 12) strengthScore += 30;
    else if (pwd.length >= 8) strengthScore += 20;
    else strengthScore += 10;

    strengthScore += charTypes * 15;

    const poolSize =
      (useUppercase ? 26 : 0) +
      (useLowercase ? 26 : 0) +
      (useDigits ? 10 : 0) +
      (useSymbols ? 32 : 0);
    const entropy = pwd.length * (poolSize > 0 ? Math.log2(poolSize) : 0);
    strengthScore += Math.min(entropy / 2, 30);

    if (strengthScore >= 80)
      return { label: 'Strong', color: 'text-green-500', score: strengthScore };
    if (strengthScore >= 60)
      return { label: 'Moderate', color: 'text-yellow-500', score: strengthScore };
    return { label: 'Weak', color: 'text-red-500', score: strengthScore };
  };

  // Generate password function
  const generatePassword = () => {
    let charPool = '';
    if (useUppercase) charPool += uppercase;
    if (useLowercase) charPool += lowercase;
    if (useDigits) charPool += digits;
    if (useSymbols) charPool += symbols;

    if (excludeAmbiguous) {
      charPool = charPool.split('').filter((c) => !ambiguous.includes(c)).join('');
    }

    if (!charPool) {
      setPasswordError('Please select at least one character type.');
      return;
    }

    if (length <= 0) {
      setPasswordError('Password length must be greater than 0.');
      return;
    }

    const randomValues = new Uint8Array(length);
    crypto.getRandomValues(randomValues);
    const charArray = charPool.split('');
    const generated = Array.from(randomValues)
      .map((val) => charArray[val % charArray.length])
      .join('');

    setPassword(generated);
    setCopied(false);

    const newPasswordEntry = {
      password: generated,
      timestamp: new Date().toLocaleString(),
      strength: calculatePasswordStrength(generated),
    };
    setRecentPasswords((prev) => [newPasswordEntry, ...prev].slice(0, 5));
    setPasswordStrength(newPasswordEntry.strength);
    setPasswordError('');
  };

  // Copy to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Calculate age
  const calculateAge = (birthDate) => {
    try {
      const [month, day, year] = birthDate.split('/').map(Number);
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
      const currentDay = currentDate.getDate();

      if (!birthDate) {
        setAgeError('Please enter a birth date.');
        return null;
      }

      if (year < 1900 || year > currentYear) {
        setAgeError(`Invalid year. Please enter a year between 1900 and ${currentYear}.`);
        return null;
      }
      if (month < 1 || month > 12) {
        setAgeError('Invalid month. Please enter a month between 1 and 12.');
        return null;
      }
      if (day < 1 || day > 31) {
        setAgeError('Invalid day. Please enter a day between 1 and 31.');
        return null;
      }

      let age = currentYear - year;
      if (currentMonth < month || (currentMonth === month && currentDay < day)) {
        age -= 1;
      }
      return age;
    } catch {
      setAgeError('Invalid input. Please enter date in MM/DD/YYYY format.');
      return null;
    }
  };

  const handleCalculateAge = () => {
    setAgeError('');
    setCompare('');
    setBirthDate2('');
    setAgeDifference(null);
    const age = calculateAge(birthDate1);
    if (age !== null) {
      setAge1(age);
    }
  };

  const handleCompare = () => {
    if (compare.toLowerCase() === 'yes') {
      setAgeError('');
      setBirthDate2('');
      setAgeDifference(null);
    } else {
      setAgeError('Please enter "yes" to compare with another birth date.');
    }
  };

  const handleCompareAges = () => {
    setAgeError('');
    const age2 = calculateAge(birthDate2);
    if (age2 !== null && age1 !== null) {
      const [month1, day1, year1] = birthDate1.split('/').map(Number);
      const [month2, day2, year2] = birthDate2.split('/').map(Number);

      if (
        year1 < year2 ||
        (year1 === year2 && month1 < month2) ||
        (year1 === year2 && month1 === month2 && day1 < day2)
      ) {
        setAgeDifference({ difference: age1 - age2, older: 'first' });
      } else if (
        year2 < year1 ||
        (year2 === year1 && month2 < month1) ||
        (year2 === year1 && month2 === month1 && day2 < day1)
      ) {
        setAgeDifference({ difference: age2 - age1, older: 'second' });
      } else {
        setAgeDifference({ difference: 0, older: 'same' });
      }
    }
  };

  // Handle card click for dynamic background
  const handleCardClick = (cardId) => {
    setActiveCard(activeCard === cardId ? null : cardId);
  };

  return (
    <section
      id="projects"
      className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-8 sm:py-12 md:py-16 transition-colors duration-500 pt-24"
    >
      <div className="w-full max-w-[95%] sm:max-w-4xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 sm:mb-10 md:mb-12 text-center tracking-tight border-b-4 border-indigo-600 dark:border-indigo-500 pb-3 animate-fade-in text-justify">
          Interactive Projects Showcase
        </h1>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {/* Password Generator Card */}
          <div
            className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 transform hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden ${
              activeCard === 'password' ? 'bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900' : ''
            }`}
            onClick={() => handleCardClick('password')}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            <h2 className="relative text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center text-justify">
              🔐 Password Generator
            </h2>
            <p className="relative text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-justify">
              Create strong, unique passwords with customizable options for length, character types, and more. Built with secure cryptographic randomization.
            </p>
            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 text-justify">
                  Password Length
                </label>
                <input
                  type="number"
                  min="1"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm transition-all duration-300 border border-gray-200 dark:border-gray-600"
                  placeholder="Enter length"
                />
              </div>
              <div className="flex flex-col gap-2 sm:gap-3">
                {[
                  { label: 'Uppercase Letters', checked: useUppercase, setter: setUseUppercase },
                  { label: 'Lowercase Letters', checked: useLowercase, setter: setUseLowercase },
                  { label: 'Digits', checked: useDigits, setter: setUseDigits },
                  { label: 'Symbols', checked: useSymbols, setter: setUseSymbols },
                  { label: 'Exclude Ambiguous', checked: excludeAmbiguous, setter: setExcludeAmbiguous },
                ].map((option, index) => (
                  <label key={index} className="flex items-center text-xs sm:text-sm text-gray-700 dark:text-gray-200 text-justify">
                    <input
                      type="checkbox"
                      checked={option.checked}
                      onChange={() => option.setter(!option.checked)}
                      className="mr-2 h-3 w-3 text-indigo-600 focus:ring-indigo-500 rounded border-gray-300 dark:border-gray-600"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
            <div className="relative mt-6 flex justify-center">
              <button
                onClick={generatePassword}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 text-xs sm:text-sm transform hover:scale-105"
              >
                Generate Password
              </button>
            </div>
            {password && (
              <div className="relative mt-6 text-center">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={password}
                    readOnly
                    className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none text-xs sm:text-sm pr-10 border border-gray-200 dark:border-gray-600"
                  />
                  <button
                    onClick={() => copyToClipboard(password)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                    title="Copy to clipboard"
                  >
                    <ClipboardIcon className="h-4 w-4" />
                  </button>
                </div>
                {passwordStrength && (
                  <div className="mt-2">
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 text-justify">
                      Strength: <span className={`${passwordStrength.color} font-semibold`}>{passwordStrength.label}</span>
                    </p>
                  </div>
                )}
                {copied && (
                  <p className="mt-2 text-xs text-green-500 dark:text-green-400 animate-pulse text-justify">Copied to clipboard!</p>
                )}
              </div>
            )}
            {passwordError && (
              <p className="mt-3 text-xs text-red-500 dark:text-red-400 text-center text-justify">{passwordError}</p>
            )}
          </div>

          {/* Age Calculator Card */}
          <div
            className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 transform hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden ${
              activeCard === 'age' ? 'bg-gradient-to-br from-blue-100 to-teal-100 dark:from-blue-900 dark:to-teal-900' : ''
            }`}
            onClick={() => handleCardClick('age')}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-teal-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            <h2 className="relative text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center text-justify">
              🎂 Age Calculator
            </h2>
            <p className="relative text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-justify">
              Easily calculate ages or compare birth dates with precise results. Supports MM/DD/YYYY format for quick and accurate age calculations.
            </p>
            <div className="relative grid grid-cols-1 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 text-justify">
                  Birth Date (MM/DD/YYYY)
                </label>
                <input
                  type="text"
                  value={birthDate1}
                  onChange={(e) => setBirthDate1(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm transition-all duration-300 border border-gray-200 dark:border-gray-600"
                  placeholder="e.g., 09/10/2003"
                />
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleCalculateAge}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 text-xs sm:text-sm transform hover:scale-105"
                >
                  Calculate Age
                </button>
              </div>
              {age1 !== null && (
                <div className="mt-4 text-center">
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 font-medium text-justify">Age: {age1} years</p>
                  <div className="mt-4">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 text-justify">
                      Compare with another birth date? (Enter 'yes')
                    </label>
                    <input
                      type="text"
                      value={compare}
                      onChange={(e) => setCompare(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm border border-gray-200 dark:border-gray-600"
                      placeholder="Enter 'yes' to compare"
                    />
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={handleCompare}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 text-xs sm:text-sm transform hover:scale-105"
                      >
                        Proceed to Compare
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {compare.toLowerCase() === 'yes' && (
                <div className="mt-4">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 text-justify">
                    Second Birth Date (MM/DD/YYYY)
                  </label>
                  <input
                    type="text"
                    value={birthDate2}
                    onChange={(e) => setBirthDate2(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm border border-gray-200 dark:border-gray-600"
                    placeholder="e.g., 06/15/1998"
                  />
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={handleCompareAges}
                      className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 text-xs sm:text-sm transform hover:scale-105"
                    >
                      Compare Ages
                    </button>
                  </div>
                </div>
              )}
              {ageDifference && (
                <div className="mt-4 text-center">
                  {ageDifference.older === 'first' && (
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 font-medium text-justify">
                      The first person is {ageDifference.difference} years older.
                    </p>
                  )}
                  {ageDifference.older === 'second' && (
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 font-medium text-justify">
                      The second person is {ageDifference.difference} years older.
                    </p>
                  )}
                  {ageDifference.older === 'same' && (
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 font-medium text-justify">
                      Both persons are the same age.
                    </p>
                  )}
                </div>
              )}
              {ageError && (
                <p className="mt-3 text-xs text-red-500 dark:text-red-400 text-center text-justify">{ageError}</p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Passwords */}
        {recentPasswords.length > 0 && (
          <div className="mt-8 sm:mt-10 lg:mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 text-justify">
              Recent Passwords
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {recentPasswords.map((entry, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <div>
                    <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-100 font-medium text-justify">{entry.password}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-justify">{entry.timestamp}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-justify">
                      Strength: <span className={`${entry.strength.color} font-semibold`}>{entry.strength.label}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(entry.password)}
                    className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                    title="Copy to clipboard"
                  >
                    <ClipboardIcon className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Python Code Snippets */}
        <div className="mt-8 sm:mt-10 lg:mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 text-justify">
            Source Code
          </h2>
          <div className="space-y-6">
            <div>
              <button
                onClick={() => setShowPasswordCode(!showPasswordCode)}
                className="w-full text-left text-sm sm:text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-2 flex justify-between items-center hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 text-justify"
              >
                <span>Password Generator (Python)</span>
                <span>{showPasswordCode ? '▲' : '▼'}</span>
              </button>
              {showPasswordCode && (
                <pre className="bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 rounded-lg overflow-x-auto text-xs font-mono">
                  <code>
                    {`"""
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
    generate_password()
`}
                  </code>
                </pre>
              )}
            </div>
            <div>
              <button
                onClick={() => setShowAgeCode(!showAgeCode)}
                className="w-full text-left text-sm sm:text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-2 flex justify-between items-center hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 text-justify"
              >
                <span>Age Calculator (Python)</span>
                <span>{showAgeCode ? '▲' : '▼'}</span>
              </button>
              {showAgeCode && (
                <pre className="bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 rounded-lg overflow-x-auto text-xs font-mono">
                  <code>
                    {`"""
Age Calculator - Python Project
-----------------------------------
This program calculates a person's age based on their birth date and optionally
compares it with another person's birth date to determine the age difference.

Modules Used:
- datetime: To get the current date and perform date calculations.
"""

from datetime import datetime

def calculate_and_compare_ages():
    try:
        birth_date1 = input("Enter first person's birth date (MM/DD/YYYY, e.g., 09/10/2003): ")
        birth_month1, birth_day1, birth_year1 = map(int, birth_date1.split('/'))
        
        current_year = datetime.now().year
        if birth_year1 < 1900 or birth_year1 > current_year:
            print(f"Invalid year. Please enter a year between 1900 and {current_year}.")
            return
        if birth_month1 < 1 or birth_month1 > 12:
            print("Invalid month. Please enter a month between 1 and 12.")
            return
        if birth_day1 < 1 or birth_day1 > 31:
            print("Invalid day. Please enter a day between 1 and 31.")
            return
        
        current_date = datetime.now()
        current_year = current_date.year
        current_month = current_date.month
        current_day = current_date.day
        
        age1 = current_year - birth_year1
        if current_month < birth_month1 or (current_month == birth_month1 and current_day < birth_day1):
            age1 -= 1
        print(f"The first person's age is {age1} years")
        
        compare = input("Do you want to compare with another person's birth date? (Enter 'yes' to proceed): ").lower()
        
        if compare == 'yes':
            birth_date2 = input("Enter second person's birth date (MM/DD/YYYY, e.g., 06/15/1998): ")
            birth_month2, birth_day2, birth_year2 = map(int, birth_date2.split('/'))
            
            if birth_year2 < 1900 or birth_year2 > current_year:
                print(f"Invalid year. Please enter a year between 1900 and {current_year}.")
                return
            if birth_month2 < 1 or birth_month2 > 12:
                print("Invalid month. Please enter a month between 1 and 12.")
                return
            if birth_day2 < 1 or birth_day2 > 31:
                print("Invalid day. Please enter a day between 1 and 31.")
                return
            
            age2 = current_year - birth_year2
            if current_month < birth_month2 or (current_month == birth_month2 and current_day < birth_day2):
                age2 -= 1
            
            if birth_year1 < birth_year2 or \
               (birth_year1 == birth_year2 and birth_month1 < birth_month2) or \
               (birth_year1 == birth_year2 and birth_month1 == birth_month2 and birth_day1 < birth_day2):
                age_difference = age1 - age2
                print(f"The first person is {age_difference} years older than the second person.")
            elif birth_year2 < birth_year1 or \
                 (birth_year2 == birth_year1 and birth_month2 < birth_month1) or \
                 (birth_year2 == birth_year1 and birth_month2 == birth_month1 and birth_day2 < birth_day1):
                age_difference = age2 - age1
                print(f"The second person is {age_difference} years older than the first person.")
            else:
                print("Both persons are the same age.")
        
        else:
            print("No comparison requested. Program ended.")
    
    except ValueError:
        print("Invalid input. Please enter dates in MM/DD/YYYY format using numbers (e.g., 09/10/2003).")

if __name__ == "__main__":
    calculate_and_compare_ages()
`}
                  </code>
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;