document.getElementById('jacks').addEventListener('click', function(event) {
    const popover = document.querySelector('.popover');
    const button = this;

    // Toggle the popover visibility
    popover.classList.toggle('visible');

    // Calculate the position of the popover relative to the button
    const rect = button.getBoundingClientRect();

    // Center the popover below the button
    const popoverWidth = popover.offsetWidth;
    popover.style.top = `${rect.top + window.scrollY + button.offsetHeight}px`; // Below the button
    popover.style.left = `${rect.left + window.scrollX + (rect.width / 2) - (popoverWidth / 2)}px`; // Aligns with the left side of the button
});


const board = document.querySelector('table');
const rows = 10;
const cols = 10;

const startGameButton = document.getElementById('start-game');

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

// Variable to keep track of the current turn
let currentPlayer = 'blue'; // Start with red player

// Function to start the game
function startGame() {
    initializeBoard();
}

function initializeBoard() {
    let allCards = [];
    cardFiles.forEach(card => {
        allCards.push(card, card); // Add each card twice
    });

    allCards = shuffle(allCards);

    // Create a 2D array to keep track of placed cards
    let placedCards = Array.from({ length: rows }, () => Array(cols).fill(null));

    // Initialize the table rows
    board.innerHTML = ''; // Clear the board before initializing
    for (let i = 0; i < rows; i++) {
        const row = document.createElement('tr');
        board.appendChild(row);
        for (let j = 0; j < cols; j++) {
            placeCard(i, j, allCards, placedCards);
        }
    }

    // Add click events to cells
    addCellClickEvents();
}

// Shuffle the cards
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to place a card in a cell
function placeCard(i, j, allCards, placedCards) {
    const cell = document.createElement('td');
    const img = document.createElement('img');

    // Check if the cell is a corner
    if (
        (i === 0 && j === 0) ||
        (i === 0 && j === cols - 1) ||
        (i === rows - 1 && j === 0) ||
        (i === rows - 1 && j === cols - 1)
    ) {
        // Place Joker
        img.src = `img/${jokerFile}`;
        img.alt = jokerFile;
        placedCards[i][j] = jokerFile;
    } else {
        const selectedCard = allCards.pop();
        img.src = `img/${selectedCard}`;
        img.alt = selectedCard;
        placedCards[i][j] = selectedCard;
    }

    img.style.width = '100%';
    img.style.height = '100%';
    cell.appendChild(img);
    board.rows[i].appendChild(cell);
}

// Add click events to table cells
function addCellClickEvents() {
    const cells = document.querySelectorAll('td');

    cells.forEach(cell => {
        cell.addEventListener('click', function () {
            // Check if the cell already has a circle
            const existingCircle = cell.querySelector('.circle');
            const cellImg = cell.querySelector('img');

            // Ignore clicks on Joker cards
            if (cellImg.alt === jokerFile) {
                return;
            }

            // Check if the cell already has a circle with the current player's color
            if (existingCircle && existingCircle.style.backgroundColor === currentPlayer) {
                // If the circle is already the same color as the current player, ignore the click
                return;
            }
            
            if (existingCircle) {
                // If there's an existing circle, remove it and reset the background color
                existingCircle.remove();
                cell.style.backgroundColor = ''; // Reset to original color
                
                // Toggle the current player for the next turn
                currentPlayer = (currentPlayer === 'blue') ? 'lightgreen' : 'blue';
            } else {
                // Change the background color based on the current player
                cell.style.backgroundColor = currentPlayer;

                // Create a new circle element
                const circle = document.createElement('div');
                circle.classList.add('circle');

                // Set the circle's background color to the current player's color
                circle.style.backgroundColor = currentPlayer;

                // Append the circle to the cell
                cell.appendChild(circle);

                // Toggle the current player for the next turn
                currentPlayer = (currentPlayer === 'blue') ? 'lightgreen' : 'blue';
            }
        });
    });
}

// Attach event listener to the Start Game button
startGameButton.addEventListener('click', startGame);
