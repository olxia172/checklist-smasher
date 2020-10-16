class ItemScheduler
  attr_reader :base_item, :enjoyer, :all_args
  attr_accessor :errors

  DAILY_FREQUENCY = 'daily'
  WEEKLY_FREQUENCY = 'weekly'
  MONTHLY_FREQUENCY = 'monthly'
  YEARLY_FREQUENCY = 'yearly'

  def initialize(base_item:, enjoyer:, **args)
    @base_item = base_item
    @enjoyer = enjoyer
    @all_args = args
    @errors = []
  end

  def call
    perform_validations

    return false unless errors.empty?

    begin
      base_item.update(schedule_id: schedule.id)
      base_item.events.create(action: :item_scheduled)
      binding.pry
      base_item.add_occurrences(Date.today.end_of_month)
    rescue
      @errors << "Something went wrong"
      @errors
    end
  end

  def schedule
    @schedule ||= enjoyer.schedules.create!(payload: all_args, schedule_data: new_schedule.to_h )
  end

  private

  def perform_validations
    if all_args.blank? || base_item.blank? || enjoyer.blank?
      errors << "Not enough data"
    elsif all_args[:repeat].blank?
      errors << "Repeat frequency required"
    end
  end

  def new_schedule
    @new_schedule ||= ScheduleBuilder.new(all_args).build
  end

  def checklist
    @checklist ||= enjoyer.checklists.find(base_item.checklist_id)
  end
end
