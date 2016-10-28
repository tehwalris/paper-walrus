import res from 'res';
import {defaultMemoize} from 'reselect';

export default defaultMemoize(() => ({
  dpi: res.dpi(),
  dppx: res.dppx(),
}));
