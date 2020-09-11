import { runCallback, createObject, getData  } from './demo';
import axios from 'axios';

test('test runCallBack', () => {
  // mock 函数 1.可以捕获函数的调用和返回结果，以及this和调用顺序
  const func = jest.fn();
  // func.mockReturnValue('no once') // 设置每次都返回一样的结果
  runCallback(func);
  expect(func).toBeCalled();
  // console.log(func.mock);
  // { calls: [ [] ], // 调用了几次func，[]里对应参数 
  //   instances: [ undefined ],
  //   invocationCallOrder: [ 1 ], // 函数有可能会被多次传入到同一个方法或者不同方法中，传入进去后并不知道该何时执行，所以这里代表着执行顺序。向runCallback传了1次func函数
  //   results: [ { type: 'return', value: undefined } ] } // 函数每次执行时的返回值是什么，因为jest.fn()没有返回
  // jest.fn(() => { return '123' }); // 这种就属于有返回的，或者 ↓
  func.mockReturnValueOnce('Hi')
  // results:
  // [ { type: 'return', value: undefined },
  //   { type: 'return', value: 'Hi' } ] }
  runCallback(func);
  expect(func.mock.calls.length).toBe(2); // 测试被调用两次
  expect(func.mock.calls[0]).toEqual(['args']); // 测试函数被调用时接收到的参数是否是args
  // 调用func时，调用参数是args, 上面指的是第一次调用的时候参数是args，下面指的是每一次调用的时候参数都是args
  expect(func).toBeCalledWith('args');
  /*   func.mockImplementation(() => {
      console.log('mockImplementation');
      return 'mockImplementation'; 
    })

    等同于

    const func = jest.fn(() => {
      console.log('mockImplementation');
      return 'mockImplementation'; 
    });
  */

 /*  func.mockImplementationOnce(() => {
    return 'mockImplementation1'; 
  });
  runCallback(func);

  func.mockImplementationOnce(() => {
    return 'mockImplementation2'; 
  });
  runCallback(func);

  console.log(func.mock);

  results:
  [ { type: 'return', value: undefined },
    { type: 'return', value: 'Hi' },
    { type: 'return', value: 'mockImplementation1' },
    { type: 'return', value: 'mockImplementation2' } ] } 
  
    比起mockReturnValueOnce，mockImplementationOnce可以在内部写逻辑，所以功能更强悍一点
  */

  /* func.mockReturnThis();
  等价，不过用的不多
  func.mockImplementation(() => {
    return this;
  }); */
})

test('createObject', () => {
  const func = jest.fn();
  createObject(func);
  // console.log(func.mock);
  // instances: [ mockConstructor {} ], 指的是每一次func运行时，func的this指向
})

// 对于前端测接口，只需要确定接口请求发送了就可以，对于后端接口返回什么，不在测试范围内，不然耗费的时间会太多（返回什么应该是后端去做的测试）

jest.mock('axios'); // 让jest对axios做一个模拟，这样就不会去请求真正的数据

test('测试异步',async () => {
  // axios发get请求时去模拟成功的结果是{ data: 'hello' }
  // 使用mock 改变了函数的内部实现 模拟数据
  axios.get.mockResolvedValueOnce({ data: 'hello' }); // 模拟一次 如果写了2个模拟，但是只写了一次Once 就会报错
  axios.get.mockResolvedValue({ data: 'world' }); // 不用onde的话不用写多次, 也可以用多次请求进行不同结果模拟
  // 这时候不会真实请求接口，而是会以后面的内容作为结果
  await getData().then((data) => {
    expect(data).toBe('hello');
  })

  await getData().then((data) => {
    expect(data).toBe('world');
  })
})

/* 总结：
1. 捕获函数的调用和返回结果，以及this和调用顺序
2. 让我们自由的设置返回结果
3. 改变函数内部实现 */

// 测试语句一般称之为断言 expect(...) 断定什么样的语句会有什么样的结果

// toBeUndefined() 断言结果是undefined