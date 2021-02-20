import { generateConfig } from "./snapshot";
// 快照测试

// test('generateConfig', () => {
//   expect(generateConfig()).toEqual({
//     server: 'http://localhost',
//     prot: 8080
//   });
// })

// 如果写成这样↑，那么generate改，jest随之也要改，可以写一段代码来代替这段代码。

// test('generateConfig', () => {
//   expect(generateConfig()).toMatchSnapshot(); // 会自动帮我们生成一个快照，测试配置文件时非常好用
// })
// 如果真的要改快照，按w，按u更新快照

// 按u会全部更新，按i会交互式的一个个更新，然后只提示第一个快照，此时可按一个u去更新快照，紧接着再进入第二个快照（一个函数一个快照）

// 可以用这种快照测试UI组件展示（单元测试）

// 如果每次返回内容都发生改变，例如对象里有一个
// time: new Date()
// 这样每次测试用例都不能通过

// test('generateConfig', () => {
//   expect(generateConfig()).toMatchSnapshot({
//     time: expect.any(Date) // 这样即使变化了 快照也能通过 里面也可以写Number、String等类型
//   })
// })

// 安装prettire 把生成的快照放到.test.js文件下
test("generateConfig", () => {
  // 修改为toMatchInlinenapshot
  expect(generateConfig()).toMatchInlineSnapshot(
    {
      time: expect.any(Date) // 这样即使变化了 快照也能通过 里面也可以写Number、String等类型
    },
    `
    Object {
      "prot": 8080,
      "server": "http://localhost",
      "time": Any<Date>,
    }
  `
  );
});

// 按s可以跳过这个快照，进入下一个快照
