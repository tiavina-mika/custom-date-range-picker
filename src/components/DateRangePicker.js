import React, { useState, useEffect, cloneElement } from "react";
import clsx from 'clsx';
import { DatePicker } from "@material-ui/pickers";
import { useUtils } from "@material-ui/pickers";
import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => {
  const focusedRangeColor = fade('#2592EA', 0.3);
  const focusedRangeGradient = `linear-gradient(to right, ${focusedRangeColor}, ${focusedRangeColor})`;
  const transparentRangeGradient = `linear-gradient(to right, rgba(0,0,0,0.0), rgba(0,0,0,0.0))`;
  return {
    dateRangePickerDialog: {
      "& .MuiPickersCalendar-transitionContainer": {
        minHeight: 218,
        marginTop: 10,
      }
    },
    
    day: {
      width: 40,
      height: 36,
      fontSize: theme.typography.caption.fontSize,
      margin: 0,
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightMedium,
      padding: 0,
      transition: "none",
      "&::after": {
        borderRadius: "100%",
        bottom: 0,
        boxSizing: "border-box",
        content: '""',
        height: 36,
        width: 36,
        left: 0,
        margin: "auto",
        position: "absolute",
        right: 0,
        top: 0,
        transform: "scale(0)",
        zIndex: 2
      },
      "&:hover": {
        backgroundColor: "transparent",
        color: theme.palette.text.primary,
        "&::after": {
          backgroundColor: theme.palette.background.paper,
          border: `2px solid #2592EA`,
          bottom: -2,
          left: -2,
          height: 36,
          width: 36,
          right: -2,
          top: -2,
          boxSizing: "content-box",
          transform: "scale(1)"
        }
      },
      "& > .MuiIconButton-label": {
        zIndex: 3
      }
    },
    hidden: {
      opacity: 0,
      pointerEvents: "none"
    },
    current: {
      color: '#2592EA',
      fontWeight: 600
    },
    focusedRange: {
      color: theme.palette.primary.contrastText,
      background: `${focusedRangeGradient} no-repeat 0/20px 40px, ${focusedRangeGradient} no-repeat 20px 0/20px 40px`,
      fontWeight: theme.typography.fontWeightMedium,
      width: 40,
      marginRight: 0,
      marginLeft: 0,
      borderRadius: 0
    },
    dayDisabled: {
      pointerEvents: "none",
      color: theme.palette.text.hint
    },
    isDisabled: {
      pointerEvents: "none",
      color: theme.palette.text.hint,
      '&:hover': {
        backgroundColor: 'transparent',
      }
    },
    beginCap: {
      "&::after": {
        transform: "scale(1)",
        backgroundColor: '#2592EA'
      }
    },
    endCap: {
      "&::after": {
        transform: "scale(1)",
        backgroundColor: '#2592EA'
      }
    },
    focusedFirst: {
      background: `${transparentRangeGradient} no-repeat 0/20px 40px,${focusedRangeGradient} no-repeat 20px 0/20px 40px`
    },
    focusedLast: {
      background: `${focusedRangeGradient} no-repeat 0/20px 40px,${transparentRangeGradient} no-repeat 20px 0/20px 40px`
    }
  };
})

const DateRangePicker = ({
  date, onChange, value, onClick,
  ...props}) => {
  const utils = useUtils();
  const [begin, setBegin] = useState(value[0]);
  const [end, setEnd] = useState(value[1]);
  const [hover, setHover] = useState(undefined);

  const min = Math.min(begin, end || hover);
  const max = Math.max(begin, end || hover);

  const classes = useStyles();

  useEffect(() => onChange({ begin, end }), [begin, end, onChange])

  // prettier-ignore
  const renderDay = (day, selectedDate, dayInCurrentMonth, dayComponent) => {
    return cloneElement(dayComponent, {
      onClick: e => {
        e.stopPropagation();
        if (!begin) {
          setBegin(day)
          onClick('begin', day)
        }
        else if (!end) {
          if (utils.isBeforeDay(day, begin)) {
            onClick('begin', begin)
            onClick('end', day)

            setEnd(begin);
            setBegin(day);
          } else {
            setEnd(day);
            onClick('end', day)
          }
        } else {
          onClick('begin', day)

          setBegin(day);
          setEnd(undefined);
        }
      },
      onMouseEnter: () => requestAnimationFrame(() => setHover(day)),
      onFocus: () => requestAnimationFrame(() => setHover(day)),
      className: clsx(!utils.isAfterDay(day, new Date())? classes.day: '', {
        [classes.hidden]: dayComponent.props.hidden,
        [classes.current]: dayComponent.props.current,
        [classes.isDisabled]: dayComponent.props.disabled,
        [classes.focusedRange]:
          (utils.isAfterDay(day, min) && utils.isBeforeDay(day, max)) ||
          (utils.isSameDay(day, min) && !utils.isSameDay(day, max)) ||
          (utils.isSameDay(day, max) && !utils.isSameDay(day, min)),
        [classes.focusedFirst]:
          utils.isSameDay(day, min) && !utils.isSameDay(day, max),
        [classes.focusedLast]:
          utils.isSameDay(day, max) && !utils.isSameDay(day, min),
        [classes.beginCap]: utils.isSameDay(day, min),
        [classes.endCap]: utils.isSameDay(day, max)
      })
    });
  }
  return (
    <>
      <DatePicker
        {...props}
        autoOk
        // openTo="date"
        renderDay={renderDay}     
      />
    </>
  );
};

export default DateRangePicker;