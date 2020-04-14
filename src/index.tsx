import * as React from "react"
import { useReducer } from "react"
import { render } from "react-dom"
import { CardGame, Card, Suit, Rank, Guess } from './card-game'

enum ActionType {
  GUESS,
  PLAY,
  INIT_GAME,
}

interface Action {
  type: ActionType;
  data?: any;
}

interface State {
  game: CardGame;
  currentCard: Card;
  rightGuesses: number;
  currentGuess: Guess;
  gameDone: boolean;
}

function initialState(): State {
  const game = new CardGame()
  game.shuffle()
  return {
    game: game,
    currentCard:  game.playCard(),
    rightGuesses: 0,
    currentGuess: null,
    gameDone: false
  }
}

function reducer(state: State, action: Action): State {
  console.log("action: ", action)
  const game =  state.game
  switch (action.type) {
    case ActionType.INIT_GAME:
      return initialState()
    case ActionType.PLAY:
      return {
        ...state,
        currentCard: game.playCard(),
        rightGuesses: game.correctGuesses,
        currentGuess: game.latestGuess,
        gameDone: game.isDone()
      }
    case ActionType.GUESS:
      game.guess(action.data)
      return {
        ...state,
        currentGuess: game.latestGuess,
      }
  }
}

function initGame(): Action{
  return {
    type: ActionType.INIT_GAME
  }
}

function guess(guess): Action {
  return {
    type: ActionType.GUESS,
    data: guess
  }
}

function play(): Action {
  return {
    type: ActionType.PLAY
  }
}

function App(): React.ReactElement | null {
  const [state, dispatch] = useReducer(reducer, undefined, initialState)
  const {currentCard, rightGuesses, currentGuess, gameDone} = state

  return (
    <main>
      <h1>Card Game</h1>
      <h2>{rightGuesses} right guess(es)</h2>
      <CardView card={currentCard} />
      { currentGuess && <p>Current Guess: {currentGuess}</p>}
      {!gameDone && (
        <>
          <button onClick={(): void => dispatch(guess(Guess.HIGHER))}>Higher</button>
          <button onClick={(): void => dispatch(guess(Guess.EQUAL))}>Equal</button>
          <button onClick={(): void => dispatch(guess(Guess.LOWER))}>Lower</button>
          <button onClick={(): void => dispatch(play())}>PlayCard</button>
        </>
      )}
      <button onClick={(): void => dispatch(initGame())}>New Game</button>
    </main>
  )
}

const rankString = {
  [Rank.ACE]: 'ACE',
  [Rank.TWO]: '2',
  [Rank.THREE]: '3',
  [Rank.FOUR]: '4',
  [Rank.FIVE]: '5',
  [Rank.SIX]: '6', 
  [Rank.SEVEN]: '7',
  [Rank.EIGHT]: '8',
  [Rank.NINE]: '9',
  [Rank.TEN]: '10',
  [Rank.JACK]: 'JACK',
  [Rank.QUEEN]: 'QUEEN',
  [Rank.KING]: 'KING',
}

const suitColor = {
  [Suit.SPADES]: 'black',
  [Suit.HEARTS]: 'red',
  [Suit.DIAMONDS]: 'red',
  [Suit.CLUBS]: 'black'
}

const suitSymbols = {
  [Suit.SPADES]: '\u2660',
  [Suit.HEARTS]: '\u2665',
  [Suit.DIAMONDS]: '\u2666',
  [Suit.CLUBS]: '\u2663'
}

function CardView({ card }: React.PropsWithChildren<{ card: Card }>): React.ReactElement {
  return (
    <h3 style={{color: suitColor[card.suit]}}>{`${rankString[card.rank]} ${suitSymbols[card.suit]}`}</h3>
  )
}

render(<App />, document.getElementById("root"))
