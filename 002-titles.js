const fetch = require('node-fetch')
const createThrottle = require('async-throttle')
const cheerio = require('cheerio').load
const urls = require('fs').readFileSync('./data/001', 'utf8').split('\n')

const throttle = createThrottle(10)

Promise.all(urls.map((url, index) => throttle(async () => {
  const res = await fetch(url)
  const data = await res.text()
  const $ = cheerio(data)
  console.log([$('title').text(), url].join('\t'))
  return;
})))
.then((titles) => console.log())
.catch(e => `ERROR ${e}`)
