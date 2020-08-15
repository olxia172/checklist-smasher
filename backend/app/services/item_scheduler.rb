class ItemScheduler
  attr_reader :base_item, :enjoyer, :all_args, :start_date, :repeat, :every, :days, :end_date, :occurences_count, :days_of_month

  DAILY_FREQUENCY = 'daily'
  WEEKLY_FREQUENCY = 'weekly'
  MONTHLY_FREQUENCY = 'monthly'
  YEARLY_FREQUENCY = 'yearly'

  def initialize(base_item:, enjoyer:, **args)
    @base_item = base_item
    @enjoyer = enjoyer
    @all_args = args
    @start_date = args[:start_date]
    @repeat = args[:repeat]
    @every = args[:every] || 1
    @days = args[:days]
    @end_date = args[:end_date]
    @occurences_count = args[:occurences_count]
    @days_of_month = args[:days_of_month]
  end

  def schedule
    return if all_args.blank?

    schedule = enjoyer.schedules.create(payload: all_args, schedule_data: new_schedule.to_h )
    checklist = enjoyer.checklists.find(base_item.checklist_id)
    checklist.item_formulas.create(
      name: base_item.name,
      schedule_id: schedule.id
    )
  end

  private

  def new_schedule
    @new_schedule ||= ScheduleBuilder.new(all_args).build
  end
end
