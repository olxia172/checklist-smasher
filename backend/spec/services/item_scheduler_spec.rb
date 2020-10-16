require 'rails_helper'

RSpec.describe ItemScheduler do
  let!(:enjoyer) { create(:enjoyer) }
  let!(:checklist) { create(:checklist, enjoyer: enjoyer) }
  let!(:item) { create(:item, checklist: checklist) }

  before(:each) do
    travel_to Time.zone.local(2020, 9, 21, 12, 00, 00)
  end

  after(:each) do
    travel_back
  end

  describe "schedule" do
    subject { described_class.new(base_item: item, enjoyer: enjoyer, **params).call }

    context "when rest of params are empty" do
      let(:params) { {} }

      it do
        expect { subject }.to change { Schedule.count }.by(0)
      end
    end

    context "when daily params" do
      context "when params { repeat: 'daily' }" do
        let(:params) { { repeat: 'daily' } }

        it do
          expect { subject }.to change { Event.count }.by(1)
                         .and change { Schedule.count }.by(1)
                         .and change { item.reload.schedule_id }
                         .and change { Occurrence.count }
        end

        it 'should save correct schedule' do
          subject
          schedule = enjoyer.reload.schedules.last
          sch = IceCube::Schedule.from_hash(schedule.schedule_data)
          expect(sch.occurrences(Date.today + 7.days).length).to eq(7)
        end
      end

      context "when params { repeat: 'daily', every: 2 }" do
        let(:params) { { repeat: 'daily', every: 2 } }

        it do
          expect { subject }.to change { Event.count }.by(1)
                         .and change { Schedule.count }.by(1)
                         .and change { item.reload.schedule_id }
        end

        it 'should save correct schedule' do
          subject
          schedule = enjoyer.reload.schedules.last
          sch = IceCube::Schedule.from_hash(schedule.schedule_data)
          expect(sch.occurrences(Date.today + 7.days).length).to eq(4)
        end
      end

      context "when params { repeat: 'daily', start_date: Date.today + 3.days }" do
        let(:params) { { repeat: 'daily', start_date: (Date.today + 3.days).to_s } }

        it do
          expect { subject }.to change { Event.count }.by(1)
                         .and change { Schedule.count }.by(1)
                         .and change { item.reload.schedule_id }
        end

        it 'should save correct schedule' do
          subject
          schedule = enjoyer.reload.schedules.last
          sch = IceCube::Schedule.from_hash(schedule.schedule_data)
          expect(sch.occurrences(Date.today + 7.days).length).to eq(5)
        end
      end

      context "when params { repeat: 'daily', days: ['monday', 'thursday'] }" do
        let(:params) { { repeat: 'daily', days: ['monday', 'thursday'] } }

        it do
          expect { subject }.to change { Event.count }.by(1)
                         .and change { Schedule.count }.by(1)
                         .and change { item.reload.schedule_id }
        end

        it 'should save correct schedule' do
          subject
          schedule = enjoyer.reload.schedules.last
          sch = IceCube::Schedule.from_hash(schedule.schedule_data)
          expect(sch.occurrences(Date.today + 7.days).length).to eq(7)
        end
      end

      context "when params { repeat: 'daily', end_date: Date.today + 3.days }" do
        let(:params) { { repeat: 'daily', end_date: (Date.today + 3.days).to_s } }

        it do
          expect { subject }.to change { Event.count }.by(1)
                         .and change { Schedule.count }.by(1)
                         .and change { item.reload.schedule_id }
        end

        it 'should save correct schedule' do
          subject
          schedule = enjoyer.reload.schedules.last
          sch = IceCube::Schedule.from_hash(schedule.schedule_data)
          expect(sch.occurrences(Date.today + 7.days).length).to eq(3)
        end
      end

      context "when params { repeat: 'daily', occurences_count: 4 }" do
        let(:params) { { repeat: 'daily', occurences_count: 4 } }

        it do
          expect { subject }.to change { Event.count }.by(1)
                         .and change { Schedule.count }.by(1)
                         .and change { item.reload.schedule_id }
        end

        it 'should save correct schedule' do
          subject
          schedule = enjoyer.reload.schedules.last
          sch = IceCube::Schedule.from_hash(schedule.schedule_data)
          expect(sch.occurrences(Date.today + 7.days).length).to eq(4)
        end
      end

      context "when params { repeat: 'daily', days_of_month: [15, 23] }" do
        let(:params) { { repeat: 'daily', days_of_month: [15, 23] } }

        it do
          expect { subject }.to change { Event.count }.by(1)
                         .and change { Schedule.count }.by(1)
                         .and change { item.reload.schedule_id }
        end

        it 'should save correct schedule' do
          subject
          schedule = enjoyer.reload.schedules.last
          sch = IceCube::Schedule.from_hash(schedule.schedule_data)
          expect(sch.occurrences(Date.today + 28.days).length).to eq(28)
        end
      end
    end

    context "when weekly params" do
      context "when params { repeat: 'weekly' }" do
        let(:params) { { repeat: 'weekly' } }

        it do
          expect { subject }.to change { Event.count }.by(1)
                         .and change { Schedule.count }.by(1)
                         .and change { item.reload.schedule_id }
        end

        it 'should save correct schedule' do
          subject
          schedule = enjoyer.reload.schedules.last
          sch = IceCube::Schedule.from_hash(schedule.schedule_data)
          expect(sch.occurrences(Date.today + 8.days).length).to eq(2)
        end
      end

      context "when params { repeat: 'weekly', every: 2 }" do
        let(:params) { { repeat: 'weekly', every: 2 } }

        it do
          expect { subject }.to change { Event.count }.by(1)
                         .and change { Schedule.count }.by(1)
                         .and change { item.reload.schedule_id }
        end

        it 'should save correct schedule' do
          subject
          schedule = enjoyer.reload.schedules.last
          sch = IceCube::Schedule.from_hash(schedule.schedule_data)
          expect(sch.occurrences(Date.today + 8.days).length).to eq(1)
        end
      end

      context "when params { repeat: 'weekly', start_date: (Date.today + 2.days).to_s }" do
        let(:params) { { repeat: 'weekly', start_date: (Date.today + 2.days).to_s } }

        it do
          expect { subject }.to change { Event.count }.by(1)
                         .and change { Schedule.count }.by(1)
                         .and change { item.reload.schedule_id }
        end

        it 'should save correct schedule' do
          subject
          schedule = enjoyer.reload.schedules.last
          sch = IceCube::Schedule.from_hash(schedule.schedule_data)
          expect(sch.occurrences(Date.today + 8.days).length).to eq(1)
        end
      end

      context "when params { repeat: 'weekly', occurences_count: 3 }" do
        let(:params) { { repeat: 'weekly', occurences_count: 3 } }

        it do
          expect { subject }.to change { Event.count }.by(1)
                         .and change { Schedule.count }.by(1)
                         .and change { item.reload.schedule_id }
        end

        it 'should save correct schedule' do
          subject
          schedule = enjoyer.reload.schedules.last
          sch = IceCube::Schedule.from_hash(schedule.schedule_data)
          expect(sch.all_occurrences.length).to eq(3)
        end
      end

      context "when params { repeat: 'weekly', days: ['monday', 'thursday'] }" do
        let(:params) { { repeat: 'weekly', days: ['monday', 'thursday'] } }

        it do
          expect { subject }.to change { Event.count }.by(1)
                         .and change { Schedule.count }.by(1)
                         .and change { item.reload.schedule_id }
        end

        it 'should save correct schedule' do
          subject
          schedule = enjoyer.reload.schedules.last
          sch = IceCube::Schedule.from_hash(schedule.schedule_data)
          expect(sch.occurrences(Date.today + 8.days).length).to eq(3)
        end
      end

      context "when params { repeat: 'weekly', days_of_month: [1, 15] }" do
        let(:params) { { repeat: 'weekly', days_of_month: [1, 15] } }

        it do
          expect { subject }.to change { Event.count }.by(1)
                         .and change { Schedule.count }.by(1)
                         .and change { item.reload.schedule_id }
        end

        it 'should save correct schedule' do
          subject
          schedule = enjoyer.reload.schedules.last
          sch = IceCube::Schedule.from_hash(schedule.schedule_data)
          expect(sch.occurrences(Date.today + 7.days).length).to eq(1)
        end
      end

      context "when params { repeat: 'weekly', end_date: (Date.today + 29.days).to_s }" do
        let(:params) { { repeat: 'weekly', end_date: (Date.today + 29.days).to_s } }

        it do
          expect { subject }.to change { Event.count }.by(1)
                         .and change { Schedule.count }.by(1)
                         .and change { item.reload.schedule_id }
        end

        it 'should save correct schedule' do
          subject
          schedule = enjoyer.reload.schedules.last
          sch = IceCube::Schedule.from_hash(schedule.schedule_data)
          expect(sch.all_occurrences.length).to eq(5)
        end
      end
    end

    context "when monthly params" do
      context "when params { repeat: 'monthly' }" do
        let(:params) { { repeat: 'monthly' } }

        it do
          expect { subject }.to change { Event.count }.by(1)
                         .and change { Schedule.count }.by(1)
                         .and change { item.reload.schedule_id }
        end

        it 'should save correct schedule' do
          subject
          schedule = enjoyer.reload.schedules.last
          sch = IceCube::Schedule.from_hash(schedule.schedule_data)
          expect(sch.occurrences(Date.today + 1.month).length).to eq(1)
        end
      end

      context "when params { repeat: 'monthly', every: 3 }" do
        let(:params) { { repeat: 'monthly', every: 3 } }

        it do
          expect { subject }.to change { Event.count }.by(1)
                         .and change { Schedule.count }.by(1)
                         .and change { item.reload.schedule_id }
        end

        it 'should save correct schedule' do
          subject
          schedule = enjoyer.reload.schedules.last
          sch = IceCube::Schedule.from_hash(schedule.schedule_data)
          expect(sch.occurrences(Date.today + 1.year).length).to eq(4)
        end
      end

      context "when params { repeat: 'monthly', occurences_count: 3 }" do
        let(:params) { { repeat: 'monthly', occurences_count: 3 } }

        it do
          expect { subject }.to change { Event.count }.by(1)
                         .and change { Schedule.count }.by(1)
                         .and change { item.reload.schedule_id }
        end

        it 'should save correct schedule' do
          subject
          schedule = enjoyer.reload.schedules.last
          sch = IceCube::Schedule.from_hash(schedule.schedule_data)
          expect(sch.all_occurrences.length).to eq(3)
        end
      end

      context "when params { repeat: 'monthly', occurences_count: 3 }" do
        let(:params) { { repeat: 'monthly', days_of_month: [1, 15], every: 3 } }

        it do
          expect { subject }.to change { Event.count }.by(1)
                         .and change { Schedule.count }.by(1)
                         .and change { item.reload.schedule_id }
        end

        it 'should save correct schedule' do
          subject
          schedule = enjoyer.reload.schedules.last
          sch = IceCube::Schedule.from_hash(schedule.schedule_data)
          expect(sch.occurrences(Date.today + 1.year).length).to eq(8)
        end
      end
    end
  end
end
