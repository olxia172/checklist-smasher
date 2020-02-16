class AddNullConstraintsOnRecords < ActiveRecord::Migration[6.0]
  def change
    change_column_default(:items, :done, from: nil, to: false)
    change_column_default(:items, :cancelled, from: nil, to: false)
    Item.update_all(done: false, cancelled: false)
    change_column_null(:items, :done, false)
    change_column_null(:items, :cancelled, false)
  end
end
