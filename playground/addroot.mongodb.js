use('jianshu')
db.createUser({ user: 'root', pwd: '123456', roles: [{ role: 'root', db: 'admin' }] })