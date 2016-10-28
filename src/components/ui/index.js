import withTheme from './withTheme';
import BaseButton from './Button';
import BaseLinkButton from './LinkButton';
import BaseInput from './Input';
import BaseList from './List';
import BaseListItem from './ListItem';
import BaseListGroup from './ListGroup';
import BaseSidebarLayout from './SidebarLayout';
import BaseNavOverlay from './NavOverlay';
import BaseNavReservedArea from './NavReservedArea';
import BaseThemedArea from './ThemedArea';
import BaseForm from './Form';
import BaseFormElement from './FormElement';
import BaseHeader from './Header';
import BasePaddedPage from './PaddedPage';

export const Button = withTheme(BaseButton);
export const LinkButton = withTheme(BaseLinkButton);
export const Input = withTheme(BaseInput);
export const List = withTheme(BaseList);
export const ListItem = withTheme(BaseListItem);
export const ListGroup = withTheme(BaseListGroup);
export const SidebarLayout = withTheme(BaseSidebarLayout);
export const NavOverlay = withTheme(BaseNavOverlay);
export const NavReservedArea = withTheme(BaseNavReservedArea);
export const ThemedArea = withTheme(BaseThemedArea);
export const Form = withTheme(BaseForm);
export const FormElement = withTheme(BaseFormElement);
export const Header = withTheme(BaseHeader);
export const PaddedPage = withTheme(BasePaddedPage);
