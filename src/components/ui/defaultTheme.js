const colors = {
  base: {
    background: 'rgb(255, 255, 255)',
    raisedBackground: 'rgb(233, 242, 246)',
    highlightBackground: 'rgb(220, 230, 234)',
    content: 'rgb(63, 52, 44)',
    secondaryContent: 'rgba(63, 52, 44, 0.5)',
    border: 'rgb(63, 52, 44)',
  },
  contrast: {
    background: 'rgb(17, 32, 39)',
    raisedBackground: 'rgb(31, 52, 61)',
    highlightBackground: 'rgb(45, 73, 82)',
    content: 'rgb(255, 255, 255)',
    secondaryContent: 'rgba(255, 255, 255, 0.5)',
    border: 'rgb(188, 194, 197)',
  },
  primary: {
    background: 'rgb(93, 239, 161)',
    raisedBackground: 'rgb(93, 239, 161)',
    highlightBackground: 'rgb(20, 255, 149)',
    content: 'rgb(17, 32, 39)',
    secondaryContent: 'rgba(17, 32, 39, 0.5)',
    border: 'rgb(17, 32, 39)',
  },
};

export default {
  colors: {...colors, default: colors.base},
  layout: {
    distances: ['0', '4px', '8px', '16px', '32px'],
    borderWidths: ['0', '1px', '2px', '4px'],
    headerFontSizes: {1: '32px', 2: '24px', 3: '20px', 4: '16px'},
    logoFontSize: '30px',
    sidebarWidth: '350px',
    formWidth: '300px',
    listItemMaxWidths: {default: '700px', full: '100%'},
    navReservedArea: {width: '350px', height: '80px'},
  },
};
