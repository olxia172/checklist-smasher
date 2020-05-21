class AddNullConstraintOnItemName < ActiveRecord::Migration[6.0]
  def change
    change_column_null(:items, :name, false)
  end
end
