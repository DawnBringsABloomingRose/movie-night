class AddImageToMovies < ActiveRecord::Migration[7.0]
  def change
    add_column :movies, :image, :string
    add_column :movies, :link, :string
    add_column :movies, :watched, :boolean
  end
end
