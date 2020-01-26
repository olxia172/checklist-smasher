require 'devise/mailer'

enjoyer = Enjoyer.create!(name: 'Ola', email: 'ola@test.pl', password: 'password', password_confirmation: "password")

checklist1 = Checklist.create!(name: 'Checklist1', enjoyer_id: enjoyer.id)
checklist2 = Checklist.create!(name: 'Checklist2', enjoyer_id: enjoyer.id)

Item.create!(name: 'Item1', checklist_id: checklist1.id)
Item.create!(name: 'Item2', checklist_id: checklist1.id)
Item.create!(name: 'Item3', checklist_id: checklist1.id)
Item.create!(name: 'Item4', checklist_id: checklist1.id)
Item.create!(name: 'Item5', checklist_id: checklist2.id)
Item.create!(name: 'Item6', checklist_id: checklist2.id)
