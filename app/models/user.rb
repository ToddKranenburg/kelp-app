class User < ActiveRecord::Base
  has_many :reviews, dependent: :destroy, foreign_key: :author_id

  attr_reader :password

  after_initialize :ensure_session_token
  validates :username, uniqueness: true, presence: true
  validates :session_token, uniqueness: true
  validates :password, length: {minimum: 6, allow_nil: true}

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  def self.find_by_credentials(username, password)
    possible_user = User.find_by_username(username)

    return nil unless possible_user

    if possible_user.has_password?(password)
      possible_user
    else
      nil
    end
  end

  def reset_session_token!
    self.session_token = User.generate_session_token

    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def has_password?(password)
    actual_password = BCrypt::Password.new(self.password_digest)
    actual_password.is_password?(password)
  end

end