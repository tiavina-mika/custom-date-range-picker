import React, { useState } from "react";
import { useUtils } from "@material-ui/pickers";
import Box from '@material-ui/core/Box';
import SelectDate from './components/SelectDate';
import Dialog from './components/Dialog';
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

const dateFormat = "MMM do yyyy";

const App = () => {
  const [begin, setBegin] = useState(false);
  const [end, setEnd] = useState(false);
  const [open, setOpen] = useState(false);

  const [beginInput, setBeginInput] = useState(false);
  const [endInput, setEndInput] = useState(false);
  const [error, setError] = useState('');

  const utils = useUtils();

  const handleOpen = () => setOpen(!open);
  const formatDate = date => utils.format(date, dateFormat || utils.dateFormat);

  const handleChange = values => {
    setBegin(values.begin);
    setEnd(values.end);
  }

  const handleClick = (name, day) => {
    if (name === "begin") setBeginInput(day);
    if (name === "end") setEndInput(day);
  }

  
  const handleInputChange = (name, value) => {
      const formattedValue = format(new Date(value), 'MM/dd/yy')
      if (name === "start") setBeginInput(new Date(formattedValue));
      if (name === "end") setEndInput(new Date(formattedValue));
  }

  const handleSubmit = () => {
    let startDateString;
    let endDateString;

    if (begin) startDateString = begin.toISOString();
    if (end) endDateString = end.toISOString();
    if (beginInput) startDateString = new Date(beginInput).toISOString();
    if (endInput) endDateString = new Date(endInput).toISOString();

    if (utils.isBefore(parseISO(endDateString), parseISO(startDateString))) {
      setError('Start date must be before end date');
      return;
    }
    setError('');
    console.log("startDateString", startDateString);
    console.log("endDateString",endDateString);
    setOpen(false);
  }

  const handleCancel = () => {
    setBegin(false);
    setEnd(false);
    setOpen(false);
  }

  return (
      <Box bgcolor="#00132C" p={3} height="100vh">
          <Box display="flex" justifyContent="center" p={2}>
            <SelectDate 
                begin={beginInput || begin}
                end={endInput || end}
                open={open}
                placeholder="From"
                onClick={handleOpen}
                formatDate={formatDate}
            />
          </Box>
          { open && (
            <Dialog 
                error={error}
                formatDate={formatDate}
                open={open}
                onChange={handleChange}
                begin={beginInput || begin}
                end={endInput || end}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                onInputChange={handleInputChange}
                onClick={handleClick}
            />
          )}
      </Box>
  );
}

export default App;