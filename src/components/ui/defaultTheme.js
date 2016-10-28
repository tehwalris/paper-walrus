const colors = {
  base: {
    background: 'rgb(255, 255, 255)',
    raisedBackground: 'rgb(233, 242, 246)',
    highlightBackground: 'rgb(220, 230, 234)',
    content: 'rgb(63, 52, 44)',
  },
  contrast: {
    background: 'rgb(17, 32, 39)',
    raisedBackground: 'rgb(31, 52, 61)',
    highlightBackground: 'rgb(45, 73, 82)',
    content: 'rgb(255, 255, 255)',
  },
  primary: {
    background: 'rgb(21, 209, 124)',
    raisedBackground: 'rgb(21, 209, 124)',
    highlightBackground: 'rgb(20, 255, 149)',
    content: 'rgb(17, 32, 39)',
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
