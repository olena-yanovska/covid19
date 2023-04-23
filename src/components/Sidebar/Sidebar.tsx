import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export const Sidebar: React.FC = () => {
  return (
    <Box sx={{ width: '20%', minWidth: '150px' }}>
      <nav aria-label="secondary mailbox folders">
        <List component="ul">
          <ListItem disablePadding component={Link} to="/world-wip">
            <ListItemButton>
              <ListItemText primary="World WIP" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding component={Link} to="/live-by-country">
            <ListItemButton>
              <ListItemText primary="Live by Country" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding component={Link} to="/about">
            <ListItemButton>
              <ListItemText primary="About" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
};