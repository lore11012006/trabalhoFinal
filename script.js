document.addEventListener('DOMContentLoaded', () => {
    const words = [];
    let displayWord;
    let attempts;
    let lettersTried;

    function startGame() {
        chosenWord = document.getElementById('word-input').value.toLowerCase().trim();

        
        if (!chosenWord || chosenWord.match(/[^a-z]/)) {
            alert('Por favor, insira uma palavra válida (somente letras).');
            return;
        }

        words.push(chosenWord); 

        displayWord = Array(chosenWord.length).fill('_');
        attempts = 6;
        lettersTried = [];

        document.getElementById('word-display').textContent = displayWord.join(' ');
        document.getElementById('attempts').textContent = `Tentativas restantes: ${attempts}`;
        document.getElementById('letters-tried').textContent = `Letras tentadas: `;

        document.getElementById('setup').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        document.getElementById('letter-input').value = '';
    }

    function handleGuess() {
        const letterInput = document.getElementById('letter-input');
        const guessedLetter = letterInput.value.toLowerCase();

        if (!guessedLetter || lettersTried.includes(guessedLetter)) {
            return;
        }

        lettersTried.push(guessedLetter);
        document.getElementById('letters-tried').textContent = `Letras tentadas: ${lettersTried.join(', ')}`;

        if (chosenWord.includes(guessedLetter)) {
            for (let i = 0; i < chosenWord.length; i++) {
                if (chosenWord[i] === guessedLetter) {
                    displayWord[i] = guessedLetter;
                }
            }
        } else {
            attempts--;
        }

        document.getElementById('word-display').textContent = displayWord.join(' ');
        document.getElementById('attempts').textContent = `Tentativas restantes: ${attempts}`;

        if (displayWord.join('') === chosenWord) {
            setTimeout(() => alert('Parabéns! Você venceu!'), 100);
            resetGame();
        } else if (attempts <= 0) {
            setTimeout(() => alert(`Você perdeu! A palavra era "${chosenWord}".`), 100);
            resetGame();
        }

        letterInput.value = '';
    }

    function resetGame() {
        document.getElementById('setup').style.display = 'block';
        document.getElementById('game').style.display = 'none';
        document.getElementById('word-input').value = '';
    }

    document.getElementById('start-game-button').addEventListener('click', startGame);
    document.getElementById('submit-button').addEventListener('click', handleGuess);
    document.getElementById('reset-button').addEventListener('click', resetGame);
});
