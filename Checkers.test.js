import {cCFI,cIFC} from './Checkers'
test('calculateCoordinatesFromId', () => {
    expect(cCFI(15)).toEqual([1, 7]);
});

test('calculateIdFromCoordinates', () => {
    expect(cIFC([1,7])).toEqual(15);
});



// npm test