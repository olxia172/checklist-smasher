class ScheduleBuilder
  attr_reader :all_args,
              :start_date,
              :repeat,
              :every,
              :days,
              :end_date,
              :occurences_count,
              :days_of_month

  DAILY_FREQUENCY = 'daily'
  WEEKLY_FREQUENCY = 'weekly'
  MONTHLY_FREQUENCY = 'monthly'
  YEARLY_FREQUENCY = 'yearly'

  def initialize(**args)
    @all_args = args
    @start_date = args[:start_date]
    @repeat = args[:repeat]
    @every = args[:every] || 1
    @days = args[:days]
    @end_date = args[:end_date]
    @occurences_count = args[:occurences_count]
    @days_of_month = args[:days_of_month]
  end

  def build
    return if all_args.blank?

    new_schedule.add_recurrence_rule build_rule
    new_schedule
  end

  private

  def new_schedule
    start = start_date ? Time.parse(start_date) : Time.now
    @new_schedule ||= IceCube::Schedule.new(start)
  end

  def build_rule
    rules.inject(new_rule) { |r, method| r.send(method[0], method[1]) }
  end

  def new_rule
    @new_rule ||= IceCube::Rule
  end

  def rules
    @rules ||= mapping.to_a
  end

  def mapping
    {
      daily: set_repeating('daily'),
      weekly: set_repeating('weekly'),
      monthly: set_repeating('monthly'),
      yearly: set_repeating('yearly'),
      day: set_repeating_days, #only for weekly
      day_of_month: set_day_of_months, #only for monthly
      count: occurences_count,
      until: set_end_date
    }.compact
  end

  def set_repeating(method_name)
    repeat.to_s == method_name.to_s ? every : nil
  end

  def set_repeating_days
    repeat.to_s == WEEKLY_FREQUENCY ? days&.map(&:to_sym) : nil
  end

  def set_day_of_months
    repeat.to_s == MONTHLY_FREQUENCY ? days_of_month : nil
  end

  def set_end_date
    end_date ? Time.parse(end_date) : nil
  end
end
