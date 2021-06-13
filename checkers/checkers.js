'use strict';

const SIZE = 8;

function createBoard() {

    const chessBoard = document.getElementById('chessBoard');
    for (let y = 0; y < SIZE; y++) {
        const row = document.createElement('div');
        row.className = 'row';
        chessBoard.appendChild(row);
        for (let x = 0; x < SIZE; x++) {
            const square = document.createElement('div');
            square.id = x.toString() + y.toString();
            square.className = ((x + y) % 2) ? 'bblack' : 'bwhite';

            // If the square should have a piece in it...
            // eslint-disable-next-line
            if ((x + y) % 2 != 0 && y != 3 && y != 4) {
                const img = document.createElement('img');
                if (y < 3) {
                    img.id = 'w' + square.id;
                    img.src = './img/white.png';
                } else {
                    img.id = 'b' + square.id;
                    img.src = './img/black.png';
                }
                img.className = 'piece';
                img.setAttribute('draggable', 'true');
                square.appendChild(img);
            }
            square.setAttribute('draggable', 'false');
            row.appendChild(square);
        }
    }
}

function allowDrop() {
    // Wire up the target events on all the black squares
    const squares = document.querySelectorAll('.bblack');


    for (const s of squares) {
        // eslint-disable-next-line no-undef
        s.addEventListener('dragover', dragover, false);
        s.addEventListener('drop', drop, false);
        s.addEventListener('dragenter', dragEnter, false);
        s.addEventListener('dragleave', dragLeave, false);
    }

    // Wire up the source events on all of the images
    let j = 0;
    const pieces = document.querySelectorAll('img');
    while (j < pieces.length) {
        const p = pieces[j++];
        p.addEventListener('dragstart', dragStart, false);
        p.addEventListener('dragend', dragEnd, false);
    }
}
createBoard();
allowDrop();
// Handle the dragover event
// eslint-disable-next-line no-unused-vars
function dragOver(e) {
    e.preventDefault();
    // Get the img element that is being dragged
    const dragID = e.dataTransfer.getData('text');
    const dragPiece = document.getElementById(dragID);
    // Work around - if we can't get the dataTransfer, don't
    // disable the move yet, the drop event will catch this
    if (dragPiece) {
        if (e.target.tagName === 'DIV' &&
            isValidMove(dragPiece, e.target, false)) {
            e.dataTransfer.dropEffect = 'move';
        } else {
            e.dataTransfer.dropEffect = 'none';
        }
    }
}
// Handle the dragstart event
function dragStart(e) {
    if (e.target.draggable) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text', e.target.id);
        e.target.classList.add('selected');
    }
}
// Handle the dragend event
function dragEnd(e) {
    e.target.classList.remove('selected');
}
// Handle the drop event
function drop(e) {
    e.stopPropagation();
    e.preventDefault();
    // Get the img element that is being dragged
    const droppedID = e.dataTransfer.getData('text');
    const droppedPiece = document.getElementById(droppedID);
    // eslint-disable-next-line max-len
    if (droppedPiece && e.target.tagName === 'DIV' && isValidMove(droppedPiece, e.target, true)) {
        // Create a new img on the target location
        const newPiece = document.createElement('img');
        newPiece.src = droppedPiece.src;
        newPiece.id = droppedPiece.id.substr(0, 1) + e.target.id;
        newPiece.draggable = droppedPiece.draggable;
        if (droppedPiece.draggable) {
            newPiece.classList.add('jumpOnly');
        }
        newPiece.classList.add('piece');
        newPiece.addEventListener('dragstart', dragStart, false);
        newPiece.addEventListener('dragend', dragEnd, false);
        e.target.appendChild(newPiece);

        // Remove the previous image
        droppedPiece.parentNode.removeChild(droppedPiece);
        // Remove the drop effect from the target element
        e.target.classList.remove('drop');
        // See if the piece needs to be promoted
        kingMe(newPiece);
    }
}
// Handle the dragenter event
function dragEnter(e) {
    // Get the img element that is being dragged
    const dragID = e.dataTransfer.getData('text');
    const dragPiece = document.getElementById(dragID);
    const isDIv = e.target.tagName === 'DIV';
    const isMove = isValidMove(dragPiece, e.target, false);
    if (dragPiece && isDIv && isMove) {
        e.target.classList.add('drop');
    }
}
// Handle the dragleave event
function dragLeave(e) {
    e.target.classList.remove('drop');
}

