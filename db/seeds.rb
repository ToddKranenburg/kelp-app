# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.destroy_all
Review.destroy_all


5.times do
  user = User.new(username: Faker::Hipster.word, password: "password")
  user.save!
  3.times do
    user.reviews.create!(body: Faker::Hipster.paragraph, rating: 3)
  end
end
