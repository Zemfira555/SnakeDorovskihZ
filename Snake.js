import { config } from './Game.js';
import { moveInterval, updateMoveInterval } from './Game.js';
import { gameOver } from './Game.js';

class Snake {
	constructor(config) {
		this.bodyLength = config.snakeLength;
		this.body = [];
			for (let i = 0; i < this.bodyLength; i++) {
			this.body.push([Math.floor(config.fieldWidth / 2), Math.floor(config.fieldHeight / 2) + i]);
		}
		this.direction = {
			ArrowUp: [0, -1],
			ArrowRight: [1, 0],
			ArrowDown: [0, 1],
			ArrowLeft: [-1, 0],
		};
		this.currDirection = this.direction.ArrowUp;
		this.directionChanged = false;
	}

	update(field, [x, y]) {
		return y * field.h + x;
	}

	draw(field, item) {
		let cellIndex = this.update(field, item);
		let cell = field.array[cellIndex];
		field.array.forEach(c => c.classList.remove('head'));
		cell.classList.add('snake');
		let headCellIndex = this.update(field, this.body[0]);
		let headCell = field.array[headCellIndex];
		headCell.classList.add('head');
	}

	move(mouse, field, score) {
		let [headPosition] = this.body;
		let nextHeadPosition = [headPosition[0] + this.currDirection[0], headPosition[1] + this.currDirection[1]];
		if (nextHeadPosition[0] < 0) {
			nextHeadPosition[0] = field.w - 1;
		};
		if (nextHeadPosition[0] >= field.w) {
			nextHeadPosition[0] = 0;
		};
		if (nextHeadPosition[1] < 0) {
			nextHeadPosition[1] = field.h - 1;
		};
		if (nextHeadPosition[1] >= field.h) {
			nextHeadPosition[1] = 0;
		};
		let nextHeadCell = field.array[this.update(field, nextHeadPosition)];
		if (nextHeadCell.classList.contains('snake')) {
			gameOver(field, score);
		};
		nextHeadCell.classList.add('snake');
		nextHeadCell.classList.add('head');
		
		let oldHeadCell = field.array[this.update(field, headPosition)];
		oldHeadCell.classList.remove('head');
		this.body.unshift(nextHeadPosition);
		if (nextHeadCell.classList.contains('mouse')) {
			nextHeadCell.classList.remove('mouse');
			score.increase();
			mouse.draw(field);
			config.snakeSpeed = Math.max(config.snakeSpeed - 10, 50);
			clearInterval(moveInterval);

			updateMoveInterval(setInterval(() => {
				this.move(mouse, field, score);
			}, config.snakeSpeed));
			return;
		};
		let tailPosition = this.body.pop();
		let tailCell = field.array[this.update(field, tailPosition)];
		tailCell.classList.remove('snake');
		tailCell.classList.remove('head');
		this.directionChanged = false;
	}

	handleKeydown(event) {
		if (event.code in this.direction) {
			const newDirection = this.direction[event.code];
			const falseDirectionUp = this.currDirection === this.direction.ArrowDown && newDirection === this.direction.ArrowUp;
			const falseDirectionRight = this.currDirection === this.direction.ArrowLeft && newDirection === this.direction.ArrowRight;
			const falseDirectionDown = this.currDirection === this.direction.ArrowUp && newDirection === this.direction.ArrowDown;
			const falseDirectionLeft = this.currDirection === this.direction.ArrowRight && newDirection === this.direction.ArrowLeft;
			if (falseDirectionUp || falseDirectionDown || falseDirectionRight || falseDirectionLeft || this.directionChanged === true) return;
			this.currDirection = newDirection;
			this.directionChanged = true;
		};
	};
}

export default Snake;