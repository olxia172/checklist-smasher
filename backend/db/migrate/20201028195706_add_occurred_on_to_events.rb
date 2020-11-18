class AddOccurredOnToEvents < ActiveRecord::Migration[6.0]
  def change
    add_column :events, :occured_on, :date
  end
end
