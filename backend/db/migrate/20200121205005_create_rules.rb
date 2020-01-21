class CreateRules < ActiveRecord::Migration[6.0]
  def change
    create_table :rules do |t|
      t.jsonb :details
      t.references :ruleable, polymorphic: true, index: true

      t.timestamps
    end
  end
end
