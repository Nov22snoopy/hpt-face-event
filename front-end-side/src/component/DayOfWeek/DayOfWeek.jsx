import React from 'react'

const DayOfWeek = (props) => {
  const date = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ]
  return (
    <div>{date[props.date]}</div>
  )
}

export default DayOfWeek