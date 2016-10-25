import withTheme from './withTheme';
import BaseButton from './Button';
import BaseList from './List';
import BaseListItem from './ListItem';
import BaseSidebarLayout from './SidebarLayout';

export const Button = withTheme(BaseButton);
export const List = withTheme(BaseList);
export const ListItem = withTheme(BaseListItem);
export const SidebarLayout = withTheme(BaseSidebarLayout);
