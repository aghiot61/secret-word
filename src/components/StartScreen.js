import "./StartScreen.css"

const StartScreen = ({startGame}) => {
  return (
    <div className='start'>
      <h1>Secret <br/><span className="word">Word</span></h1>
      <p>Clique no botão para começar a jogar</p>
      <button onClick={startGame}>Começar a jogar</button>

    </div>
  )
}

export default StartScreen
