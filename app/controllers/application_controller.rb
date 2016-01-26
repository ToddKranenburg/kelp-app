class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception
  helper_method :current_user, :logged_in?

  def current_user
   @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def login!(user)
   user.reset_session_token!
   session[:session_token] = user.session_token
   @current_user = user
  end

  def ensure_logged_in
    unless logged_in?
      flash[:errors] = ["Please sign in!"]
      redirect_to new_session_url
    end
  end

  def ensure_logged_out
    if logged_in?
      flash[:errors] = ["You are already logged in!"]
      redirect_to root_url
    end
  end

  def logout!
    if logged_in?
      current_user.reset_session_token!
      session[:session_token] = nil
      @current_user = nil
    else
      flash[:errors] = ["You are not signed in!"]
      redirect_to new_session_url
    end
  end

  def logged_in?
    !!current_user
  end

  def require_sign_in
    unless logged_in?
      flash[:errors] = ["You must sign in first!"]
      redirect_to new_user_url
    end
  end
end
