import { keys, chain, CollectionChain, isEmpty, concat, isNull, shuffle } from 'lodash'

export enum Guess {
  HIGHER = 'Higher',
  LOWER = 'Lower',
  EQUAL = 'Equal',
}

export enum Rank {
  ACE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
  SEVEN = 7,
  EIGHT = 8,
  NINE = 9,
  TEN = 10,
  JACK = 11,
  QUEEN = 12,
  KING = 13
}

export enum Suit {
  SPADES = 'a',
  HEARTS = 'b',
  DIAMONDS = 'c',
  CLUBS = 'd'
}

export function chainEnum (e: any): CollectionChain<string> {
  return chain(keys(e)).filter(key => isNaN(Number(key)))
}

export interface Card {
  suit: Suit;
  rank: Rank;
}

function compareCards (card1: Card, card2: Card): number {
  return card1.rank - card2.rank
}

function initDeck (): Array<Card> {
  return chainEnum(Suit)
    .flatMap(suit =>
      chainEnum(Rank)
        .map(rank => ({
          suit: Suit[suit],
          rank: Rank[rank]
        }))
        .value()
    )
    .value()
}

export class CardGame {
  remainingCards: Array<Card> = []
  playedCards: Array<Card> = []
  latestGuess: Guess = null
  correctGuesses = 0

  constructor (cards: Array<Card> = []) {
    this.remainingCards = !isEmpty(cards) ? cards : initDeck()
  }

  shuffle (): void {
    this.remainingCards = shuffle(this.remainingCards)
  }

  guess (guess: Guess): void {
    if(this.isDone()) return
    if (isEmpty(this.playedCards)) return
    this.latestGuess = guess
  }

  playCard (): Card {
    if(this.isDone()) return
    if (!isNull(this.latestGuess)) {
      this.correctGuesses += this._checkGuess()
      this.latestGuess = null
    }
    const [card, ...remainingCards] = this.remainingCards
    this.remainingCards = remainingCards
    this.playedCards = concat(this.playedCards, card)
    return card
  }

  isDone (): boolean {
    return this.remainingCards.length <= 0
  }

  _checkGuess (): number {
    let correctGuess
    const result = compareCards(
      this.remainingCards[0],
      this.playedCards[this.playedCards.length - 1]
    )
    if (result > 0) correctGuess = Guess.HIGHER
    else if (result < 0) correctGuess = Guess.LOWER
    else correctGuess = Guess.EQUAL

    return correctGuess == this.latestGuess ? 1 : 0
  }

}
