// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('jianshu')

// Create a new document in the collection.
db.getCollection('users').insertOne({
  username: 'admin',
  password: '123456',
})
