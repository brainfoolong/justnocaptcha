import JustNoCaptcha from '../ts/justnocaptcha'

(async () => {
  // @ts-ignore
  require(__dirname + '/tests-js.js')(JustNoCaptcha, "ts")
})()