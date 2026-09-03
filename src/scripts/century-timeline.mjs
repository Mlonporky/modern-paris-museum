const gateway = document.querySelector('[data-century-gateway]');
const buttons = [...(gateway?.querySelectorAll('[data-century]') ?? [])];
const enterButton = gateway?.querySelector('[data-enter-paris]');
const status = gateway?.querySelector('[data-century-status]');
const parisExhibition = document.querySelector('[data-paris-exhibition]');

if (gateway && buttons.length > 0 && enterButton && status && parisExhibition) {
  let selectedCentury = '19';

  const setStatus = (centuryId) => {
    status.textContent = centuryId === '19'
      ? '19世纪的巴黎展厅已经亮起。'
      : `${centuryId}世纪的展厅尚未点亮；本期展览从19世纪的巴黎开始。`;
  };

  const selectCentury = (centuryId) => {
    selectedCentury = centuryId;

    buttons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.century === centuryId));
    });

    enterButton.disabled = centuryId !== '19';
    setStatus(centuryId);
  };

  const enterParis = () => {
    if (selectedCentury !== '19') return;

    gateway.classList.add('is-entered');
    window.history.replaceState(null, '', '#paris-exhibition');
    parisExhibition.scrollIntoView({ behavior: 'smooth', block: 'start' });

    window.setTimeout(() => {
      parisExhibition.focus();
    }, 450);
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      selectCentury(button.dataset.century);

      if (button.dataset.century === '19') {
        enterParis();
      }
    });
  });

  enterButton.addEventListener('click', enterParis);
  selectCentury(window.location.hash === '#paris-exhibition' ? '19' : selectedCentury);
}
