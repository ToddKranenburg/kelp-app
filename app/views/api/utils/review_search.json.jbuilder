json.total_count @search_results.total_count
json.results do
  json.array! @search_results do |result|
    json.partial!("api/businesses/business", business: result.business) 
  end
end
