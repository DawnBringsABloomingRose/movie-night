class AddDefaultToWatched < ActiveRecord::Migration[7.0]
  def change
    change_column_default :movies, :watched, false
  end
end
