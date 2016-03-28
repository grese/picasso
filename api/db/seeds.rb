
# Create mock records for development:

user1 = User.create({email: 'johngrese@me.com', username: 'thedude', encrypted_password: 'ABCDEF', salt: '123'})
user1.images.create({title: 'Oh, the usual. I bowl. Drive around. The occasional acid flashback.', filename: 'sample-4.png'})

user2 = User.create({email: 'frankgrese@yahoo.com', username: 'frank', encrypted_password: 'ABCDEF', salt: '123'})
user2.images.create({title: 'helleau whirrled', filename: 'sample-1.png'})

user3 = User.create({email: 'katiegrese@yahoo.com', username: 'katie', encrypted_password: 'ABCDEF', salt: '123'})
user3.images.create({title: 'look at me', filename: 'sample-3.png'})

user4 = User.create({email: 'schroeder@grese.me', username: 'schroeder', encrypted_password: 'ABCDEF', salt: '123'})
user4.images.create({title: 'givadogabone', filename: 'sample-2.png'})


