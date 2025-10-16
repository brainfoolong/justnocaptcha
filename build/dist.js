const fs = require('fs')

const  UglifyJS  = require('uglify-js')

const minimi = function (code) {
  return UglifyJS.minify(code).code
}

const packageJson = JSON.parse(fs.readFileSync(__dirname + '/../package.json').toString())
const composerFile = __dirname + '/../composer.json'
const serverFile = __dirname + '/../js/justnocaptcha.js'
const serverFileModule = __dirname + '/../js/justnocaptcha-module.js'
const browserFile = __dirname + '/../js/justnocaptcha-browser.js'
const browserSlimFile = __dirname + '/../js/justnocaptcha-browser-slim.js'
const docsScriptFile = __dirname + '/../docs/scripts/justnocaptcha-browser.min.js'
let contents = fs.readFileSync(serverFile).toString().replace('export default class JustNoCaptcha', 'class JustNoCaptcha')
contents = '// JustNoCaptcha v' + packageJson.version + ' @ ' + packageJson.homepage + '\n' + contents
contents += `
if (typeof module !== 'undefined' && module.exports) {
  module.exports = JustNoCaptcha
}
`

let contentsCommonJs = contents
fs.writeFileSync(serverFile, contentsCommonJs)
fs.writeFileSync(serverFile.replace('.js', '.min.js'), minimi(contentsCommonJs))

let contentsModule = contents.replace(/^class JustNoCaptcha/m, 'export default class JustNoCaptcha')
fs.writeFileSync(serverFileModule, contentsModule)
fs.writeFileSync(serverFileModule.replace('.js', '.min.js'), minimi(contentsModule))

let contentsBrowser = contents.replaceAll(/\s*\/\/\s*browser-strip-start.*?\/\/\s*browser-strip-end */gis, '')
fs.writeFileSync(browserFile, contentsBrowser)
fs.writeFileSync(browserFile.replace('.js', '.min.js'), minimi(contentsBrowser))
fs.writeFileSync(docsScriptFile, minimi(contentsBrowser))

let contentsBrowserSlim = contentsBrowser.replaceAll(/\s*\/\/\s*browserslim-strip-start.*?\/\/\s*browserslim-strip-end */gis, '')
fs.writeFileSync(browserSlimFile, contentsBrowserSlim)
fs.writeFileSync(browserSlimFile.replace('.js', '.min.js'), minimi(contentsBrowserSlim))

const composerData = JSON.parse(fs.readFileSync(composerFile).toString())
composerData.version = packageJson.version
fs.writeFileSync(composerFile, JSON.stringify(composerData, null, 2))