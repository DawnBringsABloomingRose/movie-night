class Api::V1::UsersController < ApplicationController

    def show
        @user = User.find(params[:id])
        render json: @user, include: [suggested_movies: {include: [:blocks, :user]}, liked_movies: {include: [:blocks, :user]}]
    end
end
