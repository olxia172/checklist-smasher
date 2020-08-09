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

ActiveRecord::Schema.define(version: 2020_08_09_184332) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.string "label"
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
    t.string "name"
    t.string "email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "password_digest", default: "", null: false
  end

  create_table "item_formulas", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "checklist_id", null: false
    t.bigint "schedule_id", null: false
    t.boolean "cancelled", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["checklist_id"], name: "index_item_formulas_on_checklist_id"
    t.index ["schedule_id"], name: "index_item_formulas_on_schedule_id"
  end

  create_table "items", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "checklist_id", null: false
    t.boolean "done", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "item_formula_id"
    t.index ["checklist_id"], name: "index_items_on_checklist_id"
    t.index ["item_formula_id"], name: "index_items_on_item_formula_id"
  end

  create_table "schedules", force: :cascade do |t|
    t.jsonb "rules_data", default: {}, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "sessions", force: :cascade do |t|
    t.string "key"
    t.bigint "enjoyer_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["enjoyer_id"], name: "index_sessions_on_enjoyer_id"
  end

  add_foreign_key "checklists", "enjoyers"
  add_foreign_key "item_formulas", "checklists"
  add_foreign_key "item_formulas", "schedules"
  add_foreign_key "items", "checklists"
  add_foreign_key "items", "item_formulas"
  add_foreign_key "sessions", "enjoyers"
end
