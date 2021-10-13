document.querySelector(".loading-overlay span").onclick = function () {
	let yourName = prompt("What Is Your Name :)");

	if (yourName == null || yourName == "") {
		//null for cancel & "" for enter without your name
		document.querySelector(".name span").innerHTML = "UnKnown";
	} else {
		document.querySelector(".name span").innerHTML = yourName;
	}

	document.querySelector(".loading-overlay").remove();
};

let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-container");
let blocks = Array.from(blocksContainer.children);
let orderRange = [...Array(blocks.length).keys()];
shuffle(orderRange);
// make css property "order" on each block
blocks.forEach((block, index) => {
	block.style.order = orderRange[index];
	// add click event
	block.addEventListener("click", function () {
		// trigger the flippblock function
		flippblock(block);
	});
});
// flippblock function to flipp block when you click on it
function flippblock(selectedBlock) {
	selectedBlock.classList.add("flipp");
	let flippedBlocks = blocks.filter((flippBlock) =>
		flippBlock.classList.contains("flipp")
	);
	if (flippedBlocks.length === 2) {
		stopClick();
		checkMatchedBlock(flippedBlocks[0], flippedBlocks[1]);
	}
}
// stop click function if you choose 2 blocks
function stopClick() {
	blocksContainer.classList.add("no-click");
	setTimeout(() => {
		// reomve class no-click after duration
		blocksContainer.classList.remove("no-click");
	}, duration);
}
// check matched block function
function checkMatchedBlock(firstBlock, secondBlock) {
	let triesCount = document.querySelector(".tries span");
	if (firstBlock.dataset.tech === secondBlock.dataset.tech) {
		firstBlock.classList.remove("flipp");
		secondBlock.classList.remove("flipp");

		firstBlock.classList.add("match");
		secondBlock.classList.add("match");
		document.getElementById("success").play();
	} else {
		triesCount.innerHTML = parseInt(triesCount.innerHTML) + 1;
		document.getElementById("fail").play();
		setTimeout(() => {
			firstBlock.classList.remove("flipp");
			secondBlock.classList.remove("flipp");
		}, duration);
	}
}
// shuffle function to create random array
function shuffle(array) {
	let current = array.length,
		stach,
		random;
	while (current > 0) {
		random = Math.floor(Math.random() * current);
		current--;
		stach = array[current];
		array[current] = array[random];
		array[random] = stach;
	}
	return array;
}
