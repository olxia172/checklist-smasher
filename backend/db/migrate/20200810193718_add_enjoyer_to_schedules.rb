class AddEnjoyerToSchedules < ActiveRecord::Migration[6.0]
  def change
    add_reference :schedules, :enjoyer, index: true, null: false
  end
end
