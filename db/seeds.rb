# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Area.create!([{
    title: "breath"
},
{
    title: "health"
},
{
    title: "running"
}])

User.create!([{
    username: "david",
    password: "david"
},
{
    username: "user",
    password: "user"
},
{
    username: "lexi",
    password: "lexi"
},
{
    username: "louie",
    password: "louie"
}])


Protocol.create!([{
    img_url: "calm energy",
    post_body: "today is the day that we move",
    area_id: 1,
    user_id: 1
}])