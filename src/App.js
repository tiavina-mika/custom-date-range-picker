import React, { useState } from "react";
import { useUtils } from "@material-ui/pickers";
import Box from '@material-ui/core/Box';
import SelectDate from './components/SelectDate';
import Dialog from './components/Dialog';
import format from "date-fns/format";
import isValid from "date-fns/isValid";
import isEqual from "date-fns/isEqual";
const dateFormat = "MMM do yyyy";

const App = () => {
  const [begin, setBegin] = useState(false);
  const [end, setEnd] = useState(false);
  const [open, setOpen] = useState(false);

  const [beginInput, setBeginInput] = useState(false);
  const [endInput, setEndInput] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState('');

  // console.log('error', error)
  // console.log('endInput', endInput)
  // console.log('beginInput', beginInput)

  const utils = useUtils();

  const handleOpen = () => setOpen(!open);
  const formatDate = date => utils.format(date, dateFormat || utils.dateFormat);

  const handleChange = values => {
    setBegin(values.begin);
    setEnd(values.end);
    setClicked(!clicked);
  }

  
  const handleInputChange = (name, value) => {
    // console.log('format', format(value, 'MM/dd/yyyy'))
    // console.log('isValid', isValid(new Date(value)))
    // console.log('format', format(new Date(value), 'MM/dd/yyyy'))
      if (!isValid(new Date(value))) {
        setError('Date Invalid');
        return;
      }
      const formattedValue = format(new Date(value), 'MM/dd/yy')
      if (name === "start") setBeginInput(new Date(formattedValue));
      if (name === "end") setEndInput(new Date(formattedValue));
  }

  const handleSubmit = () => {
    let startDateString = begin.toISOString();
    let endDateString = end.toISOString();
    
    // if (begin) console.log("begin", begin.toISOString());
    // if (beginInput) console.log("beginInput", new Date(beginInput).toISOString());
    // if (endInput) console.log("endInput", endInput);
    // if (end) console.log("end", end);

    if (beginInput && !clicked) startDateString = new Date(beginInput).toISOString();
    if (endInput && !clicked) endDateString = new Date(endInput).toISOString();
    console.log("startDateString", startDateString);
    console.log("endDateString", endDateString);
    setOpen(false);
  }

  const handleCancel = () => {
    setBegin(false);
    setEnd(false);
    setOpen(false);
  }

  // console.log('isEqual', isEqual(beginInput, begin))
  // console.log('endInput', endInput)
  // console.log('beginInput', beginInput)
  // console.log('begin', begin)
  // console.log('end', end)

  return (
      <Box bgcolor="#00132C" p={3} height="100vh">
          <Box display="flex" justifyContent="center" p={2}>
            <SelectDate 
                begin={beginInput || begin}
                end={endInput || end}
                // begin={begin}
                // end={end}
                open={open}
                placeholder="From"
                onClick={handleOpen}
                formatDate={formatDate}
            />
          </Box>
          {/* { open && ( */}
            <Dialog 
                formatDate={formatDate}
                onClick={handleOpen}
                open={open}
                onChange={handleChange}
                begin={beginInput || begin}
                end={endInput || end}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                onInputChange={handleInputChange}
                // begin={begin}
                // end={end}
            />
          {/* // )} */}
      </Box>
  );
}

export default App;