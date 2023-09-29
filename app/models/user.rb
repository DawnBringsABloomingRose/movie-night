class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

         def will_save_change_to_email?
          false
        end 

  has_many :suggestions
  has_many :suggested_movies, through: :suggestions, source: :movie
  has_many :likes
  has_many :liked_suggestions, through: :likes, source: :suggestion
  has_many :liked_movies, through: :liked_suggestions, source: :movie
end
