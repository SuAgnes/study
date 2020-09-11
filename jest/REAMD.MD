npm i jest -D (只在开发环境中使用 )

```json
 "scripts": {
    "test": "jest"
  },
```

jest会查找目录下以test.js为结尾的文件，然后运行

jest 做单元测试（模块测试）与集成测试（多个模块测试），所以必须导出模块才能做测试

修改jest配置
npx jest --init 

npx jest --coverage 测试覆盖率说明

运行此命令后会生成coverage目录，> lcov-report > index.html

如果想使用ESModule引入 需要引入babel
```
  npm i @babel/core @babel/preset-env -D
```

在执行 npm run jest 的时候，jest 内部的插件 babel-jest 会检测当前环境是否安装了 babel-core 如果安装了就去拿.bablerc的配置

如果有配置 就会在测试运行前结合babel把代码做转化


监听所有文件变化，文件变化会重新测试全部测试用例
```json
  "test": "jest --watchAll"
```

安装code命令行 可直接打开某文件

```
  install code command
```

jest 命令行安装

f: 例如，只运行我们刚刚报错 修改过的测试用例，按住f 可进入之前不通过的测试用例。再次点击 f 可退出

o: 当拥有很多个测试用例的时候，只测试当前被改变文件相关的测试用例, 但是这个模式需要引入git帮忙记录文件的改变

或者

```json
  "test": "jest --watch"
```

这样是默认直接进入o模式，在这个模式下执行npm run test，o模式会消失（因为已经在o模式中），取而代之多了a模式，a代表all模式 也就是watchAll

t: 根据正则来过滤哪些测试需要执行, 其实就是根据测试用例的名字来过滤想要执行的测试用例

q: 退出代码监控

Enter: 重新运行测试

p: 通过p模式可以做一些筛选 筛选运行的测试用例文件