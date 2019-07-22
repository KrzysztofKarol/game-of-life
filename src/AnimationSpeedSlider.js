import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import * as R from 'ramda';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAnimationSpeed } from './store/actions';

const marks = [1, 2, 5, 10, 20].map(mark => ({
  value: mark,
  label: mark.toString(),
}));

function AnimationSpeedSlider() {
  const dispatch = useDispatch();
  const { speed } = useSelector(R.prop('settings'));

  return (
    <>
      <Typography id="slider" gutterBottom>
        Animation speed [ticks/s]
      </Typography>
      <Slider
        defaultValue={speed}
        aria-labelledby="slider"
        valueLabelDisplay="auto"
        step={null}
        marks={marks}
        min={R.prop('value', R.head(marks))}
        max={R.prop('value', R.last(marks))}
        onChangeCommitted={(e, value) => dispatch(setAnimationSpeed(value))}
      />
    </>
  );
}

export default AnimationSpeedSlider;
