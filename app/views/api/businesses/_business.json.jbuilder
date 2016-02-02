json.id business.id
json.name business.name
json.lat business.lat
json.lng business.lng
json.place_id business.place_id

json.reviews business.reviews do |review|
  json.partial! '/api/reviews/review', review: review
end

json.image_urls business.thumbs do |thumb|
  json.partial! 'api/thumbs/thumb', thumb: thumb
end
