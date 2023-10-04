class Api::V1::LikesController < ApplicationController
    before_action :set_like, only: [:show, :edit, :update, :destroy]
    skip_before_action :verify_authenticity_token

    def index
        #movie = Suggestion.where(movie_id: params[:suggestion_id])
        @likes = Like.where(suggestion_id: params[:id])
        render json: @likes
    end

    def create 
        @like = Like.new(user_id: current_user.id, suggestion_id: params[:suggestion_id])

        if @like.save
            render json: @like
        else

        end
    end

    def destroy 
        @like.destroy if @like.user_id == current_user.id
        render json: { notice: 'Suggestion eliminated' }
    end

    def set_like
        @like = Like.find(params[:id])
    end
end
