class SessionsController < ApplicationController
    skip_before_action :authorize

    def create
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: { errors: ["Invalid username or password"] }, status: :unauthorized
        end
    end

    def destroy
        session.delete :user_id
        head :no_content
    end

    def omniauth
        auth = request.env['omniauth.auth']
    
        render json: {
          provider: auth.provider,
          uid: auth.uid,
          name: auth.info.name,
          email: auth.info.email,
          image: auth.info.image,
          raw_info: auth.extra.raw_info
        }   end
end
