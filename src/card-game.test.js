import { CardGame, Guess, Rank, Suit } from './card-game'

describe('Card Guessing Game', () => {
  test('New Game has 52 remaining cards', () => {
    const game = new CardGame()

    expect(game.remainingCards).toHaveLength(52)
  })

  test('guessing is only possible if a card was played', () => {
    const game = new CardGame()

    game.guess(Guess.HIGHER)
    expect(game.latestGuess).toBeNull()

    game.playCard()
    game.guess(Guess.LOWER)
    expect(game.latestGuess).toEqual(Guess.LOWER)
  })

  test('guessing correctly adds one to correct guesses', () => {
    const cards = [
      { rank: Rank.FIVE, suit: Suit.CLUBS },
      { rank: Rank.FOUR, suit: Suit.HEARTS }
    ]
    const game = new CardGame(cards)
    expect(game.correctGuesses).toEqual(0)
    game.playCard()

    game.guess(Guess.LOWER)
    game.playCard()
    expect(game.correctGuesses).toEqual(1)
  })

  test('guessing wrong adds zero to correct guesses', () => {
    const cards = [
      { rank: Rank.FIVE, suit: Suit.CLUBS },
      { rank: Rank.FOUR, suit: Suit.HEARTS }
    ]
    const game = new CardGame(cards)
    expect(game.correctGuesses).toEqual(0)
    game.playCard()

    game.guess(Guess.HIGHER)
    game.playCard()
    expect(game.correctGuesses).toEqual(0)
  })

  test('guessing wrong adds zero to correct guesses', () => {
    const cards = [
      { rank: Rank.FIVE, suit: Suit.CLUBS },
      { rank: Rank.FOUR, suit: Suit.HEARTS }
    ]
    const game = new CardGame(cards)
    expect(game.correctGuesses).toEqual(0)
    game.playCard()

    game.guess(Guess.HIGHER)
    game.playCard()
    expect(game.correctGuesses).toEqual(0)
  })
})
