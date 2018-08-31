const parser = require('./parser')

parser.analyse({ threesholds: [20, 50] }).then(console.log)
