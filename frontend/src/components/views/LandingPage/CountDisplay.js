import React from 'react';
import { useSelector } from 'react-redux';
import { selectCount } from '../../../_slices/counterSlice';

function CountDisplay() {
  const count = useSelector(selectCount)

  return (
    <div>
      <span>{count}</span>
    </div>
  )
}

export default CountDisplay