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
Thumb.destroy_all
SchoolMembership.destroy_all


nemo = User.new(username: "Nemo", password: "Password", profile_picture: File.open("#{Rails.root}/app/assets/images/nemo.jpg"))
dory = User.new(username: "Dory", password: "password", profile_picture:  File.open("#{Rails.root}/app/assets/images/dory.jpg"))
flo = User.new(username: "Flo", password: "password", profile_picture:  File.open("#{Rails.root}/app/assets/images/flo.jpg"))
bruce = User.new(username: "Bruce", password: "password", profile_picture:  File.open("#{Rails.root}/app/assets/images/bruce.jpg"))
marlin = User.new(username: "Marlin", password: "password", profile_picture:  File.open("#{Rails.root}/app/assets/images/marlin.jpg"))

nemo.save!
dory.save!
flo.save!
bruce.save!
marlin.save!

intro = Business.new(name: "A Business", place_id: "ChIJAy6jC-ZwokRy1FScZTNJcA", lat: 40.7341636, lng: -74.01114410000002)
pier = Business.new(name: "Pier 46", place_id: "ChIJAy6jC-xZwokRy1FScZTNJcA", lat: 40.7341636, lng: -74.01114410000002)
ferry = Business.new(name: "East River Ferry", place_id: "ChIJkxCEgGZZwokR7E2ydS3SMLA", lat: 40.7208292, lng: -73.96450859999999)
cafe = Business.new(name: "The River Cafe", place_id: "ChIJ2QZOdTpawokRU_eN_EPJaX8", lat: 40.703684, lng: -73.99486100000001)
lake = Business.new(name: "The Central Park Lake", place_id: "ChIJh8npio1YwokRJqTUnnqfofg", lat: 40.7762233, lng: -73.9730854)
manhattan_aquariums = Business.new(name: "Manhattan Aquariums", place_id: "ChIJlyVENrNZwokRoEiEPC3DfSg", lat: 40.7568475, lng: -73.99910569999997)
new_york_aquarium = Business.new(name: "New York Aquarium", place_id: "ChIJcRMeDzZEwokR3NsXUDpO9UU", lat: 40.57400440000001, lng: -73.97590129999998)
cpzoo = Business.new(name: "Central Park Zoo", place_id: "ChIJaWjW_PFYwokRFD8a2YQu12U", lat: 40.767778, lng: -73.9718335)
nywatertaxi = Business.new(name: "New York Water Taxi", place_id: "ChIJjWqTarVZwokRDU9WhVAjFuE", lat: 40.7603695, lng: -74.00330810000003)
sushi = Business.new(name: "Ooki Sushi", place_id: "ChIJOyYZTbtYwokRCaK3C_Zm9Sc", lat: 40.7802711, lng: -73.95267209999997)

intro.save!
pier.save!
ferry.save!
cafe.save!
lake.save!
manhattan_aquariums.save!
new_york_aquarium.save!
cpzoo.save!
nywatertaxi.save!
sushi.save!

ferry.thumbs.create!(image: File.open("#{Rails.root}/app/assets/images/ferry.jpg"))
ferry.thumbs.create!(image: File.open("#{Rails.root}/app/assets/images/ferry_2.jpg"))
pier.thumbs.create!(image: File.open("#{Rails.root}/app/assets/images/pier.jpg"))
pier.thumbs.create!(image: File.open("#{Rails.root}/app/assets/images/pier_2.jpg"))
cafe.thumbs.create!(image: File.open("#{Rails.root}/app/assets/images/cafe.jpg"))
cafe.thumbs.create!(image: File.open("#{Rails.root}/app/assets/images/cafe_2.jpg"))
lake.thumbs.create!(image: File.open("#{Rails.root}/app/assets/images/lake.jpg"))
lake.thumbs.create!(image: File.open("#{Rails.root}/app/assets/images/lake_2.jpg"))
manhattan_aquariums.thumbs.create!(image: File.open("#{Rails.root}/app/assets/images/manhattan_aquariums.jpg"))
manhattan_aquariums.thumbs.create!(image: File.open("#{Rails.root}/app/assets/images/manhattan_aquariums_2.jpg"))
new_york_aquarium.thumbs.create!(image: File.open("#{Rails.root}/app/assets/images/new_york_aquarium.jpg"))
new_york_aquarium.thumbs.create!(image: File.open("#{Rails.root}/app/assets/images/new_york_aquarium_2.jpg"))
cpzoo.thumbs.create!(image: File.open("#{Rails.root}/app/assets/images/cpzoo.jpg"))
cpzoo.thumbs.create!(image: File.open("#{Rails.root}/app/assets/images/cpzoo_2.jpg"))
nywatertaxi.thumbs.create!(image: File.open("#{Rails.root}/app/assets/images/nywatertaxi.jpg"))
nywatertaxi.thumbs.create!(image: File.open("#{Rails.root}/app/assets/images/nywatertaxi_2.jpg"))
sushi.thumbs.create!(image: File.open("#{Rails.root}/app/assets/images/sushi.jpg"))
sushi.thumbs.create!(image: File.open("#{Rails.root}/app/assets/images/sushi_2.jpg"))



