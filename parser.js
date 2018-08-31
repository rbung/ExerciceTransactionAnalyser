const csv = require('csv-parser')
const fs = require('fs')

async function analyse({ filePath = 'batch.csv', threesholds = [20] }) {
  const results = threesholds.map(threeshold => ({
    threeshold,
    count: 0,
    value: 0,
  }))
  const stream = fs
    .createReadStream(filePath)
    .pipe(csv({ separator: ';' }))
    .on('data', function({ amount }) {
      results.map(result => {
        if (-amount > result.threeshold) {
          result.count++
          result.value += -amount
        }
      })
    })

  const resultPromise = await new Promise((resolve, reject) => {
    stream.on('end', () => resolve(results))
    stream.on('error', () => reject('error while analysing data'))
  })

  return resultPromise
}

module.exports = {
  analyse,
}
