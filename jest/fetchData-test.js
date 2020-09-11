import { fetchData, fetchDataNotFn, fetchDataNoResult } from './fetchData';

test('fetchData success: true', () => {
  // 这样写 只是测试fetchData能不能正常执行，如果能正常执行就结束了，不会等待里面的返回结果，就会结束测试。
  fetchData((data) => {
    expect(data).toEqual({
      success: true
    })
  })
});

// 异步写法
test('fetchData success: true', (done) => {
  // 调用了done()函数，才算测试完成
  fetchData((data) => {
    expect(data).toEqual({
      success: true
    })
    done();
  })
});

// 直接返回promise写法
test('fetchDataNotFn success:true',() => {
  return fetchDataNotFn().then((res) => {
    expect(res.data).toEqual({
      success: true
    })
  })
})

test('fetchDataNotFn No.2 success:true',() => {
  // resolves 拿到fetchDataNotFn 发请求拿到的所有结果
  // toMatchObject 是只要前面的数据里面包含 toMatchObject 参数里的内容就可以了
  return expect(fetchDataNotFn()).resolves.toMatchObject({
    data: {
      success: true
    }
  })
})

// 测试接口返回404
test('fetchDataNoResult 404',() => {
  expect.assertions(1); // 要求下面expect被执行1次，否则如果fetchDataNotFn返回结果为真，就只会走then 不会走catch。
  return fetchDataNoResult().catch((e) => {
    expect(e.toString().indexOf('404') > -1).toBe(true)
  })
})
test('fetchDataNoResult 404',() => {
  // 查找不到，就满足rejects.toThrow()的要求 这样写不需要expect.assertions(1)了
  return expect(fetchDataNoResult()).rejects.toThrow();

  // 如果是正确的地址 就会报错  Received promise resolved instead of rejected
  // return expect(fetchDataNotFn()).rejects.toThrow();
})

// await
test('fetchDataNotFn await',async () => {
  // 注意 函数前必须要有async 以及请求必须是promise
  await expect(fetchDataNotFn()).resolves.toMatchObject({
    data: {
      success: true
    }
  })
})

// 失败await
test('fetchDataNoResult await',async () => {
  // 注意 函数前必须要有async 以及请求必须是promise
  await expect(fetchDataNoResult()).rejects.toThrow();
})

// await
test('fetchDataNotFn await',async () => {
  const response = await fetchDataNotFn();
  // 异步等待加载完数据 并判断数据里的data是否是success: true
  expect(response.data).toEqual({
    success: true,
  })
})


// await
test('fetchDataNoResult await',async () => {
  expect.assertions(1); // 要求下面expect被执行1次 这样的话 如果请求正确 测试用例就是错误的, 只有请求错误 测试用例才能执行
  try {
    await fetchDataNoResult();
  } catch (error) {
    expect(error.toString()).toEqual('Error: Request failed with status code 404')
  }
})
