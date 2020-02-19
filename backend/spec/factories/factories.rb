FactoryBot.define do
  factory :enjoyer do
    name { Faker::Name.first_name }
    sequence(:email) { |n| "user-#{n}@example.com" }
  end

  factory :checklist do
    sequence(:name) { |n| "Checklist #{n}" }
    enjoyer
  end

  factory :item do
    sequence(:name) { |n| "Item #{n}" }
    checklist
  end
end