import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export const Sidebar: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState(sessionStorage.getItem('selectedItem') || 'about',);

  const handleListItemClick = (
    value: string,
  ) => {
    setSelectedItem(value);
  };

  useEffect(() => {
    sessionStorage.setItem('selectedItem', selectedItem);
  }, [selectedItem]);

  return (
    <Box sx={{ width: '200px' }}>
      <nav aria-label="secondary mailbox folders">
        <List component="ul">
          <ListItem disablePadding component={Link} to="/world-wip" >
            <ListItemButton
              selected={selectedItem === 'world'}
              onClick={() => handleListItemClick('world')}
            >
              <ListItemText primary="World WIP" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding component={Link} to="/live-by-country">
            <ListItemButton
              selected={selectedItem === 'live-by'}
              onClick={() => handleListItemClick('live-by')}
            >
              <ListItemText primary="Live by Country" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding component={Link} to="/about">
            <ListItemButton
              selected={selectedItem === 'about'}
              onClick={() => handleListItemClick('about')}
            >
              <ListItemText primary="About" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
};
