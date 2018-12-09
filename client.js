import moment from 'moment';
import hcIcon from './hc-icon.svg';

var GRAY_ICON = hcIcon;

const onCycleInfoClick = (t, opts) => {
  return t.popup({
    title: 'Cycle Info',
    url: './cycle-info.html',
    height: 350
  });
};

TrelloPowerUp.initialize({
  'board-buttons': function(t, opts) {
    return t.get('board', 'shared').then(data => {
      const cycleStarts = moment(data.cycleStarts, 'YYYYMMDD');
      const cycleEnds = moment(data.cycleEnds, 'YYYYMMDD');
      let label = 'Cycle dates are not set';
      const now = moment();

      if (cycleEnds > now) {
        label = `Cycle ends in ${Math.ceil(cycleEnds.diff(now, 'days', true))} days`;
      }
      if (cycleEnds < now) {
        label = 'Cycle has ended';
      }
      if (cycleStarts > now) {
        label = `Cycle begins in ${Math.ceil(cycleStarts.diff(now, 'days', true))} days`;
      }
      return [
        {
          text: label,
          condition: 'always',
          callback: onCycleInfoClick
        }
      ];
    });
  },
  'card-back-section': function(t, options) {
    const { card } = t.getContext();
    return t.get(card, 'shared').then(data => {
      if (!data.visible) return null;
      return {
        title: 'Hill Chart',
        icon: GRAY_ICON,
        content: {
          type: 'iframe',
          url: t.signUrl('./back-section.html'),
          height: 150 // Max height is 500
        }
      };
    });
  },
  'card-buttons': function(t, opts) {
    const { card } = t.getContext();
    return t.get(card, 'shared').then(data => {
      return [
        {
          text: data.visible ? 'Disable Hill Chart' : 'Enable Hill Chart',
          callback: (t, opts) => {
            t.set(card, 'shared', { visible: !data.visible });
          }
        }
      ];
    });
  },
  'card-badges': function(t, opts) {
    const { card } = t.getContext();

    return t.get(card, 'shared').then(data => {
      if (!data.visible) return [];
      const pos = data.pos || 0;
      const present = Math.ceil((pos / 0.5) * 10) * 10;
      const text =
        pos < 0.5
          ? `Figuring out (~${present}%)`.toUpperCase()
          : `Doing it (~${present - 100}%)`.toUpperCase();
      return [
        {
          text,
          color: pos < 0.5 ? 'orange' : 'green'
        }
      ];
    });
  }
});
