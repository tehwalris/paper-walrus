const colors = {
  base: {
    background: 'wheat',
    highlightBackground: 'yellow',
    content: 'black',
  },
  contrast: {
    background: 'black',
    highlightBackground: 'grey',
    content: 'white',
  },
  primary: {
    background: 'green',
    highlightBackground: 'yellow',
    content: 'white',
  },
};

export default {
  colors: {...colors, default: colors.base},
  layout: {
    distances: ['0', '4px', '8px', '16px', '32px'],
    sidebarWidth: '350px',
    navReservedArea: {width: '350px', height: '80px'},
    logoFontSize: '30px',
  },
};
