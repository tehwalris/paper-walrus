import {mapValues} from 'lodash';

const draggableTypePrefix = 'pw-draggable-type-';

const types = {
  DocumentPart: 'DocumentPart',
};

export default mapValues(types, value => draggableTypePrefix + value);
