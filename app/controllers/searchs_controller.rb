require 'uri'
require 'net/http'
require_relative '../.api_keys.rb'

class SearchsController < ApplicationController
  
  def index
    url = URI("https://api.themoviedb.org/3/search/movie?query=#{params[:movie_name]}&include_adult=false&language=en-US&page=1")

    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true

    request = Net::HTTP::Get.new(url)
    request["accept"] = 'application/json'
    request["Authorization"] = "Bearer #{$tmdb_key}"
    @response = http.request(request)
    @responsehash = JSON.parse(@response.body)

    @jsonadditions = {}
    puts @responsehash
    @responsehash["results"].each do |movie|
      Movie.all.where(tmdb_ref: movie["id"]).first ? movie["suggested"] = true : movie["suggested"] = false
    end

    respond_to do |format|
      format.html
      format.json { render json: @responsehash }
    end
  end

  def show
    url = URI("https://api.themoviedb.org/3/movie/#{params[:id]}?language=en-US")
    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true

    request = Net::HTTP::Get.new(url)
    request["accept"] = 'application/json'
    request["Authorization"] = "Bearer #{$tmdb_key}"

    @response = http.request(request)
    @responsehash = JSON.parse(@response.body)
    respond_to do |format|
      format.html
      format.json { render json: @responsehash }
    end

  end
end
