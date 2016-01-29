json.extract! user, :id, :username
json.image_url asset_path(user.profile_picture.url)
