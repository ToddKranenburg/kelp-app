json.array! @reviews do |review|
  json.id review.id
  json.body review.body
  json.rating review.rating
  json.author review.author
  json.date review.created_at
end
