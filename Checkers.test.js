const calculateCoordinatesFromId = require('./calculateCoordinatesFromId');



test('properly finds coordinates', () => {
    expect(calculateCoordinatesFromId(15)).toBe([7], [1]);
});