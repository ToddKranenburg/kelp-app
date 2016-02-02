class AddAttachmentImageToThumbs < ActiveRecord::Migration
  def self.up
    change_table :thumbs do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :thumbs, :image
  end
end
