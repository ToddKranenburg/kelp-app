Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook,
  ENV['FACEBOOK_KEY'],
  ENV['FACEBOOK_SECRET'],
  scope: 'public_profile',
  secure_image_url: true,
  image_size: {width: 500, height: 500}
end
