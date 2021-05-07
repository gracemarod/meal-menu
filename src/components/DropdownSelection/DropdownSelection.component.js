import React from 'react';
import {Menu, MenuItem, List, ListItem, ListItemText, makeStyles} from '@material-ui/core';
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

  let newStyles = makeStyles(props.classes);
  let classes = newStyles();

  let ListItemClasses = ListItemTextStyle();
  return (
    <Dropdown >
      <List classes={{root:classes.root}} component="nav" aria-label="Dropdown">
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label={props.title}
          onClick={handleClickListItem}
        >
          <ListItemText 
            classes={{root:ListItemClasses.root,
                      secondary:ListItemClasses.secondary
            }} 
            primary={props.title} 
            secondary={props.items[selectedIndex]} />
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

const ListItemTextStyle = makeStyles({
 root:{color:'white'}, 
 secondary:{
    color:'white'
  }});


  const Dropdown = styled.div`
    // width:100%;
`;