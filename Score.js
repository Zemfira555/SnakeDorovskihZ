class Score {
	constructor() {
		this.currentScore = 0;
		this.bestScore = localStorage.getItem('bestScore') ? localStorage.getItem('bestScore') : 0;
		this.currentNode = document.getElementById('score_curr');
		this.bestNode = document.getElementById('score_best');
	}

	increase() {
		this.currentScore++;
		this.currentNode.innerHTML = this.currentScore;
	}

	clear() {
		this.currentScore = 0;
		this.currentNode.innerHTML = this.currentScore;
	}

	best() {
		this.bestScore = this.currentScore > this.bestScore ? this.currentScore : this.bestScore;
		if (this.bestScore) this.bestNode.parentElement.classList.add('active');
		this.bestNode.innerHTML = this.bestScore;
		localStorage.setItem('bestScore', this.bestScore);
	}
}

export default Score;