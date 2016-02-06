json.array! @school_members do |school_member|
  json.partial! 'api/reviews/review', review: school_member.review
end
