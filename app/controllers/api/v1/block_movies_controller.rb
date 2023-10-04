class Api::V1::BlockMoviesController < ApplicationController
    skip_before_action :verify_authenticity_token

    def destroy
        @blockmovie = BlockMovie.where(movie_id: params[:movie_id], block_id: params[:block_id]).first
        puts @blockmovie.id
        @blockmovie.destroy 
        render json: {notice: "destroyed"}
    end
    
    def create
         @block = Block.where(name: params[:block_name].capitalize).first
         @block = Block.new(name: params[:block_name].capitalize) unless @block
         @block.save
         @block_movie = BlockMovie.where(movie_id: params[:movie_id], block_id: @block.id).first
         @block_movie = BlockMovie.new(movie_id: params[:movie_id], block: @block) unless @block_movie

         temphash = {block_id: @block.id, name: @block.name}

         if @block_movie.save
            render json: temphash
         end
    end
end
