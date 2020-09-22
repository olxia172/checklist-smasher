class CreateSchedules < ActiveRecord::Migration[6.0]
  def change
    create_table :schedules do |t|
      t.jsonb :rules_data, default: {}, null: false
      t.references :enjoyer, null: false, foreign_key: true

      t.timestamps
    end

    add_reference :items, :schedule, index: true
  end
end
