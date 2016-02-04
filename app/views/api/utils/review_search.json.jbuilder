json.total_count (@review_results.total_count + @business_results.total_count)
json.review_results do
  json.array! @review_results do |result|
    json.partial!("api/businesses/business", business: result.business)
  end
end
json.business_results do
  json.array! @business_results do |business|
    json.partial!("api/businesses/business", business: business)
  end
end
