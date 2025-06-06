import React, { useState, useEffect } from 'react';
import { ClipboardIcon } from '@heroicons/react/24/outline';

const Projects = () => {
  // State for form inputs and generated password
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

  // Character sets
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
      pwd.match(/[^A-Za-z0-9]/)
    ].filter(Boolean).length;

    // Length score
    if (pwd.length >= 16) strengthScore += 40;
    else if (pwd.length >= 12) strengthScore += 30;
    else if (pwd.length >= 8) strengthScore += 20;
    else strengthScore += 10;

    // Character types score
    strengthScore += charTypes * 15;

    // Calculate entropy (simplified)
    const poolSize = (useUppercase ? 26 : 0) + (useLowercase ? 26 : 0) + 
                    (useDigits ? 10 : 0) + (useSymbols ? 32 : 0);
    const entropy = pwd.length * (poolSize > 0 ? Math.log2(poolSize) : 0);
    strengthScore += Math.min(entropy / 2, 30);

    if (strengthScore >= 80) return { label: 'Strong', color: 'text-green-500', score: strengthScore };
    if (strengthScore >= 60) return { label: 'Moderate', color: 'text-yellow-500', score: strengthScore };
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
      charPool = charPool.split('').filter(c => !ambiguous.includes(c)).join('');
    }

    if (!charPool) {
      alert('❌ Please select at least one character type.');
      return;
    }

    if (length <= 0) {
      alert('❌ Password length must be greater than 0.');
      return;
    }

    // Secure random generation using crypto
    const randomValues = new Uint8Array(length);
    crypto.getRandomValues(randomValues);
    const charArray = charPool.split('');
    const generated = Array.from(randomValues)
      .map(val => charArray[val % charArray.length])
      .join('');

    setPassword(generated);
    setCopied(false);
    
    // Update recent passwords (limit to 5)
    const newPasswordEntry = {
      password: generated,
      timestamp: new Date().toLocaleString(),
      strength: calculatePasswordStrength(generated)
    };
    setRecentPasswords(prev => [newPasswordEntry, ...prev].slice(0, 5));
    setPasswordStrength(newPasswordEntry.strength);
  };

  // Copy to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section
      id="projects"
      className="min-h-screen bg-gray-100 dark:bg-custom-dark flex items-center justify-center py-6 sm:py-8 md:py-12 transition-colors duration-300 animate-gradient-xy-slow pt-24"
    >
      <div className="w-full max-w-[90%] xs:max-w-[85%] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-6 heading-underline animate-heading pt-8">
          🚀 Password Generator Project
        </h1>
        <div className="mb-4 sm:mb-6 md:mb-8 text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-200 animate-fade-in text-justify">
          <p className="mb-3 sm:mb-4">
            Welcome to my <span className="box-highlight">Password Generator</span> project! This tool allows you to create secure, customizable passwords with options for uppercase, lowercase, digits, symbols, and exclusion of ambiguous characters. Built with security in mind, it uses cryptographic randomization to ensure robust passwords.
          </p>
          <p className="mb-3 sm:mb-4">
            Try it out below, and check the strength of your generated passwords. Recent passwords are saved for your convenience.
          </p>
        </div>

        {/* Password Generator Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 xs:p-6 sm:p-8 mb-6 sm:mb-8 glow-effect">
          <h2 className="text-lg xs:text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
            Generate Your Password
          </h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 sm:gap-6">
            {/* Length Input */}
            <div>
              <label className="block text-xs xs:text-sm sm:text-base text-gray-700 dark:text-gray-200 mb-1">
                Password Length
              </label>
              <input
                type="number"
                min="1"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full px-3 xs:px-4 py-1.5 xs:py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs xs:text-sm sm:text-base"
                placeholder="Enter length"
              />
            </div>
            {/* Character Type Checkboxes */}
            <div className="flex flex-col gap-2">
              <label className="flex items-center text-xs xs:text-sm sm:text-base text-gray-700 dark:text-gray-200">
                <input
                  type="checkbox"
                  checked={useUppercase}
                  onChange={() => setUseUppercase(!useUppercase)}
                  className="mr-2 h-4 w-4 text-indigo-500 focus:ring-indigo-500"
                />
                Uppercase Letters
              </label>
              <label className="flex items-center text-xs xs:text-sm sm:text-base text-gray-700 dark:text-gray-200">
                <input
                  type="checkbox"
                  checked={useLowercase}
                  onChange={() => setUseLowercase(!useLowercase)}
                  className="mr-2 h-4 w-4 text-indigo-500 focus:ring-indigo-500"
                />
                Lowercase Letters
              </label>
              <label className="flex items-center text-xs xs:text-sm sm:text-base text-gray-700 dark:text-gray-200">
                <input
                  type="checkbox"
                  checked={useDigits}
                  onChange={() => setUseDigits(!useDigits)}
                  className="mr-2 h-4 w-4 text-indigo-500 focus:ring-indigo-500"
                />
                Digits
              </label>
              <label className="flex items-center text-xs xs:text-sm sm:text-base text-gray-700 dark:text-gray-200">
                <input
                  type="checkbox"
                  checked={useSymbols}
                  onChange={() => setUseSymbols(!useSymbols)}
                  className="mr-2 h-4 w-4 text-indigo-500 focus:ring-indigo-500"
                />
                Symbols
              </label>
              <label className="flex items-center text-xs xs:text-sm sm:text-base text-gray-700 dark:text-gray-200">
                <input
                  type="checkbox"
                  checked={excludeAmbiguous}
                  onChange={() => setExcludeAmbiguous(!excludeAmbiguous)}
                  className="mr-2 h-4 w-4 text-indigo-500 focus:ring-indigo-500"
                />
                Exclude Ambiguous (e.g., l, 1, I, O, 0)
              </label>
            </div>
          </div>
          {/* Generate Button */}
          <div className="mt-4 sm:mt-6 flex justify-center">
            <button
              onClick={generatePassword}
              className="px-3 xs:px-4 sm:px-5 py-1.5 xs:py-2 sm:py-2.5 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-lg glow-effect hover:from-indigo-600 hover:to-pink-600 transition-all duration-300 text-xs xs:text-sm sm:text-base"
            >
              Generate Password
            </button>
          </div>
          {/* Password Output */}
          {password && (
            <div className="mt-4 sm:mt-6 text-center">
              <div className="relative">
                <input
                  type="text"
                  value={password}
                  readOnly
                  className="w-full px-3 xs:px-4 py-1.5 xs:py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none text-xs xs:text-sm sm:text-base pr-10"
                />
                <button
                  onClick={() => copyToClipboard(password)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400"
                  title="Copy to clipboard"
                >
                  <ClipboardIcon className="h-5 w-5" />
                </button>
              </div>
              {passwordStrength && (
                <div className="mt-2">
                  <p className="text-xs xs:text-sm text-gray-700 dark:text-gray-200">
                    Password Strength: <span className={`${passwordStrength.color}`}>{passwordStrength.label}</span>
                  </p>
                </div>
              )}
              {copied && (
                <p className="mt-2 text-xs xs:text-sm text-green-500 dark:text-green-400">
                  Copied to clipboard!
                </p>
              )}
            </div>
          )}
        </div>

        {/* Recent Passwords */}
        {recentPasswords.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 xs:p-6 sm:p-8 mb-6 sm:mb-8 glow-effect">
            <h2 className="text-lg xs:text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Recent Passwords
            </h2>
            <div className="space-y-3">
              {recentPasswords.map((entry, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-2 xs:p-3 rounded-lg">
                  <div>
                    <p className="text-xs xs:text-sm sm:text-base text-gray-800 dark:text-gray-200">{entry.password}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{entry.timestamp}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Strength: <span className={`${entry.strength.color}`}>{entry.strength.label}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(entry.password)}
                    className="text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400"
                    title="Copy to clipboard"
                  >
                    <ClipboardIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Python Code Snippet */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 xs:p-6 sm:p-8 glow-effect">
          <h2 className="text-lg xs:text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
            Original Python Code
          </h2>
          <pre className="bg-gray-100 dark:bg-gray-900 p-3 xs:p-4 rounded-lg overflow-x-auto text-xs xs:text-sm">
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

    # Get user preferences
    try:
        length = int(input("Enter desired password length: "))
        if length <= 0:
            print("❌ Password length must be greater than 0.")
            return
    except ValueError:
        print("❌ Invalid input. Please enter a number.")
        return

    # Character type selections
    use_uppercase = input("Include UPPERCASE letters? (y/n): ").strip().lower() == 'y'
    use_lowercase = input("Include lowercase letters? (y/n): ").strip().lower() == 'y'
    use_digits    = input("Include digits? (y/n): ").strip().lower() == 'y'
    use_symbols   = input("Include symbols? (y/n): ").strip().lower() == 'y'
    exclude_ambiguous = input("Exclude ambiguous characters (e.g. l, 1, I, O, 0)? (y/n): ").strip().lower() == 'y'

    # Build character pool based on selections
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

    # Generate password securely
    password = [secrets.choice(char_pool) for _ in range(length)]

    # Optional: Shuffle password characters for additional randomness
    random.shuffle(password)

    # Final password output
    print("\\n✅ Generated Secure Password:")
    print(''.join(password))
    print("\\n✨ Tip: Use a password manager to store your secure passwords.")

# Run the generator
if __name__ == "__main__":
    generate_password()
`}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
};

export default Projects;