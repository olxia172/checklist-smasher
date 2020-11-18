class AddCounterCacheOnEnjoyerChecklists < ActiveRecord::Migration[6.0]
  def change
    add_column :enjoyers, :checklists_count, :integer, default: 0, null: false
  end
end
