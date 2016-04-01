
# Create mock records for development:

user1 = User.create({email: 'john@thebeatles.com', username: 'johnlennon', password: 'password', confirmation: true})
user1.images.create([
                        {title: 'I Am the Walrus', filename: 'sample-1.png'},
                        {title: 'Help!', filename: 'sample-2.png'},
                        {title: 'Come Together', filename: 'sample-3.png'}
                    ])

user2 = User.create({email: 'paul@thebeatles.com', username: 'paulmccartney', password: 'password', confirmation: true})
user2.images.create([
                        {title: 'Helter Skelter', filename: 'sample-4.png'},
                        {title: 'Something', filename: 'sample-5.png'},
                        {title: 'Its All Too Much', filename: 'sample-6.png'}
                    ])

user3 = User.create({email: 'george@thebeatles.com', username: 'georgeharrison', password: 'password', confirmation: true})
user3.images.create([
                        {title: 'Taxman', filename: 'sample-7.png'},
                        {title: 'Hey Jude', filename: 'sample-8.png'},
                        {title: 'A Day In The Life', filename: 'sample-9.png'}
                    ])

user4 = User.create({email: 'ringo@thebeatles.com', username: 'ringostarr', password: 'password', confirmation: true})
user4.images.create([
                        {title: 'Octopus\'s Garden', filename: 'sample-10.png'},
                        {title: 'Revolution', filename: 'sample-11.png'},
                        {title: 'Hello Goodbye', filename: 'sample-12.png'}
                    ])

me = User.create({email: 'john@grese.me', username: 'grese', password: 'password', confirmation: true})
me.images.create([
                        {title: 'Beatle Mania', filename: 'sample-13.png'},
                        {title: 'Quarrymen', filename: 'sample-14.png'},
                        {title: 'Yoko', filename: 'sample-15.png'}
                    ])

