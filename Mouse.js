class Mouse {
	constructor() { }

	draw(field) {
		let emptyCells = field.array.filter(cell => !cell.classList.contains('snake'));
		let randomPosition = Math.floor(Math.random() * emptyCells.length);
		emptyCells[randomPosition].classList.toggle('mouse');
	}
}

export default Mouse;