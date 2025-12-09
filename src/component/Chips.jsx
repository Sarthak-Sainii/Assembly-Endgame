import React from 'react'

const Chips = (props) => {
    const styles={
        backgroundColor:props.backgroundColor,
        color:props.color
    }
  return (
    
        <span className={props.className} style={styles}>
        {props.name}
        </span>
    
  )
}

export default Chips
