const parser = require('./parser')

test('should work with default parameters', async () => {
  expect.assertions(1)
  const result = await parser.analyse({})
  expect(result).toEqual([{ threeshold: 20, value: 552.29, count: 11 }])
})

test('should work with 2 threesholds', async () => {
  expect.assertions(1)
  const result = await parser.analyse({ threesholds: [20, 50] })
  expect(result).toEqual([
    { threeshold: 20, value: 552.29, count: 11 },
    { threeshold: 50, value: 332.61, count: 4 },
  ])
})
