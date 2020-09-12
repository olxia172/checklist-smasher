# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_08_09_182630) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.string "label"
    t.string "icon_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_categories_on_name"
  end

  create_table "checklists", force: :cascade do |t|
    t.string "name"
    t.bigint "enjoyer_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "category_id"
    t.index ["category_id"], name: "index_checklists_on_category_id"
    t.index ["enjoyer_id"], name: "index_checklists_on_enjoyer_id"
  end

  create_table "enjoyers", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.string "password_digest", default: "", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_enjoyers_on_email"
    t.index ["name"], name: "index_enjoyers_on_name"
  end

  create_table "items", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "checklist_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["checklist_id"], name: "index_items_on_checklist_id"
  end

  create_table "schedules", force: :cascade do |t|
    t.jsonb "rules_data", default: {}, null: false
    t.bigint "enjoyer_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["enjoyer_id"], name: "index_schedules_on_enjoyer_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.string "key"
    t.bigint "enjoyer_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["enjoyer_id"], name: "index_sessions_on_enjoyer_id"
  end

  add_foreign_key "checklists", "enjoyers"
  add_foreign_key "items", "checklists"
  add_foreign_key "schedules", "enjoyers"
  add_foreign_key "sessions", "enjoyers"
end
