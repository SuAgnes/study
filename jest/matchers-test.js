// test('测试加法 1 + 1', () => {
//   // toBe 匹配器 但是不能匹配引用类型的内容是否相同 只能匹配指针
//   expect(2).toBe(2)
// })

// const obj = { a: 1 }
// test('测试对象内容相等', () => {
//   // totoEqualBe 匹配引用类型内容是否相等
//   expect(obj).toEqual({ a: 1 });
// })

// const n = null;
// const u = undefined;
// test('测试对象为Null', () => {
//   // 匹配判断是否为null（undefined不适用）
//   expect(n).toBeNull();
// })

// test('测试对象为undefind', () => {
//   // 匹配判断是否为undefined（null不适用 严格判断）
//   expect(u).toBeUndefined();
// })


// test('测试对象为defind', () => {
//   // 匹配为定义过的
//   expect(n).toBeDefined(); 
// })

// test('测试对象为真', () => {
//   // 匹配为真
//   expect(obj).toBeTruthy(); 
// })

// test('测试对象为假', () => {
//   // 匹配为真
//   expect(u).toBeFalsy(); 
// })

// test('测试对象是否不是xx', () => {
//   // not 匹配器 例如 expect(u).not.toBeFalsy(); = expect(obj).toBeTruthy(); 
//   expect(obj).not.toBeFalsy(); 
// })

// // 数字相关匹配器
// const num = 10;

// test('匹配是否大于某个数字', () => {
//   // 匹配是否大于某个数字
//   expect(num).toBeGreaterThan(9); 
// })


// test('匹配是否小于某个数字', () => {
//   // 匹配是否小于某个数字
//   expect(num).toBeLessThan(11);
// })

// test('匹配大于等于某个数字', () => {
//   // 匹配大于等于某个数字
//   expect(num).toBeGreaterThanOrEqual(8);
// })

// test('匹配小于等于某个数字', () => {
//   // 匹配小于等于某个数字
//   expect(num).toBeLessThanOrEqual(12);
// })

// test('匹配相应的浮点数', () => {
//   // 匹配相应的浮点数 在使用浮点运算时 可使用toBeCloseTo代替toBeEqual
//   expect(0.1 + 0.2).toBeCloseTo(0.3);
// })

// String

test('匹配相应字符串', () => {
  // 匹配某个字符串中是否有相应字符串
  const str = 'hello world'
  expect(str).toMatch('hello');
})

// Array, Set

test('匹配数组是否包含某一个值/对象', () => {
  // 匹配某个字符串中是否有相应字符串, 引用类型不可
  const arr = ['a', 'b', 'c', { a: 1 }]
  const setArr = new Set(arr);
  expect(arr).toContain('a');
  expect(setArr).toContain('a');
})

// Error

// test('异常匹配', () => {
//   // 匹配是否抛出了异常
//   const err = () => { throw new Error('error')}
//   expect(err).toThrow();
// })

// test('不抛出异常', () => {
//   const fn = () => {};
//   expect(fn).not.toThrow();
// })

test('测试异常内容', () => {
  const err = () => { throw new Error('error')}
  expect(err).toThrow('error');
  expect(err).toThrow(/\w+/); // 正则也可以
})

