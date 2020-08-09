class ItemScheduler
  attr_reader :repeat, :every, :days, :end

  def initialize(**args)
    @repeat = args[:repeat]
    @every = args[:every]
    @days = args[:days]
    @end = args[:end]
  end

  def schedule
  end

  private

  def new_schedule
    @new_schedule ||= IceCube::Schedule.new(now = Time.now)
  end
end
