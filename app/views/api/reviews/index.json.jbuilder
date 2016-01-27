json.array! @reviews do |review|
  json.id review.id
  json.body review.body
  json.rating review.rating
  json.author_id review.author_id
end
