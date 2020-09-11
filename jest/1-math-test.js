import { add } from './math.js'
// const math = require('./math.js');
// const { add } = math;

test('测试加法 1 + 1', () => {
  expect(add(1, 1)).toBe(2)
})
