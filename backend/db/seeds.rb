enjoyer = Enjoyer.create!(name: 'Ola', email: 'ola@test.pl', password: "1234", password_confirmation: "1234")

checklist1 = Checklist.create!(name: 'Sprzątanie', enjoyer_id: enjoyer.id)
checklist2 = Checklist.create!(name: 'Rachunki', enjoyer_id: enjoyer.id)

Item.create!(name: 'Blat w kuchni', checklist_id: checklist1.id)
Item.create!(name: 'Prysznic w łazience', checklist_id: checklist1.id)
Item.create!(name: 'Umywalka', checklist_id: checklist1.id)
Item.create!(name: 'Zmywanie', checklist_id: checklist1.id)
Item.create!(name: 'Prąd', checklist_id: checklist2.id)
Item.create!(name: 'Mieszkanie czynsz', checklist_id: checklist2.id)
Item.create!(name: 'Mieszkanie fundusz remontowy', checklist_id: checklist2.id)
Item.create!(name: 'Gaz', checklist_id: checklist2.id)
