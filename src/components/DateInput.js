import React, { useState, useEffect } from "react";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { useUtils } from "@material-ui/pickers";

const useStyles = makeStyles({
  root: {
    padding: '8px 18px',
    width: 180,
    border: '1px solid #DADCE0',
    borderRadius: 4
  },
  first: {
    marginRight: 8
  },
  icon: {
    fontSize: 18
  },
  text: {
    fontSize: 16,
    marginLeft: 8,
  },
  input: {
    fontSize: 16,
    marginLeft: 8,
    border: 'none',
    width: '100%'
  },

  active: {
    border: '2px solid #2592EA'
  },
  iconValue: {
    color: '#2592EA'
  },
  value: {
    color: '#182A3A'
  },
  noValue: {
    color: '#B0B7C9'
  }
})

const DateInput = ({ value, placeholder, active, first, inputName, onChange }) => {
  const classes = useStyles();
  const utils = useUtils();
  const [date, setDate] = useState(undefined);

  useEffect(() =>{
    const formatDate = val => utils.format(val, 'MM/dd/yy');
    setDate(!value? value: formatDate(value).toString())
  }, [utils, value]);

  const handleChange = e => {
    setDate(e.target.value)
    onChange(inputName, e.target.value)
  }

  return (
      <Box 
        display="flex" 
        alignItems="center" 
        justifyContent="space-between"
        className={clsx(
          classes.root, 
          active? classes.active: '',
          first? classes.first: ''
        )}
      >
          <Box display="flex" alignItems="center">
              <DateRangeIcon 
                className={clsx(
                  active? classes.iconValue: classes.noValue, 
                  classes.icon
                )} 
              />
              {/* { !date
                ? <Typography 
                  className={clsx(
                    value ? classes.value: classes.noValue, 
                    classes.text
                  )}
                >
                    {value ? formatDate(value).toString(): placeholder}
                </Typography> */}
              <input 
                  className={clsx(
                    value ? classes.value: classes.noValue, 
                    classes.input
                  )}
                  onChange={handleChange}
                  placeholder={placeholder}
                  name={inputName}
                  // value={date? formatDate(date).toString(): ''}
                  // value={date ? formatDate(date).toString(): date}
                  value={date? date: ''}
                />
              {/* // } */}
          </Box>
      </Box>
  );
}

export default DateInput;