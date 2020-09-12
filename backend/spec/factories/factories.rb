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

  factory :schedule do
    rules_data { {} }
    enjoyer
  end

  factory :event do
    association :eventable, factory: :item, name: "test"
    action { Event::ITEM_ADDED }

    trait :item_done do
      association :eventable, factory: :item, name: "test"
      action { Event::ITEM_MARKED_DONE }
    end

    trait :item_scheduled do
      association :eventable, factory: :item, name: "test"
      action { Event::ITEM_SCHEDULED }
    end

    trait :item_cancelled do
      association :eventable, factory: :item, name: "test"
      action { Event::ITEM_CANCELLED }
    end

    trait :checklist_scheduled do
      association :eventable, factory: :checklist, name: "test"
      action { Event::CHECKLIST_SCHEDULED }
    end

    trait :checklist_marked_done do
      association :eventable, factory: :checklist, name: "test"
      action { Event::CHECKLIST_MARKED_DONE }
    end

    trait :checklist_cancelled do
      association :eventable, factory: :checklist, name: "test"
      action { Event::CHECKLIST_CANCELLED }
    end
  end
end
