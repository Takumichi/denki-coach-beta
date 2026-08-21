(() => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(new Date());

  const value = type => parts.find(part => part.type === type)?.value || '';
  const today = `${value('year')}/${value('month')}/${value('day')}`;

  if (!/^\d{4}\/\d{2}\/\d{2}$/.test(today)) return;

  state.homeDate = today;
  state.homeListDate = today;
  state.calendarMonth = today.slice(0, 7);
  state.selectedWorkDate = today;

  const firstWork = Array.isArray(state.dailyWorks)
    ? state.dailyWorks.find(work => work.date === today)
    : undefined;

  if (firstWork) {
    state.activeWorkId = firstWork.id;
    state.activeAssignee = firstWork.assignee;
    state.activeScheduleId = firstWork.scheduleId;
  }

  render();
})();
