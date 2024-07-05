class Field {
	constructor(config) {
		this.w = config.fieldWidth;
		this.h = config.fieldHeight;
		this.node = document.querySelector('.field');
		this.node.style.width = `${this.w*2}em`;
		this.html = this.draw();
		this.array = Array.from(this.html.childNodes);
	}

	draw() {
		let createCell = () => {
			let cell = document.createElement('div');
			cell.classList.add('cell');
			return cell;
		};
		let fieldHtml = new Array(this.w * this.h)
			.fill(0)
			.reduce((acc, item) => {
				const cell = createCell();
				acc.appendChild(cell);
				return acc;
			}, this.node);
		return fieldHtml;
	}
}

export default Field;