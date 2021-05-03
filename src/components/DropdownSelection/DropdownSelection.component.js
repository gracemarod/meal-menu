import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import ListItemText  from '@material-ui/core/ListItemText';
import { useState } from 'react';

import styled from 'styled-components';

export default function SimpleListMenu(props) {

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (option, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    props.onClick(option);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Dropdown>
      <List component="nav" aria-label="Dropdown">
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="search by"
          onClick={handleClickListItem}
        >
          <ListItemText primary={props.title} secondary={props.items[selectedIndex]} />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {props.items.map((option, index) => {
          return (<MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={() => handleMenuItemClick(option, index)}
            value={props.value}
          >
            {option}
          </MenuItem>
          )})
        }
      </Menu>
    </Dropdown>
  );
}

const Dropdown = styled.div`

`