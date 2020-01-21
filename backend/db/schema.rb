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

ActiveRecord::Schema.define(version: 2020_01_21_205005) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.string "label"
    t.bigint "checklist_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["checklist_id"], name: "index_categories_on_checklist_id"
    t.index ["name"], name: "index_categories_on_name"
  end

  create_table "checklists", force: :cascade do |t|
    t.string "name"
    t.bigint "enjoyer_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["enjoyer_id"], name: "index_checklists_on_enjoyer_id"
  end

  create_table "enjoyers", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "items", force: :cascade do |t|
    t.string "name"
    t.bigint "checklist_id", null: false
    t.date "to_do_on"
    t.boolean "done"
    t.boolean "cancelled"
    t.bigint "item_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["checklist_id"], name: "index_items_on_checklist_id"
    t.index ["item_id"], name: "index_items_on_item_id"
  end

  create_table "rules", force: :cascade do |t|
    t.jsonb "details"
    t.string "ruleable_type"
    t.bigint "ruleable_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["ruleable_type", "ruleable_id"], name: "index_rules_on_ruleable_type_and_ruleable_id"
  end

  add_foreign_key "categories", "checklists"
  add_foreign_key "checklists", "enjoyers"
  add_foreign_key "items", "checklists"
  add_foreign_key "items", "items"
end
