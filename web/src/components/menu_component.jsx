import React,{ useEffect,useState } from 'react'
import DropDownMenuHover from './dropdown_menu_hover'



export default function MenuComponent({list = [],label='',isRequired=false,justify = 'flex-end',onOptionSelected}) {
    const [selectedOption, setSelectedOption] = useState('');

useEffect(() => {
    setSelectedOption(list[0])
    if(onOptionSelected != null){
        onOptionSelected(list[0])
    }
}, [])


  return (
    <div style={{
        width:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent: justify
    }}>

<div style={{color:grey[400]}}>{`${label} ${isRequired ==true? '*':''}`}</div>
    
    <div style={{width: '10px'}} />

    <DropDownMenuHover 
    children={
        <div style={{
            fontSize:"14px",border:`1.2px solid black`,
            color: 'black',display:'flex',
            justifyContent:'center',
            padding:'8px 18px',
            borderRadius:'4px',
            alignItems:'center',
            cursor:'pointer',
            width:'130px'
        }}>{selectedOption}</div>
    } 
    body={
        <div>
            {list.map((e)=>{
                return <div 
                
                onClick={event=>{
                    setSelectedOption(e)
                    onOptionSelected(e)
                }}
                style={{
                    fontSize:"14px",
                    color: 'black',
                    display:'flex',
                    justifyContent:'center',
                    padding:'8px 18px',
                    borderRadius:'4px',
                    alignItems:'center'}}>{e}</div>;
            })}
          
        </div>
        } 
        />
    </div>
  )
}
