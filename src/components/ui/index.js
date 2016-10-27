import withTheme from './withTheme';
import BaseButton from './Button';
import BaseInput from './Input';
import BaseList from './List';
import BaseListItem from './ListItem';
import BaseSidebarLayout from './SidebarLayout';
import BaseNavOverlay from './NavOverlay';
import BaseNavReservedArea from './NavReservedArea';
import BaseThemedArea from './ThemedArea';

export const Button = withTheme(BaseButton);
export const Input = withTheme(BaseInput);
export const List = withTheme(BaseList);
export const ListItem = withTheme(BaseListItem);
export const SidebarLayout = withTheme(BaseSidebarLayout);
export const NavOverlay = withTheme(BaseNavOverlay);
export const NavReservedArea = withTheme(BaseNavReservedArea);
export const ThemedArea = withTheme(BaseThemedArea);