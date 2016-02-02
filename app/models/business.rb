class Business < ActiveRecord::Base
  validates :name, :lat, :lng, :place_id, presence: true
  validates :place_id, uniqueness: true
  has_many :reviews, dependent: :destroy
  has_many :thumbs, dependent: :destroy

  def average_rating
    #fill this out later!
  end
end
