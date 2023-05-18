// CSS
import "./App.css";

// React hooks
import { useCallback, useEffect, useState } from "react";

// Words list
import { wordsList } from "./data/words";

// Components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

// Fases

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(4);
  const [score, setScore] = useState(0);

  // Escolhendo uma categoria

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

      // Escolhendo uma palavra

    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  }, [words]);

  // Começar o jogo
  const startGame = useCallback(() => {
    // Limpando as letras
    clearLetterStates();

    // escolhendo uma palavra

    const { word, category } = pickWordAndCategory();

    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase());

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  // Checagens de acertos

  const verify = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    // Checando se a letra já foi usada

    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // Colocando a letra ou removendo chances

    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  // Limpando o jogo

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  // Checando as chances

  useEffect(() => {
    if (guesses <= 0) {

      // Perdeu o jogo
      clearLetterStates();

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  // Checando vitória

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    // vitória

    if (guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name) {

      // Pontuação
      setScore((actualScore) => (actualScore += 100));

      // Resetando o jogo com uma palavra nova

      startGame();
    }
  },[guessedLetters, letters, startGame, gameStage]);

  // Resetando o jogo

  const restart = () => {
    setScore(0);
    setGuesses(4);

    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verify={verify}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver restart={restart} score={score} />}
    </div>
  );
}

export default App;
