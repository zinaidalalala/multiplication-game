const game = document.querySelector('.game');
const container = game.querySelector('.container');
const button = game.querySelector('.button');
const select = document.querySelector('select');
const end = document.querySelector('.end');
const endTitle = document.querySelector('.end__title');
const totalRows = 9;

let N = parseInt(select.value);
let currentMultiplier = 1;
let currentInput = null;

function createNewQuestion() {
  N = select.value;
  end.classList.add('hidden');
  const exercise = document.createElement('div');
  exercise.classList.add('exercise', 'fade-in');

  const exerciseContainer = document.createElement('div');
  exerciseContainer.classList.add('exercise__container');

  const exerciseSpan = document.createElement('span');
  exerciseSpan.classList.add('exercise__span');
  exerciseSpan.innerText = `${N} × ${currentMultiplier} =`;

  const input = document.createElement('input');
  input.classList.add('input');
  input.type = 'text';
  input.setAttribute('data-answer', N * currentMultiplier);
  input.autofocus = true;

  const cubs = document.createElement('div');
  cubs.classList.add('cubs');

  container.appendChild(exercise);
  exercise.appendChild(exerciseContainer);
  exerciseContainer.appendChild(exerciseSpan);
  exerciseContainer.appendChild(input);
  exercise.appendChild(cubs);

  currentInput = input;
  button.textContent = 'Done';

  input.focus();

  for (let i = 0; i < N; i++) {
    const cub = document.createElement('div');
    cub.classList.add('cub', 'animate');
    cubs.appendChild(cub);
  }

  button.disabled = true;
  button.classList.remove('right', 'wrong');
  currentInput.classList.remove('wrong');
}

function handleInput(inputElement) {
  const userInput = inputElement.value.trim();
  const correctAnswer = parseInt(inputElement.getAttribute('data-answer'));

  button.disabled = userInput === "";
  button.classList.toggle('disabled', button.disabled);

  if (userInput !== "" && parseInt(userInput) === correctAnswer) {
    button.classList.remove('wrong');
    inputElement.classList.remove('wrong');
  } else {
    button.classList.remove('right');
  }
}

function restartGame() {
  currentMultiplier = 1;
  button.textContent = 'Play first';
  endTitle.textContent = 'Good job! You are very smart :)';
  container.innerHTML = '';
  end.classList.remove('hidden');
}

function toggleButtonState(isCorrect) {
  button.classList.toggle('right', isCorrect);
  button.classList.toggle('wrong', !isCorrect);
  button.disabled = !isCorrect;
}

container.addEventListener('keydown', function (event) {
  if (event.key === 'Enter' && !button.disabled) {
    button.click();
  }
});

container.addEventListener('input', function (event) {
  if (event.target.classList.contains('input')) {
    handleInput(event.target);
  }
});

button.addEventListener('click', function () {
  let userAnswer = null;
  let correctAnswer = null;
  if (currentInput) {
    userAnswer = currentInput.value;
    correctAnswer = currentInput.getAttribute('data-answer');
  }

  if (button.textContent === 'Start') {
    createNewQuestion();
    return;
  }

  if (button.textContent === 'Play first') {
    restartGame();
    createNewQuestion();
    return;
  }

  if (userAnswer === correctAnswer) {
    toggleButtonState(true);
    currentInput.disabled = true;
    currentMultiplier++;
    if (currentMultiplier <= totalRows) {
      createNewQuestion();
    } else {
      select.value = '1';
      restartGame();
    }
  } else {
    currentInput.classList.add('wrong');
    button.classList.add('wrong');

    setTimeout(() => {
      currentInput.classList.remove('wrong');
      button.classList.remove('wrong');
    }, 1000);
  }
});

button.focus();
