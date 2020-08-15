FactoryBot.define do
  factory :enjoyer do
    name { Faker::Name.first_name }
    sequence(:email) { |n| "user-#{n}@example.com" }
    password { '1234567890' }
    password_confirmation { '1234567890' }
  end

  factory :checklist do
    sequence(:name) { |n| "Checklist #{n}" }
    enjoyer
  end

  factory :item do
    sequence(:name) { |n| "Item #{n}" }
    checklist
  end

  factory :item_formula do
    sequence(:name) { |n| "Item #{n}" }
    schedule
    checklist
  end

  factory :schedule do
    rules_data { {} }
    enjoyer
  end
end
