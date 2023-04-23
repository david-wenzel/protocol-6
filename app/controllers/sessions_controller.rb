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


    # def omniauth
    # this works to json to new page iwith id of the user 
    #     auth = request.env['omniauth.auth']
    #     user = User.find_or_create_by(username: auth['info']['email']) do |u|
    #       u.username = auth['info']['email']
    #       u.password = SecureRandom.hex # Generate a random password for the user
    #     end
    #     session[:user_id] = user.id
    #     render json: user, status: :created
    #     # other logic (e.g., setting up session, redirecting, etc.)
    #   end

    def omniauth
        auth = request.env['omniauth.auth']
        user = User.find_or_create_by(username: auth['info']['email']) do |u|
          u.username = auth['info']['email']
          u.password = SecureRandom.hex # Generate a random password for the user
        end
    
        if user
          session[:user_id] = user.id
          # Redirect to the frontend route after successful login
          # redirect_to "http://localhost:4000/areas"
          redirect_to "https://protocol-6.onrender.com/areas"

        else
          # Redirect to the login page if the user could not be logged in
          redirect_to "http://localhost:4000/login"
        end
      end

    end