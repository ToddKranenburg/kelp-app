json.extract! review, :id, :body, :rating, :business, :created_at

json.author do
  json.partial! 'api/users/user', user: review.author
end
