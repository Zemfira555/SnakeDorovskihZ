import Field from './Field.js';
import Snake from './Snake.js';
import Mouse from './Mouse.js';
import Score from './Score.js';

function startGame() {
	let field = new Field(config);
	let snake = new Snake(config);
	let mouse = new Mouse();
	let score = new Score();
	score.clear();
	score.best();
	let fieldElement = document.querySelector('.field');
	fieldElement.classList.toggle('no_cursor');
	fieldElement.setAttribute('tabindex', '0');
	fieldElement.focus();
	document.addEventListener('keydown', (event) => {
		snake.handleKeydown(event);
	});
	snake.body.forEach((item) => {
		snake.draw(field, item);
	});
	mouse.draw(field);
	moveInterval = setInterval(() => {
		snake.move(mouse, field, score);
	}, config.snakeSpeed);
}

export function gameOver(field, score) {
	clearInterval(moveInterval);
	config.snakeSpeed = config.initialSpeed;
	let snakeCells = field.array.filter(cell => cell.classList.contains('snake'));
	snakeCells.forEach((cell) => {
		cell.classList.add('snake-fail');
	});
	score.best();
	document.querySelector('.game-over').classList.toggle('active');
	document.querySelector('.field').classList.toggle('no_cursor');
}

export let moveInterval;

export function updateMoveInterval(newInterval) {
  clearInterval(moveInterval);
  moveInterval = newInterval;
}

export const config = {
	fieldWidth: 21,
	fieldHeight: 21,
	snakeLength: 3,
	snakeSpeed: 400,
	initialSpeed: 400
};

startGame();

document.querySelector('.btn-reset').addEventListener('click', () => {
	document.querySelector('.game-over').classList.toggle('active');
	document.querySelector('.field').innerHTML = '';
	startGame();
})
