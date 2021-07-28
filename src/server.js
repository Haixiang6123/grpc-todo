const path = require('path')
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const PROTO_PATH = path.resolve(__dirname, 'todo.proto')

const packageDefinition = protoLoader.loadSync(PROTO_PATH)
const todoPkg = grpc.loadPackageDefinition(packageDefinition).todo

// DB
const todos = [
  { id: 1, title: '第一条', desc: '去吃饭' },
  { id: 2, title: '第二条', desc: '去干活' },
  { id: 3, title: '第三条', desc: '去搬砖' },
]

// 方法实现
const getTodosImpl = (call, callback) => {
  callback(null, { todos });
}
const addTodoImpl = (call, callback) => {
  const { todo } = call.request
  todos.push(todo)
  callback(null, { todos })
}

const main = () => {
  const server = new grpc.Server()
  server.addService(todoPkg.TodoService.service, {
    getTodos: getTodosImpl,
    addTodo: addTodoImpl,
  })
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start()
  })
}

main()
