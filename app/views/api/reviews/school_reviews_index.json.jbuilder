json.array! @school_members do |school_member|
  reviews = school_member.reviews
  json.array! reviews do |review|
    json.partial! 'api/reviews/review', review: school_member.review
  end
end
