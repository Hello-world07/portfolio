import React, { useState, useCallback } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula, solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaCopy, FaCheck, FaPlay, FaCode, FaEye } from 'react-icons/fa';
import Particles from '@tsparticles/react'; // Updated import
import { loadSlim } from '@tsparticles/slim'; // Updated import

// A fully responsive, modern Code section with dynamic background, particles, and glow effects
const Code = () => {
  const [activeTab, setActiveTab] = useState('rps');
  const [copied, setCopied] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [output, setOutput] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [theme, setTheme] = useState('dracula');
  const [rpsChoice, setRpsChoice] = useState(null);
  const [rpsResult, setRpsResult] = useState('');

  // Code snippets with descriptions, time complexity, and simulated output
  const codeSnippets = {
    rps: {
      language: 'python',
      title: 'Rock, Paper, Scissors Game',
      description: 'An interactive game where the player competes against the computer. Uses <span class="font-semibold text-indigo-600 dark:text-indigo-400">random.choice()</span> for the computer’s selection.',
      timeComplexity: 'The time complexity is <span class="font-semibold text-indigo-600 dark:text-indigo-400">O(1)</span> per round.',
      code: `
import random
options = ["rock", "paper", "scissors"]
print("\\n🎮 Welcome to Rock, Paper, Scissors Game! 🎮 ")
try:
    play = int(input("Do you want to play the game? Type yes (1) / no (2): "))
except ValueError:
    print("❌ Invalid input. Exiting the game.")
    exit()
if play != 1:
    print("👋 Bye! You chose not to play. See you next time!")
else:
    while True:
        user = input("👉 Type one option [rock], [paper], or [scissors]: ").lower().strip()
        computer = random.choice(options)
        print("\\n==========================================")
        if user not in options:
            print("❌ Invalid input. Please choose rock, paper, or scissors.")
        else:
            print(f"🙋 Player chose : {user}")
            print(f"💻 Computer chose : {computer}")
            print("------------------------------------------")
            if user == computer:
                print("🤝 It's a draw!")
            elif (user == "rock" and computer == "scissors") or \
                 (user == "paper" and computer == "rock") or \
                 (user == "scissors" and computer == "paper"):
                print("✅ Player wins!")
            else:
                print("💻 Computer wins!")
            print("==========================================\\n")
            try:
                play = int(input("Do you want to play again? Type yes (3) / no (2): "))
            except ValueError:
                print("❌ Invalid input. Exiting the game.")
                break
            if play != 3:
                print("👋 Bye! Exiting game. See you next time!")
                break
      `,
      simulatedOutput: `
==========================================
🙋 Player chose : rock
💻 Computer chose : scissors
------------------------------------------
✅ Player wins!
==========================================
      `,
    },
    twosum: {
      language: 'python',
      title: 'TwoSum Problem',
      description: 'Solves the TwoSum problem by finding two numbers in a list that add up to a target. Uses a <span class="font-semibold text-indigo-600 dark:text-indigo-400">nested loop</span>.',
      timeComplexity: 'The time complexity is <span class="font-semibold text-indigo-600 dark:text-indigo-400">O(n²)</span> due to the nested loops.',
      code: `
def twosumms(nums, target):
    for i in range(len(nums)):
        for j in range(i+1,len(nums)):
            if nums[i] + nums[j] == target:
                return [i,j]
    return None

nums=[1,6,9,5]
target = 50

Result = twosumms(nums,target)
print(Result)
      `,
      simulatedOutput: `
None
      `,
    },
    guess: {
      language: 'python',
      title: 'Number Guessing Game',
      description: 'A game where the player guesses a secret number within a limited number of attempts. Uses a <span class="font-semibold text-indigo-600 dark:text-indigo-400">while loop</span>.',
      timeComplexity: 'The time complexity is <span class="font-semibold text-indigo-600 dark:text-indigo-400">O(1)</span> per guess.',
      code: `
secret_number = 20
count = 0
max_attempts = 5

while True:
    try:
        user = int(input("Find the secret number (between 1 and 100): "))
    except ValueError:
        print("❌ Please enter only valid numbers.")
        continue  # Skip this attempt

    count += 1

    if user == secret_number:
        print(f"🎉 You win! You found the secret number: {secret_number}")
        break
    else:
        chances_left = max_attempts - count
        print(f"❌ Wrong guess. You have {chances_left} chance(s) left.")

    if count == max_attempts:
        print(f"❌ You've used all {max_attempts} attempts. The secret number was {secret_number}.")
        break
      `,
      simulatedOutput: `
Find the secret number (between 1 and 100): 15
❌ Wrong guess. You have 4 chance(s) left.
      `,
    },
    dsa: {
      language: 'python',
      title: 'DSA - Palindrome Check',
      description: 'A DSA example that checks if a string is a palindrome using <span class="font-semibold text-indigo-600 dark:text-indigo-400">two-pointer technique</span>.',
      timeComplexity: 'The time complexity is <span class="font-semibold text-indigo-600 dark:text-indigo-400">O(n)</span>.',
      code: `
def is_palindrome(s):
    s = s.lower().replace(" ", "")
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True

# Test the function
test_string = "racecar"
result = is_palindrome(test_string)
print(f"Is '{test_string}' a palindrome? {result}")
      `,
      simulatedOutput: `
Is 'racecar' a palindrome? True
      `,
    },
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCopied(false);
    setShowOutput(false);
    setShowPreview(false);
  };

  // Handle copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab].code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle simulated run
  const handleRun = () => {
    setShowOutput(true);
    setOutput(codeSnippets[activeTab].simulatedOutput);
  };

  // Handle theme change
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  // Handle Rock, Paper, Scissors preview
  const handleRpsPlay = (choice) => {
    setRpsChoice(choice);
    const options = ['rock', 'paper', 'scissors'];
    const computerChoice = options[Math.floor(Math.random() * options.length)];
    let result = '';

    if (choice === computerChoice) {
      result = "🤝 It's a draw!";
    } else if (
      (choice === 'rock' && computerChoice === 'scissors') ||
      (choice === 'paper' && computerChoice === 'rock') ||
      (choice === 'scissors' && computerChoice === 'paper')
    ) {
      result = '✅ You win!';
    } else {
      result = '💻 Computer wins!';
    }

    setRpsResult(`You chose: ${choice}\nComputer chose: ${computerChoice}\n${result}`);
  };

  // Syntax highlighting themes
  const themes = {
    dracula: dracula,
    solarizedlight: solarizedlight,
  };

  // Particle initialization for tsparticles
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // Particle options for a subtle, modern effect
  const particlesOptions = {
    background: {
      color: {
        value: "transparent", // Ensure the particle background is transparent
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: ["#6366f1", "#a855f7", "#ec4899"], // Indigo, purple, pink to match gradient
      },
      links: {
        enable: false,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "out",
        },
        random: true,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 50,
      },
      opacity: {
        value: 0.5,
        random: true,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
        random: true,
      },
    },
    detectRetina: true,
  };

  return (
    <section className="min-h-screen bg-gray-100 dark:bg-custom-dark flex items-center justify-center py-8 sm:py-12 transition-colors duration-300 relative overflow-hidden">
      {/* Enhanced Gradient Background with Multi-Directional Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 animate-gradient-xy opacity-80"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/10 via-teal-500/10 to-purple-500/10 animate-gradient-xy-slow opacity-50"></div>

      {/* Particle Layer */}
      <Particles
        id="tsparticles"
        className="absolute inset-0 z-0"
        init={particlesInit}
        options={particlesOptions}
      />

      <div className="w-full max-w-full sm:max-w-2xl lg:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="pt-20">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 lg:mb-8 text-center animate-fade-in">
            My Code
          </h1>

          {/* Tabs */}
          <div className="flex justify-center mb-4 sm:mb-6 space-x-1 sm:space-x-2 lg:space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-gray-200 dark:scrollbar-track-custom-dark">
            {Object.keys(codeSnippets).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-2 sm:px-3 lg:px-4 py-1 sm:py-2 text-xs sm:text-sm lg:text-base font-medium rounded-full transition-all duration-300 transform hover:scale-105 whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-200 dark:bg-custom-dark-secondary text-gray-600 dark:text-gray-200 hover:bg-indigo-500 hover:text-white'
                }`}
              >
                {tab === 'rps' ? 'Rock, Paper, Scissors' : tab === 'twosum' ? 'TwoSum' : tab === 'guess' ? 'Number Guessing' : 'DSA - Palindrome'}
              </button>
            ))}
          </div>

          {/* Code Card with Glow Effect */}
          <div className="bg-white dark:bg-custom-dark-secondary p-4 sm:p-5 lg:p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 animate-fade-in transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/30 glow-effect">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white text-center sm:text-left">
                {codeSnippets[activeTab].title}
              </h3>
              <div className="flex flex-wrap justify-center sm:justify-end space-x-2 sm:space-x-3 gap-2">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center px-2 sm:px-3 py-1 text-xs sm:text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors duration-300"
                  aria-label="Toggle preview"
                >
                  {showPreview ? (
                    <>
                      <FaCode className="mr-1 sm:mr-2" /> Code
                    </>
                  ) : (
                    <>
                      <FaEye className="mr-1 sm:mr-2" /> Preview
                    </>
                  )}
                </button>
                <button
                  onClick={handleRun}
                  className="flex items-center px-2 sm:px-3 py-1 text-xs sm:text-sm text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-300"
                  aria-label="Run code"
                >
                  <FaPlay className="mr-1 sm:mr-2" /> Run
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center px-2 sm:px-3 py-1 text-xs sm:text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                  aria-label="Copy code"
                >
                  {copied ? (
                    <>
                      <FaCheck className="mr-1 sm:mr-2" /> Copied!
                    </>
                  ) : (
                    <>
                      <FaCopy className="mr-1 sm:mr-2" /> Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Theme Selector */}
            <div className="flex justify-center sm:justify-end mb-3 sm:mb-4 space-x-2">
              <button
                onClick={() => handleThemeChange('dracula')}
                className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg transition-colors duration-300 ${
                  theme === 'dracula'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 hover:bg-indigo-500 hover:text-white'
                }`}
              >
                Dracula
              </button>
              <button
                onClick={() => handleThemeChange('solarizedlight')}
                className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg transition-colors duration-300 ${
                  theme === 'solarizedlight'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 hover:bg-indigo-500 hover:text-white'
                }`}
              >
                Solarized Light
              </button>
            </div>

            {/* Description */}
            <p
              className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4"
              dangerouslySetInnerHTML={{ __html: codeSnippets[activeTab].description }}
            ></p>

            {/* Time Complexity */}
            <p
              className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4"
              dangerouslySetInnerHTML={{ __html: codeSnippets[activeTab].timeComplexity }}
            ></p>

            {/* Code Block and Output Container */}
            <div className="flex flex-col">
              {/* Code Block or Preview */}
              {showPreview && activeTab === 'rps' ? (
                <div className="w-full h-[250px] sm:h-[300px] lg:h-[340px] p-4 bg-gray-100 dark:bg-gray-800 rounded-lg transition-all duration-300">
                  <h4 className="text-xs sm:text-sm lg:text-base font-semibold text-gray-900 dark:text-white mb-2">
                    Live Preview: Rock, Paper, Scissors
                  </h4>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {['rock', 'paper', 'scissors'].map((choice) => (
                      <button
                        key={choice}
                        onClick={() => handleRpsPlay(choice)}
                        className="px-3 py-1 text-xs sm:text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-300 capitalize"
                      >
                        {choice}
                      </button>
                    ))}
                  </div>
                  {rpsResult && (
                    <pre className="text-xs sm:text-sm lg:text-base text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                      {rpsResult}
                    </pre>
                  )}
                </div>
              ) : (
                <div className="w-full h-[250px] sm:h-[300px] lg:h-[340px] relative">
                  <SyntaxHighlighter
                    language={codeSnippets[activeTab].language}
                    style={themes[theme]}
                    customStyle={{
                      padding: '0.75rem sm:1rem lg:1.25rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.75rem sm:0.875rem lg:0.9375rem',
                      lineHeight: '1.5',
                      width: '100%',
                      height: '100%',
                      overflowY: 'auto',
                      overflowX: 'auto',
                      scrollbarWidth: 'thin',
                    }}
                    wrapLines={true}
                    showLineNumbers={true}
                    lineNumberStyle={{
                      paddingRight: '0.75rem sm:1rem',
                      color: theme === 'dracula' ? '#6272a4' : '#93a1a1',
                      fontSize: '0.75rem sm:0.875rem lg:0.9375rem',
                    }}
                  >
                    {codeSnippets[activeTab].code.trim()}
                  </SyntaxHighlighter>
                </div>
              )}

              {/* Simulated Output */}
              {showOutput && (
                <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gray-100 dark:bg-gray-800 rounded-lg animate-slide-down">
                  <h4 className="text-xs sm:text-sm lg:text-base font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">
                    Output:
                  </h4>
                  <pre className="text-xs sm:text-sm lg:text-base text-gray-800 dark:text-gray-200 whitespace-pre-wrap overflow-x-auto">
                    {output}
                  </pre>
                </div>
              )}
            </div>

            {/* Note */}
            <p className="mt-4 sm:mt-6 text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-300 text-center italic animate-fade-in">
              These are some basic programs, and I plan to add more, including DSA problems, using Python.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Code;