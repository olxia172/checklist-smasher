class CreateSessions < ActiveRecord::Migration[6.0]
  def change
    create_table :sessions do |t|
      t.string :key
      t.references :enjoyer, null: false, foreign_key: true

      t.timestamps
    end
  end
end
