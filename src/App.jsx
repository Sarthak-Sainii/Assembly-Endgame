import React from 'react'
import { languages } from './languages'
import Chips from './component/Chips'
import { rendomWord , getFarewellText} from './utils'
import Confetti from 'react-confetti'
const App = () => {
  const [chips, setChips] = React.useState(languages)
  const [currentWord, setCurrentWord] = React.useState(()=>rendomWord())
  const [guessedLetters, setGuessedLetters] = React.useState([])
  const wrongGuessCount = guessedLetters.filter(letter=>
    !currentWord.includes(letter)
  ).length
  const isGameWon = currentWord.split('').every(letter=>
    guessedLetters.includes(letter)
  )
  const lastGuessed = guessedLetters[guessedLetters.length-1]
  const isLastGuessWrong = lastGuessed && !currentWord.includes(lastGuessed)
  
  const isLost = wrongGuessCount >= languages.length-1
  const gameOver= isGameWon||isLost
  const alphabets = "abcdefghijklmnopqrstuvwxyz"
  const keybord = [...alphabets].map((letter,i)=>{
        const isGuessed = guessedLetters.includes(letter)
        const isCorrect = isGuessed && currentWord.includes(letter)
        const isWrong = isGuessed && !currentWord.includes(letter)
    let styles = {}
     if(isCorrect){
      styles ={
        backgroundColor: "#10A95B"
      }
     } else if(isWrong){
      styles={
        backgroundColor: "#EC5D49"
      }
     }
    return(
      <button 
      style={styles}
      disabled={gameOver}
      onClick={()=>letterClick(letter)} 
      key={i}>{letter.toUpperCase()}</button>
    )
  }

    
  )
  const elements = chips.map((item,i)=>{ 
    const className = wrongGuessCount>i?"chip lost":"chip"
    return (
      <Chips 
      className={className}
      key = {item.name}
      name={item.name}
      backgroundColor={item.backgroundColor}
      color = {item.color}
    ></Chips>
    )
  }
    
  )
  const word = [...currentWord].map((itm, i)=>{
    const styles={
      color: isLost && !guessedLetters.includes(itm)?"#EC5D49":null
    }
    
    return(<span style={styles} key = {i}>{isLost?itm.toUpperCase():guessedLetters.includes(itm)?itm.toUpperCase():" "}</span>)
  }

    
  )
  function letterClick(letter){
    setGuessedLetters(pre=>
      pre.includes(letter)? pre:[...pre,letter]
    )

  }
  function render(){
    if(!gameOver && isLastGuessWrong){
      return (
        <p>{getFarewellText(languages[wrongGuessCount-1].name)}</p>
      )
    }
    if(isGameWon){
      return(
      <>
        <h2>You win!</h2>
          <p>Well done! 🎉</p>
      </>)
    }if(isLost){
        return(
      <>
        <h2>Game Over</h2>
          <p>You lose! Better start learning Assembly 😭</p>
      </>)
      }
  }
  function reset(){
    setCurrentWord(rendomWord())
    setGuessedLetters([])
  }
  return (

    <main>
      {isGameWon && <Confetti
                        recycle={false}
                        numberOfPieces={1000}
                    />}
      <header>
         <h1>Assembly: Endgame</h1>
                <p>Guess the word within 8 attempts to keep the
                programming world safe from Assembly!</p>
      </header>
      <section 
        
        style={
  !isLost && !isGameWon
    ? {backgroundColor:"#7A5EE7", 
      
    }
    : isLost
      ? { backgroundColor: "#BA2A2A" }
      : { backgroundColor: "#10A95B" }
}
 className="game-status">
                {render()}
            </section>
            <section className='language-chips'>
              {elements}
            </section>
            <section className='letter-cont' >
              {word}
            </section>
            <section className='keybord'>{keybord}</section>
            {gameOver && <button onClick={reset} className='new-game' >New Game</button>}
    </main>
  )
}

export default App
