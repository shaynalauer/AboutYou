class HomeController < ApplicationController
  def index

  end

  def facebook_auth
    redirect_to authenticator.url_for_oauth_code(:permissions => FB_CONFIG[:scope])
  end

  def facebook_callback
    token = authenticator.get_access_token(params[:code])
    user = User.create_or_find_user token

    redirect_to profile_path id: user.id
  end

  protected
  def authenticator
    @authenticator ||= Koala::Facebook::OAuth.new(FB_CONFIG[:app_id], FB_CONFIG[:secret], url_for(:action => :facebook_callback))
  end
end
