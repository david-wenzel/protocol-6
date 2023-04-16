class UsersController < ApplicationController

    skip_before_action :authorize, only: :create

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def show
        user = User.find(session[:user_id])

        render json: user, include: :reviews
    end

    def fun_boards
        user = User.find(params[:id])

        fun_boards = user.boards.select{ |board| board.title.include?('fun')}

        render json: fun_boards
    end
    


    private

    def user_params
        params.permit(:username, :password, :password_confirmation)
    end

end
