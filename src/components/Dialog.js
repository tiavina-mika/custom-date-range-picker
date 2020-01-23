import React from "react";
import clsx from "clsx";
import DateRangePicker from "./DateRangePicker";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { makeStyles, fade } from "@material-ui/core/styles";
import DateInput from './DateInput';
// import format from "date-fns/format";
// import isValid from "date-fns/isValid";

const useStyles = makeStyles({
  header: {
    borderBottom: '1px solid #DADCE0',
  },
  footer: {
    borderTop: '1px solid #DADCE0'
  },
  button: {
    textTransform: 'inherit',
    padding: '5px 25px',
    fontSize: 16,
    borderRadius: 10
  },
  activeButton: {
    backgroundColor: '#2592EA',
    color: '#fff',
    '&:hover': {
      backgroundColor: fade('#2592EA', 0.5),
    }
  },
  disabledButton: {
    backgroundColor: '#E0E0E0'
  }
});
const Dialog = ({ error, onClick, begin, end, formatDate, onChange, open, onSubmit, onCancel, onInputChange }) => {
  const classes = useStyles();
  // const [beginInput, setBeginInput] = useState(false);
  // const [endInput, setEndInput] = useState(false);
  // const [error, setError] = useState('');

  // const handleChange = (name, value) => {
  // // console.log('format', format(value, 'MM/dd/yyyy'))
  // // console.log('isValid', isValid(new Date(value)))
  // // console.log('format', format(new Date(value), 'MM/dd/yyyy'))
  //   if (!isValid(new Date(value))) {
  //     setError('Date Invalid');
  //     return;
  //   }
  //   if (name === "start") setBeginInput(format(new Date(value), 'MM/dd/yyyy'));
  //   if (name === "end") setEndInput(format(new Date(value), 'MM/dd/yyyy'));
  // }
  // console.log('error', error)
  // console.log('endInput', endInput)
  // console.log('beginInput', beginInput)


  return (
    <Box display="flex" justifyContent="center">
        <Box 
          bgcolor="#fff" 
          display="flex" 
          flexDirection="column" 
          alignItems="center"
          borderRadius={5}
        >
          {/* Header */}
          <Box p={1} className={classes.header}>
              <Box display="flex"  justifyContent="space-between">
                <DateInput
                    value={begin}
                    formatDate={formatDate}
                    placeholder="Start Date"
                    active={open && !begin}
                    inputName="start"
                    onChange={onInputChange}
                    first
                />
                <DateInput
                    value={end}
                    formatDate={formatDate}
                    placeholder="End Date"
                    active={begin}
                    onChange={onInputChange}
                    inputName="end"
                />
              </Box>
              {error &&
                <Box display="flex" justifyContent="center" pt={0.5} color="red">{error} </Box>
              }
            </Box>
            
          {/* Body */}
          <Box display="flex">
            <DateRangePicker
              variant="static"
              disableToolbar
              onClick={onClick}
              disableFuture
              value={[]}
              open={open}
              onChange={onChange}
            />
          </Box>

          {/* Footer */}
          <Box 
            className={classes.footer} 
            p={1}
            alignItems="center"
            display="flex" 
            alignSelf="stretch"
            justifyContent="space-between">
                <Button 
                  onClick={onCancel}
                  className={classes.button}>
                    Cancel
                </Button>
                <Button
                  onClick={onSubmit} 
                  className={clsx(
                    classes.button, 
                    !begin || !end? classes.disabledButton: classes.activeButton
                  )}
                  disabled={!begin || !end}
                >
                    Apply
                </Button>
          </Box>

          </Box>
      </Box>
  );
}

export default Dialog;