intro_body = "Welcome to Kelp, a Yelp clone for fish! Users of Kelp can review their favorite aquatic (or terrestrial) businesses, add new businesses to the site, and upload photos for businesses and profiles. Take a swim around the site and enjoy."
pier_body = "What a lovely pier! Despite the fact that it juts into a major through-way in the hudson river in a rather unfortunate way, Pier 46 is worth swimming past. The grass is always so green. It almost makes me wish I had lungs!"
ferry_body = "What a monstrous, destructive piece of machinery. The East River Ferry has no regard for its gilled-neighbors - it regularly plows through feeding waters and scares away all the delicious plankton! I can't speak to what an experience aboard the ferry is like considering they do not offer passage to fish, but from what I have seen it is as awful atop the ship as it is below."
river_cafe = "Despite its name, this restaurant is, in fact, NOT A RIVER nor is it even in a river. It is close to one, however. And in the evening when the sun is low over New York harbor, there is no place I would rather be than the River Cafe, granted that I have come equipped with adequate water."
lake_body = "I spent a weekend in the lake in Central Park and LOVED IT. Everyone there is so friendly and shiny. It was a wonderful place to spend a few days and I would gladly go back. Check out the algae forest in the northern quadrant if you make it up there!"
lake_shark = "too small..."
pier_shark = "flopped onto it once... it was ok..."
ferry_shark = "so loud..."
river_shark = "service was poor... tried to eat a waiter..."
pier_dory = "Great spot! Found a little patch of algae to nap in under the pier. Best nap of my life."
sushi_shark = "YUMMM!!"
sushi_flo = "Watch out - this place is full of sharks!"
sushi_dory = "I was pleasantly surprised by the food here. Was told by a friend to \"never ever\" go here. Not sure why! The food was delicious - why have I never tried sushi before!? I've really been missing out. Will definitely be returning here."

pier.reviews.create!(body: pier_body, rating: 4, author_id: flo.id)
pier.reviews.create!(body: pier_dory, rating: 5, author_id: dory.id)
ferry.reviews.create!(body: ferry_body, rating: 2, author_id: flo.id)
cafe.reviews.create!(body: river_cafe, rating: 4, author_id: dory.id)
lake.reviews.create!(body: lake_body, rating: 5, author_id: flo.id)
intro.reviews.create!(body: intro_body, rating: 5, author_id: nemo.id)
lake.reviews.create!(body: lake_shark, rating: 1, author_id: bruce.id)
pier.reviews.create!(body: pier_shark, rating: 2, author_id: bruce.id)
ferry.reviews.create!(body: ferry_shark, rating: 1, author_id: bruce.id)
cafe.reviews.create!(body: river_shark, rating: 1, author_id: bruce.id)
sushi.reviews.create!(body: sushi_flo, rating: 1, author_id: marlin.id)
sushi.reviews.create!(body: sushi_dory, rating: 5, author_id: dory.id)
sushi.reviews.create!(body: sushi_shark, rating: 5, author_id: bruce.id)

SchoolMembership.create!(school_owner_id: nemo.id, school_member_id: flo.id)
SchoolMembership.create!(school_owner_id: nemo.id, school_member_id: dory.id)
SchoolMembership.create!(school_owner_id: flo.id, school_member_id: nemo.id)
SchoolMembership.create!(school_owner_id: dory.id, school_member_id: flo.id)


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
