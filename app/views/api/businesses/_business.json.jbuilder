json.id business.id
json.name business.name
json.lat business.lat
json.lng business.lng

json.reviews business.reviews do |review|
  json.extract! review, :id, :body, :rating, :author, :business, :created_at
end
