pp "Seeding..."

enjoyer = Enjoyer.create!(name: 'Ola', email: 'ola@test.pl', password: "1234", password_confirmation: "1234")

checklist1 = Checklist.create!(name: 'Sprzątanie', enjoyer_id: enjoyer.id)
checklist2 = Checklist.create!(name: 'Rachunki', enjoyer_id: enjoyer.id)
checklist3 = Checklist.create!(name: 'Zakupy', enjoyer_id: enjoyer.id)

item1 = Item.create!(name: 'Blat w kuchni', checklist_id: checklist1.id)
item2 = Item.create!(name: 'Prysznic w łazience', checklist_id: checklist1.id)
item3 = Item.create!(name: 'Umywalka', checklist_id: checklist1.id)
item4 = Item.create!(name: 'Zmywanie', checklist_id: checklist1.id)
item5 = Item.create!(name: 'Prąd', checklist_id: checklist2.id)
item6 = Item.create!(name: 'Mieszkanie czynsz', checklist_id: checklist2.id)
item7 = Item.create!(name: 'Mieszkanie fundusz remontowy', checklist_id: checklist2.id)
item8 = Item.create!(name: 'Gaz', checklist_id: checklist2.id)

Item.create!(name: 'Chleb', checklist_id: checklist3.id)
Item.create!(name: 'Masło', checklist_id: checklist3.id)
Item.create!(name: 'Sok pomarańczowy', checklist_id: checklist3.id)
Item.create!(name: 'Pierniczki', checklist_id: checklist3.id)

params_item1 = { repeat: 'daily' }
ItemScheduler.new(base_item: item1, enjoyer: enjoyer, **params_item1).call

params_item2 = { repeat: 'weekly', days: ['saturday'] }
ItemScheduler.new(base_item: item2, enjoyer: enjoyer, **params_item2).call

params_item3 = { repeat: 'daily', every: 3 }
ItemScheduler.new(base_item: item3, enjoyer: enjoyer, **params_item3).call

params_item4 = { repeat: 'daily', every: 2 }
ItemScheduler.new(base_item: item4, enjoyer: enjoyer, **params_item4).call

params_item5 = { repeat: 'monthly', days_of_month: [3] }
ItemScheduler.new(base_item: item5, enjoyer: enjoyer, **params_item5).call

params_item6 = { repeat: 'monthly', days_of_month: [12, 13, 14] }
ItemScheduler.new(base_item: item6, enjoyer: enjoyer, **params_item6).call

params_item7 = { repeat: 'monthly', days_of_month: [12, 13, 14] }
ItemScheduler.new(base_item: item7, enjoyer: enjoyer, **params_item7).call

params_item8 = { repeat: 'monthly', days_of_month: [10] }
ItemScheduler.new(base_item: item8, enjoyer: enjoyer, **params_item8).call

pp "Seeding DONE!"
