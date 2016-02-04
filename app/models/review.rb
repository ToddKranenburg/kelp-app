class Review < ActiveRecord::Base
  belongs_to :author, class_name: "User", foreign_key: :author_id
  belongs_to :business

  validates :author, :body, presence: true
  def business_name
    self.business.name
  end

  include PgSearch
  pg_search_scope :review_search, against: [:body], using: [:tsearch]
end
