import React from "react";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  root: {
    padding: '7px 17px',
    cursor: 'pointer',
    marginRight: 20,
    borderRadius: 8
  },
  icon: {
    fontSize: 18
  },
  textContainer: {
    marginRight: 15
  },
  text: {
    fontSize: 16,
    marginLeft: 8
  },
  onDark: {
    color: '#A7AEB7',
  },
})

const SelectDate = ({ onClick, open, begin, end, formatDate, placeholder, active }) => {
  const classes = useStyles();

  return (
      <Box 
        onClick={onClick} 
        display="flex" 
        alignItems="center" 
        justifyContent="space-between"
        bgcolor="#07213A"
        className={clsx(classes.root, active? classes.active: '')}>
          <Box 
            display="flex" 
            alignItems="flex-start" 
            className={classes.textContainer}>
              <Typography className={clsx(classes.text, classes.onDark)}>
                  {begin 
                    ? end
                      ? `${formatDate(begin).toString()} - ${formatDate(end).toString()}`
                      : formatDate(begin).toString()
                    : placeholder
                  }
              </Typography>
          </Box>
          <Box display="flex">
            <img 
              src={
                open
                  ? `https://infallible-shtern-usr4q.codesandbox.io/uparrow.svg`
                  :`https://infallible-shtern-usr4q.codesandbox.io/upsidedownarrow.svg`
                } 
              alt="icon" 
            />
          </Box>
      </Box>
  );
}

export default SelectDate;