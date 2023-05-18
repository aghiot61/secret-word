import "./GameOver.css"

const GameOver = ({restart, score}) => {
  return (
    <div>
      <h1>Você perdeu!</h1>
      <h2>A sua pontuação foi: <span>{score}</span></h2>
      <button onClick={restart}>tentar novamente</button>
    </div>
  )
}

export default GameOver