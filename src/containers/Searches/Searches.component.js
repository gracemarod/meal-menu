import React from 'react';
import {Menu, MenuItem, List, ListItem, ListItemText} from '@material-ui/core';
import { useState } from 'react';

const options = [
  'Category',
  'Ingredients',
  'Name',
  'Area'
];


export default function SimpleListMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (option, event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    props.onClick(option);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <List component="nav" aria-label="Device settings">
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="search by"
          onClick={handleClickListItem}
        >
          <ListItemText primary="Search by" secondary={options[selectedIndex]} />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(option, event, index)}
            value={props.value}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}