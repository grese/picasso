# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Image.create([
        {user: 'frank', title: 'helleau whirrled', filename: 'sample-1.png'},
        {user: 'schroeder', title: 'givadogabone', filename: 'sample-2.png'},
        {user: 'katie', title: 'look at me', filename: 'sample-3.png'},
        {user: 'the dude', title: 'Oh, the usual. I bowl. Drive around. The occasional acid flashback.', filename: 'sample-4.png'}
])

