# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160205005753) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "pg_trgm"

  create_table "businesses", force: :cascade do |t|
    t.string   "name",       null: false
    t.float    "lat",        null: false
    t.float    "lng",        null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "place_id",   null: false
  end

  create_table "pg_search_documents", force: :cascade do |t|
    t.text     "content"
    t.integer  "searchable_id"
    t.string   "searchable_type"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "pg_search_documents", ["searchable_type", "searchable_id"], name: "index_pg_search_documents_on_searchable_type_and_searchable_id", using: :btree

  create_table "reviews", force: :cascade do |t|
    t.text     "body",        null: false
    t.integer  "rating",      null: false
    t.integer  "author_id",   null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "business_id", null: false
  end

  add_index "reviews", ["author_id"], name: "index_reviews_on_author_id", using: :btree
  add_index "reviews", ["business_id"], name: "index_reviews_on_business_id", using: :btree

  create_table "school_memberships", force: :cascade do |t|
    t.integer  "school_owner_id",  null: false
    t.integer  "school_member_id", null: false
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  add_index "school_memberships", ["school_member_id"], name: "index_school_memberships_on_school_member_id", using: :btree
  add_index "school_memberships", ["school_owner_id"], name: "index_school_memberships_on_school_owner_id", using: :btree

  create_table "thumbs", force: :cascade do |t|
    t.integer  "business_id",        null: false
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  add_index "thumbs", ["business_id"], name: "index_thumbs_on_business_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",                     null: false
    t.string   "password_digest",              null: false
    t.string   "session_token",                null: false
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.string   "profile_picture_file_name"
    t.string   "profile_picture_content_type"
    t.integer  "profile_picture_file_size"
    t.datetime "profile_picture_updated_at"
    t.string   "provider"
    t.string   "uid"
  end

  add_index "users", ["username", "session_token"], name: "index_users_on_username_and_session_token", unique: true, using: :btree

end
