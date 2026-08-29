const buttons = [...document.querySelectorAll('[data-timeline-button]')];
const panels = [...document.querySelectorAll('[data-timeline-panel]')];

if (buttons.length > 0 && panels.length > 0) {
  const panelIds = new Set(panels.map((panel) => panel.dataset.timelinePanel));
  const aliases = new Map(
    buttons.flatMap((button) => (button.dataset.timelineAliases ?? '')
      .split(',')
      .filter(Boolean)
      .map((alias) => [alias, button.dataset.timelineButton])),
  );

  const setActiveEvent = (eventId, updateUrl = true) => {
    if (!panelIds.has(eventId)) return;

    buttons.forEach((button) => {
      const isActive = button.dataset.timelineButton === eventId;
      button.setAttribute('aria-pressed', String(isActive));
    });

    panels.forEach((panel) => {
      panel.hidden = panel.dataset.timelinePanel !== eventId;
    });

    if (updateUrl) {
      window.history.replaceState(null, '', `#timeline-${eventId}`);
    }
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      setActiveEvent(button.dataset.timelineButton);
    });
  });

  const requestedEvent = window.location.hash.startsWith('#timeline-')
    ? window.location.hash.slice('#timeline-'.length)
    : null;
  const initialEvent = requestedEvent && panelIds.has(requestedEvent)
    ? requestedEvent
    : aliases.get(requestedEvent) ?? buttons[0].dataset.timelineButton;

  setActiveEvent(initialEvent, false);
}
