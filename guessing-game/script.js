let randomNumber;
let guessCount = 1;
let guess_arr = [];
let resetButton;

const GUESS_LIMIT = 3;

const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');


function isNumeric(value)
{
  // Check if string is all digits, allowing for negative sign.
  return /^-?\d+$/.test(value);
}

function init()
{
  // Generate new number, reset count, and array
  randomNumber = Math.floor(Math.random() * 10) + 1;
  guess_arr = [];
  guessCount = 1;

  // Reset styles and content
  guesses.style.display = "none";
  lowOrHi.textContent = "";
  lastResult.textContent = "";

  // Reset field and focus
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();

  // Remove reset button if defined
  if (resetButton)
    resetButton.remove();

}

function checkGuess()
{
  // Validate Input
  if (!isNumeric(guessField.value))
  {
    alert("Please enter a integer.");
    return;
  }
  let guess = Number(guessField.value);

  if (guess > randomNumber)
  {
    lowOrHi.textContent = "Guess is too large.";
  } else if (guess < randomNumber) {
    lowOrHi.textContent = "Guess is too small.";
  } else {
    lastResult.textContent = `You guessed it! The number was ${randomNumber} and you guessed it ${guessCount} tries.`
    lastResult.style.backgroundColor = "green";
    endGame();
  }

  if (guessCount >= GUESS_LIMIT)
  {
    lastResult.textContent = `You ran out of tries. The number was ${randomNumber}. Please reset the game to play again.`;
    lastResult.style.backgroundColor = "red";
    endGame();
  }

  guesses.style.display = "block";
  guess_arr.push(guess);
  let guess_entry = document.createElement('p');
  guess_entry.textContent = `Guess (${guessCount}): ${guess}`;
  guesses.appendChild(guess_entry);
  guessCount++;
  guessField.value = '';
  guessField.focus();
}

function endGame()
{
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = 'Start new game';
  document.querySelector('.resultParas').insertAdjacentElement('beforebegin', resetButton);
  resetButton.addEventListener('click', init);
}

init();
guessSubmit.addEventListener('click', checkGuess);