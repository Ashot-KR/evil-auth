import { createServer, Model, Response } from 'miragejs'

createServer({
  models: {
    user: Model
  },
  seeds (server) {
    server.create('user', { name: 'John Doe', password: '12345678', email: 'john@doe.com' })
  },
  routes () {
    this.passthrough()

    this.namespace = 'api'
    this.post('/login', (schema, request) => {
      const attrs = JSON.parse(request.requestBody)
      const user = schema.users.findBy(attrs)

      if (user) {
        return user
      } else {
        return new Response(400, {}, { errors: { email: 'User not found' } })
      }
    }, { timing: 1000 })

    this.post('/register', (schema, request) => {
      const attrs = JSON.parse(request.requestBody)

      if (schema.users.findBy({ email: attrs.email })) {
        return new Response(400, {}, { errors: { email: 'Email already registered' } })
      }

      return schema.users.create(attrs)
    }, { timing: 1000 })
  }
})
