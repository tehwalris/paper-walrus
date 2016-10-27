const colors = {
  base: {
    background: 'wheat',
    raisedBackground: 'brown',
    highlightBackground: 'yellow',
    content: 'black',
  },
  contrast: {
    background: 'black',
    raisedBackground: '#2d2828',
    highlightBackground: 'grey',
    content: 'white',
  },
  primary: {
    background: 'green',
    raisedBackground: 'blue',
    highlightBackground: 'yellow',
    content: 'white',
  },
};

export default {
  colors: {...colors, default: colors.base},
  layout: {
    distances: ['0', '4px', '8px', '16px', '32px'],
    borderWidths: ['0', '1px', '2px', '4px'],
    sidebarWidth: '350px',
    navReservedArea: {width: '350px', height: '80px'},
    logoFontSize: '30px',
  },
};
