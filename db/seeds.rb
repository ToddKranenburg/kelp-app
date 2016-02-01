# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.destroy_all
Review.destroy_all
Business.destroy_all

# 
# business_ids = [];
# 3.times do |i|
#   biz = Business.new(name: "Biz #{i}", lat: 1.3, lng: 2.5)
#   biz.save!
#   business_ids.push(biz.id)
# end
#
# 5.times do
#   user = User.new(username: Faker::Hipster.word, password: "password")
#   user.save!
#   3.times do |j|
#     user.reviews.create!(body: Faker::Hipster.paragraph, rating: 3, business_id: business_ids[j])
#   end
# end
# nemo = User.create!(username: "Nemo", password: "Password")
# biz = Business.create!(name: "Biz", lat: 1.1, lng: 2.3)
# biz.reviews.create!(body: "body", rating: 5, author_id: nemo.id)
