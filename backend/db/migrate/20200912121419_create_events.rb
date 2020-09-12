class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.integer :action, null: false
      t.references :eventable, polymorphic: true, index: true

      t.timestamps
    end
  end
end
