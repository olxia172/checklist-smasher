class CreateSchedules < ActiveRecord::Migration[6.0]
  def change
    create_table :schedules do |t|
      t.jsonb :rules_data, default: {}, null: false

      t.timestamps
    end
  end
end
