// @ts-ignore
import fs from 'fs'
import JustNoCaptcha from '../ts/justnocaptcha'

(async () => {

  JustNoCaptcha.challengeSalt = 'randomtestsalt'
  const puzzles = 50
  const difficulty = 4
  // create fixed challenges and solutions
  const challenges = { 'challenges': [] as any, 'solutions': [] as any }
  for (let i = 0; i < 10; i++) {
    const challenge = JustNoCaptcha.createChallenge(puzzles, difficulty)
    challenges.challenges.push(challenge)
    challenges.solutions.push({ solution: await JustNoCaptcha.solveChallenge(challenge) })
  }
  fs.writeFileSync(__dirname + '/challenges.json', JSON.stringify(challenges))
})()