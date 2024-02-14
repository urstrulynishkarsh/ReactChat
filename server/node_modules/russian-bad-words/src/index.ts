import { Word } from './types'
import words from './words'

const flatten = (words: Array<Word>): Array<string> =>
  words.reduce<Array<string>>((result, word) => {
    Object.values(word).forEach(wordForm => result.push(wordForm))
    return result
  }, [])

const flatWords = flatten(words)

export { words, flatWords }
