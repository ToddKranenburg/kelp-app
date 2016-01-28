class Business < ActiveRecord::Base
  validates :name, :lat, :lng, presence: true
  has_many :reviews

  def average_rating
    #fill this out later!
  end
end
