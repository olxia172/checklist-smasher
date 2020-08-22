class AddTypeAndScheduleToItem < ActiveRecord::Migration[6.0]
  def change
    add_column :items, :schedule, :jsonb, default: {}, null: false
    add_column :items, :mode, :integer, default: 1, null: false
    remove_reference :items, :item, foreign_key: true
    add_reference :items, :formula, foreign_key: { to_table: :items }
  end
end
