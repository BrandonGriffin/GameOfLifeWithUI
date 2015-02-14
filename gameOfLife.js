function gameOfLife() {
	var currentGeneration = [];
	var cityBlocks;

	this.BigBang = function BigBang(seedSize) {
		cityBlocks = seedSize;
		
		for (var x = 0; x < cityBlocks; x++) {
			currentGeneration[x] = [];

			for (var y = 0; y < cityBlocks; y++)
				currentGeneration[x][y] = Math.round((Math.random() * 1));
		}

		return currentGeneration;
	}

	this.AdvanceAGeneration = function AdvanceAGeneration(pastGeneration) {
		currentGeneration = pastGeneration;
		var futureGeneration = [];
		
		for (var x = 0; x < cityBlocks; x++) {
			futureGeneration[x] = [];
			for (var y = 0; y < cityBlocks; y++) {
				var livingNeighbors = getLivingNeighbors(x, y);
				var household = currentGeneration[x][y];

				futureGeneration[x][y] = decideFateUsing(household, livingNeighbors);
			}
		}

		currentGeneration = futureGeneration.slice();
		return currentGeneration;
	} 

	function getLivingNeighbors(x, y) {
		var livingNeighbors = 0;

		if (topLeftNeighborIsAlive(x, y))
			livingNeighbors++;
		if (topNeighborIsAlive(x, y))
			livingNeighbors++;
		if (topRightNeighborIsAlive(x, y))
			livingNeighbors++;
		if (leftNeighborIsAlive(x, y))
			livingNeighbors++;
		if (rightNeighborIsAlive(x, y))
			livingNeighbors++;
		if (bottomLeftNeighborIsAlive(x, y))
			livingNeighbors++;
		if (bottomNeighborIsAlive(x, y))
			livingNeighbors++;
		if (bottomRightNeighborIsAlive(x, y))
			livingNeighbors++;	

		return livingNeighbors;
	}

	function topLeftNeighborIsAlive(x, y) {
		return x !== 0 && y !== 0 && currentGeneration[x - 1][y - 1] === 1;
	}

	function topNeighborIsAlive(x, y) {
		return x !== 0 && currentGeneration[x - 1][y] === 1;
	}

	function topRightNeighborIsAlive(x, y) {
		return x !== 0 && y !== cityBlocks - 1 && currentGeneration[x - 1][y + 1] === 1;
	}

	function leftNeighborIsAlive(x, y) {
		return y !== 0 && currentGeneration[x][y - 1] === 1;
	}

	function rightNeighborIsAlive(x, y) {
		return y !== cityBlocks - 1 && currentGeneration[x][y + 1] === 1;
	}

	function bottomLeftNeighborIsAlive(x, y) {
		return x !== cityBlocks - 1 && y !== 0 && currentGeneration[x + 1][y - 1] === 1;
	}

	function bottomNeighborIsAlive(x, y) {
		return x !== cityBlocks - 1 && currentGeneration[x + 1][y] === 1;
	}

	function bottomRightNeighborIsAlive(x, y) {
		return x !== cityBlocks - 1 && y !== cityBlocks - 1 && currentGeneration[x + 1][y + 1] === 1;
	}

	function decideFateUsing(household, livingNeighbors) {
		if (livingNeighbors === 3)
			return 1;
		if (currentGenerationIsAliveIn(household) && livingNeighbors === 2)
			return 1;
		return 0;
	} 

	function currentGenerationIsAliveIn(household) {
		return household === 1;
	}
}

exports.gameOfLife = gameOfLife;