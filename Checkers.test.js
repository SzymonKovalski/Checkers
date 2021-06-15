const boardLength = 8;
function calculateCoordinatesFromId(id) {
	let currentId = 0;
	for (let i = 0; i < boardLength; i++) {
		for (let j = 0; j < boardLength; j++) {
			currentId++;
			if (currentId === id) {
				const location = [i, j];
				return location;
			}
		}
	}
} // i do not know how to import this directly so i copy-paste


test('properly finds coordinates', () => {
    expect(calculateCoordinatesFromId(15)).toBe([1, 7]);
});

// npm test