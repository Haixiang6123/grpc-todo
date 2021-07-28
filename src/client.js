const path = require('path')
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const PROTO_PATH = path.resolve(__dirname, 'todo.proto')

const packageDefinition = protoLoader.loadSync(PROTO_PATH)
const todoPkg = grpc.loadPackageDefinition(packageDefinition).todo

const main = () => {
  const client = new todoPkg.TodoService('localhost:50051', grpc.credentials.createInsecure())

  client.getTodos({}, (err, response) => {
    console.log('所有 todo: ', response.todos)
  })
}

main()