function isValidMove(source, target, drop) {
    // Get the piece prefix and location
    const startPos = source.id.substr(1, 2);
    const prefix = source.id.substr(0, 1);
    // Get the drop location, strip off the prefix, if any
    let endPos = target.id;
    if (endPos.length > 2) {
        endPos = endPos.substr(1, 2);
    }
    // You can't drop on the existing location
    if (startPos === endPos) {
        return false;
    }
    // You can't drop on occupied square
    // eslint-disable-next-line
    if (target.childElementCount != 0) {
        return false;
    }

    let jumpOnly = false;
    if (source.classList.contains('jumpOnly')) {
        jumpOnly = true;
    }
    // Compute the x and y coordinates
    const xStart = parseInt(startPos.substr(0, 1));
    const yStart = parseInt(startPos.substr(1, 1));
    const xEnd = parseInt(endPos.substr(0, 1));
    const yEnd = parseInt(endPos.substr(1, 1));
    switch (prefix) {
        // For white pieces...
        case 'w':
            if (yEnd <= yStart)
                return false; // Can't move backwards
            break;
            // For black pieces...
        case 'b':
            if (yEnd >= yStart)
                return false; // Can't move backwards
            break;
    }
    // These rule apply to all pieces
    if (yStart === yEnd || xStart === xEnd)
        return false; // Move must be diagonal
    // Can't move more than two spaces
    if (Math.abs(yEnd - yStart) > 2 || Math.abs(xEnd - xStart) > 2)
        return false;
    // Only jumps are allowed
    if (Math.abs(xEnd - xStart) === 1 && jumpOnly)
        return false;
    let jumped = false;
    // If moving two spaces, find the square that is jumped
    if (Math.abs(xEnd - xStart) === 2) {
        const pos = ((xStart + xEnd) / 2).toString() +
            ((yStart + yEnd) / 2).toString();
        const div = document.getElementById(pos);
        if (div.childElementCount === 0)
            return false; // Can't jump an empty square
        const img = div.children[0];
        if (img.id.substr(0, 1).toLowerCase() === prefix.toLowerCase())
            return false; // Can't jump a piece of the same color

        // If this function is called from the drop event
        // Remove the jumped piece
        if (drop) {
            div.removeChild(img);
            jumped = true;
        }
    }
    // Set the draggable attribute so the next player can take a turn
    if (drop) {
        enableNextPlayer(source);
        // If we jumped a piece, we're allowed to go again
        if (jumped) {
            source.draggable = true;
            source.classList.add('jumpOnly'); // But only for another jump
        }
    }
    return true;
}

function kingMe(piece) {
    // If we're already a king, just return
    if (piece.id.substr(0, 1) === 'W' || piece.id.substr(0, 1) === 'B')
        return;

    let newPiece = '';
    // If this is a white piece on the 7th row
    if (piece.id.substr(0, 1) === 'w' && piece.id.substr(2, 1) === '7') {
        newPiece = document.createElement('img');
        newPiece.src = './img/whiteKing.png';
        newPiece.id = 'W' + piece.id.substr(1, 2);
    }
    // If this is a black piece on the 0th row
    if (piece.id.substr(0, 1) === 'b' && piece.id.substr(2, 1) === '0') {
        newPiece = document.createElement('img');
        newPiece.src = './img/blackKing.png';
        newPiece.id = 'B' + piece.id.substr(1, 2);
    }
    // If a new piece was created, set its properties and events
    if (newPiece) {
        newPiece.draggable = true;
        newPiece.classList.add('piece');
        newPiece.addEventListener('dragstart', dragStart, false);
        newPiece.addEventListener('dragend', dragEnd, false);
        const parent = piece.parentNode;
        parent.removeChild(piece);
        parent.appendChild(newPiece);
    }
}

function enableNextPlayer(piece) {
    // Get all of the pieces
    const pieces = document.querySelectorAll('img');
    let i = 0;
    while (i < pieces.length) {
        const p = pieces[i++];
        // If this is the same color that just moved, disable dragging
        if (p.id.substr(0, 1).toUpperCase() ===
            piece.id.substr(0, 1).toUpperCase()) {
            p.draggable = false;
            // eslint-disable-next-line brace-style
        }
        // Otherwise, enable dragging
        else {
            p.draggable = true;
        }
        p.classList.remove('jumpOnly');
    }
}
//reset game when reset button is pressed
function resetGame() {
    const rG = document.getElementById('resetGame');
    rG.onclick = function () {
        return location.reload();
    };
}
resetGame();