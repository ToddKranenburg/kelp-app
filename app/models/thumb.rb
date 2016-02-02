class Thumb < ActiveRecord::Base
  has_attached_file :image, default_url: 'default_picture.png'
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
  validates :business, presence: true

  belongs_to :business
end
