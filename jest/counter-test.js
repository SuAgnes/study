import Counter from './counter';

// const counter = new Counter;
 
// test('test add', () => {
//   counter.add();
//   expect(counter.number).toBe(1);
// })

// test('test minus', () => {
//   counter.minus();
//   expect(counter.number).toBe(-1);
// })

// ↑↑ 这样测试 两个counter之间会相互影响

let counter = null; 

beforeAll(() => {
  // beforeAll 在所有测试用例执行之前执行
})

beforeEach (() => {
  // 在每个测试用例执行之前都会执行beforeEach
   counter = new Counter();
})

afterEach (() => {
  // 在每个测试用例执行之后都会执行afterEach
})

afterAll(() => {
  // afterAll 在所有测试用例都执行之后调用
})

// test('test add', () => {
//   counter.add();
//   expect(counter.number).toBe(1);
// })

// test('test minus', () => {
//   counter.minus();
//   expect(counter.number).toBe(-1);
// })

// describe 分组

describe('增加相关', () => {
  test('test add', () => {
    counter.add();
    expect(counter.number).toBe(1);
  })

  test('test addTwo', () => {
    counter.addTwo();
    expect(counter.number).toBe(2);
  })
})

describe('减少相关', () => {
  test('test minus', () => {
    counter.minus();
    expect(counter.number).toBe(-1);
  })

  test('test minusTwo', () => {
    counter.minusTwo();
    expect(counter.number).toBe(-2);
  })
})

// describe('不写的话，相当于最外层包了一个describe', () => {})

// 一个describe下面的钩子函数对下面所有的测试用例都有效，每个describe内部也都拥有自己相应的生命周期函数

// 在只想测某一个东西的时候，可以使用test.only 忽略其他测试的执行，只测试这一个测试用例
test.only('test minusTwo', () => {
  counter.minusTwo();
  expect(counter.number).toBe(-2);
})

// 在测试准备的时候一定要把代码写到生命周期里，因为在describe写的代码，如果不在生命周期里，或者说不在test()测试用例中的话，那describe里的逻辑就会在所有测试用例执行之前最先被执行，之后再去执行钩子函数