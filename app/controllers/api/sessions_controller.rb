class Api::SessionsController < ApplicationController
  def show
    if current_user
      @user = current_user
      render "api/users/show"
    else
      render json: {}
    end
  end

  def create
    @user = User.find_by_credentials(params[:username], params[:password])

    if @user.nil?
      render json: ["The username/password you entered was incorrect"], status: 401
    else
      login!(@user)
      render "api/users/show"
    end
  end

  def omniauth_facebook
    provider = auth_hash[:provider]
    uid = auth_hash[:uid]
    @user = User.find_by(provider: provider, uid: uid)

    if @user.nil?
      @user = User.new(
        username: auth_hash[:info][:name],
        password: SecureRandom.urlsafe_base64,
        profile_picture: auth_hash[:info][:image],
        uid: uid,
        provider: provider)
        debugger
      if (@user.save)
        login!(@user)
        redirect_to root_url + '#/'
      else
        render json: ["Facebook sign in failed"], status: 401
      end
    else
      login!(@user)
      redirect_to root_url + '#/'
    end

  end

  def destroy
    @user = current_user
    logout!

    render json: ["You logged out!"]
  end

  private
  def auth_hash
    request.env['omniauth.auth']
  end
end
