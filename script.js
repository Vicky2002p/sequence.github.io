const board = document.querySelector('table');
const rows = 10;
const cols = 10;

// List of all card files
const cardFiles = [
    "2_of_hearts.svg", "2_of_spades.svg", "2_of_clubs.svg", "2_of_diamonds.svg",
    "3_of_hearts.svg", "3_of_spades.svg", "3_of_clubs.svg", "3_of_diamonds.svg",
    "4_of_hearts.svg", "4_of_spades.svg", "4_of_clubs.svg", "4_of_diamonds.svg",
    "5_of_hearts.svg", "5_of_spades.svg", "5_of_clubs.svg", "5_of_diamonds.svg",
    "6_of_hearts.svg", "6_of_spades.svg", "6_of_clubs.svg", "6_of_diamonds.svg",
    "7_of_hearts.svg", "7_of_spades.svg", "7_of_clubs.svg", "7_of_diamonds.svg",
    "8_of_hearts.svg", "8_of_spades.svg", "8_of_clubs.svg", "8_of_diamonds.svg",
    "9_of_hearts.svg", "9_of_spades.svg", "9_of_clubs.svg", "9_of_diamonds.svg",
    "10_of_hearts.svg", "10_of_spades.svg", "10_of_clubs.svg", "10_of_diamonds.svg",
    "queen_of_hearts.svg", "queen_of_spades.svg", "queen_of_clubs.svg", "queen_of_diamonds.svg",
    "king_of_hearts.svg", "king_of_spades.svg", "king_of_clubs.svg", "king_of_diamonds.svg",
    "ace_of_hearts.svg", "ace_of_spades.svg", "ace_of_clubs.svg", "ace_of_diamonds.svg"
];

// Joker card file
const jokerFile = "joker.svg";

// Duplicate each card so that each can appear twice
let allCards = [];
cardFiles.forEach(card => {
    allCards.push(card, card); // Add each card twice
});

// Shuffle the cards
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

allCards = shuffle(allCards);

// Create a 2D array to keep track of placed cards for adjacency checks
let placedCards = Array.from({ length: rows }, () => Array(cols).fill(null));

// Function to get adjacent card names
function getAdjacentCards(i, j) {
    let adjacent = [];
    if (j > 0 && placedCards[i][j - 1] !== null) { // Left
        adjacent.push(placedCards[i][j - 1]);
    }
    if (i > 0 && placedCards[i - 1][j] !== null) { // Above
        adjacent.push(placedCards[i - 1][j]);
    }
    return adjacent;
}

// Function to place a card in a cell with constraints
function placeCard(i, j) {
    // Check if the cell is a corner
    if (
        (i === 0 && j === 0) ||
        (i === 0 && j === cols - 1) ||
        (i === rows - 1 && j === 0) ||
        (i === rows - 1 && j === cols - 1)
    ) {
        // Place Joker
        const cell = document.createElement('td');
        const img = document.createElement('img');
        img.src = `img/${jokerFile}`;
        img.alt = jokerFile;
        img.style.width = '100%';
        img.style.height = '100%';
        cell.appendChild(img);
        board.rows[i].appendChild(cell);
        placedCards[i][j] = jokerFile;
    } else {
        // Get adjacent cards
        const adjacentCards = getAdjacentCards(i, j);

        // Filter valid cards
        const validCards = allCards.filter(card => !adjacentCards.includes(card));

        if (validCards.length === 0) {
            // No valid card found, relax adjacency constraints or handle differently
            // For simplicity, we'll allow any card
            var selectedCard = allCards.pop();
        } else {
            // Select a random valid card
            const randomIndex = Math.floor(Math.random() * validCards.length);
            var selectedCard = validCards[randomIndex];

            // Remove the selected card from allCards
            const cardIndex = allCards.indexOf(selectedCard);
            if (cardIndex > -1) {
                allCards.splice(cardIndex, 1);
            }
        }

        // Place the selected card
        const cell = document.createElement('td');
        const img = document.createElement('img');
        img.src = `img/${selectedCard}`;
        img.alt = selectedCard;
        img.style.width = '100%';
        img.style.height = '100%';
        cell.appendChild(img);
        board.rows[i].appendChild(cell);
        placedCards[i][j] = selectedCard;
    }
}

// Initialize the table rows
for (let i = 0; i < rows; i++) {
    const row = document.createElement('tr');
    board.appendChild(row);
    for (let j = 0; j < cols; j++) {
        placeCard(i, j);
    }
}

const cells = document.querySelectorAll('td');

cells.forEach(cell => {
    cell.addEventListener('click', function() {
        // Check if the cell already has a circle
        const existingCircle = cell.querySelector('.circle');
        
        if (existingCircle) {
            // If there's an existing circle, remove it and reset the background color
            existingCircle.remove();
            cell.style.backgroundColor = ''; // Reset to original color
        } else {
            // If no circle exists, change the background color to red
            cell.style.backgroundColor = 'red';

            // Create a new circle element
            const circle = document.createElement('div');
            circle.classList.add('circle');

            // Append the circle to the cell
            cell.appendChild(circle);
        }
    });
});
