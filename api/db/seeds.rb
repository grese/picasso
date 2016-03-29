
# Create mock records for development:

user1 = User.create({email: 'johngrese@me.com', username: 'thedude', password: 'schroeder', confirmation: true})
user1.images.create({title: 'Oh, the usual. I bowl. Drive around. The occasional acid flashback.', filename: 'sample-4.png'})

user2 = User.create({email: 'frankgrese@yahoo.com', username: 'frank', password: 'abcdefg', confirmation: true})
user2.images.create({title: 'helleau whirrled', filename: 'sample-1.png'})

user3 = User.create({email: 'katiegrese@yahoo.com', username: 'katie', password: 'abcdefg', confirmation: true})
user3.images.create({title: 'look at me', filename: 'sample-3.png'})

user4 = User.create({email: 'schroeder@grese.me', username: 'schroeder', password: 'abcdefg', confirmation: true})
user4.images.create({title: 'givadogabone', filename: 'sample-2.png'})


