import React, { useRef } from 'react';
import Add from "../assets/circle-plus.svg"

const FilePicker = ({ onFileSelect }) => {
  // Reference to the file input element
  const fileInputRef = useRef(null);

  // Function to handle file selection
  const handleFileSelect = (event) => {
    const files = event.target.files; // Get the selected file
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      onFileSelect(file); // Pass the selected file to the parent component
      f
    }
  };

  // Function to trigger click event on file input
  const openFilePicker = () => {
    fileInputRef.current.click(); // Trigger click event on file input
  };

  return (
    <div>
      {/* Custom styled button */}
      
      <img onClick={openFilePicker} style={{cursor:'pointer'}} src={Add} width={35} height={35}/>
      {/* <button onClick={openFilePicker}>Select File</button> */}
      
      {/* Hidden file input element */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileSelect} 
        style={{ display: 'none' }} 
        accept="image/*" 
      />
    </div>
  );
};

export default FilePicker;
