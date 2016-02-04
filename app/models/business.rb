class Business < ActiveRecord::Base
  validates :name, :lat, :lng, :place_id, presence: true
  validates :place_id, uniqueness: true
  has_many :reviews, dependent: :destroy
  has_many :thumbs, dependent: :destroy

  include PgSearch
  multisearchable :against => [:name], using: [:trigram]
  pg_search_scope :business_search, against: [:name], using: [:trigram]

  def average_rating
    total_rating = 0
    all_reviews = self.reviews
    all_reviews.each do |review|
      total_rating += review.rating * 2
    end
    if (all_reviews.length > 0)
      average_rating = (total_rating / all_reviews.length).ceil
    else
      average_rating = 0
    end
    average_rating
  end
end
