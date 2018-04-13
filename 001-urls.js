// deps
const fetch = require('node-fetch')
const createThrottle = require('async-throttle')
const cheerio = require('cheerio').load

// code
const throttle = createThrottle(8)
const N = 25; 
const pages = Array.apply(null, {length: N}).map(Number.call, Number)
console.log(N, pages)
const urls = pages.map(e => `https://www.theguardian.com/money/series/letsmoveto?page=${e}`);
Promise.all(urls.map((url, index) => throttle(async () => {
  // console.log('Processing', url)
  const res = await fetch(url)
  const data = await res.text()
  const $ = cheerio(data)
  const e = $('.fc-item__content a').each((a, i) => console.log($(i).attr('href')))
  return 1;
})))
.then((titles) => console.log())
