# Rails.application.config.middleware.use OmniAuth::Builder do
#     provider :google_oauth2, ENV['GOOGLE_CLIENT_ID'], ENV['GOOGLE_CLIENT_SECRET']
#   end
#   OmniAuth.config.allowed_request_methods = %i[get]

config.middleware.use OmniAuth::Builder do
    provider :google_oauth2, ENV['GOOGLE_CLIENT_ID'], ENV['GOOGLE_CLIENT_SECRET'], {
      scope: 'email,profile',
      redirect_uri: "http://localhost:4000/areas"
    }
  end