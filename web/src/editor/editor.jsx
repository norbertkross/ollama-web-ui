import React, { useState, useEffect } from 'react'
import Send from "../assets/rocket.svg"
import Wand from "../assets/wand-magic-sparkles.svg"
import Dust from "../assets/meteocons-dust.svg"
import Hurricane from "../assets/meteocons-hurricane.svg"
import Blocks from "../assets/spinners-blocks.svg"
import Add from "../assets/circle-plus.svg"
import MODELS_ICON from "../assets/layer-plus-black.svg"
import DASH from "../assets/square-dashed.svg"

import "./editor.css"
import axios from 'axios';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'
import FilePicker from './file_picker_custom'
import DropDownMenuHover from '../components/dropdown_menu_hover'

export default function Editor() {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [allModels, setAllModels] = useState(["Llama2","Llama3","Lava"]);

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
    console.log("value ",event.target.value);
  };
 
  const postData = async () => {
    setResponseData(null)
    setLoading(true)
    console.log(prompt);
    try {
      const response = await axios.post('http://localhost:11434/api/generate', {
        "model": "llama3",
        "prompt": prompt || "Why is the sky blue?",
        
        "stream": false
      });

      console.log("RESP: ",response.data);

      // Store the response data in the state variable
      setResponseData(response.data.response);
      setLoading(false)
    } catch (error) {
      console.error('Error:', error);
    }
  };





  return (
    <div>

    <div style={{
        display:'flex',
        justifyContent:'space-between'
    }}>
       <div style={{
        color:'black',
        fontWeight:'bold',
        fontSize:'24px',
        marginLeft:'10px',
        marginBottom:'0px'
       }}>Harery</div>

      <DropDownMenuHover children={
       <img src={DASH} width={30} height={30} style={{paddingRight:'10px',cursor:'pointer'}}/>
      } 
      body={
        <div>
          {allModels.map((el,index)=>{
                return <div>
                  <div 
                    onClick={event=>{}}
                    style={{
                        fontSize:"14px",
                        color: 'black',
                        display:'flex',
                        justifyContent:'center',
                        padding:'8px 18px',
                        borderRadius:'4px',
                        alignItems:'center',
                      }}
                    >
                {el}
           </div>
           { index < allModels.length -1? 
            <div style={{ width:'100%',height:'1.0px',backgroundColor:'#f5f5f5',fontWeight:'bold' }} />
          :
          <div></div>
          }
                </div>
            })}
        </div>
      }
      />

    </div>

    { loading == null?
        <AppCard 
            label={"Lebalry"} logo={Wand} 
            onTyped={e=>{
            handleInputChange(e)
             }}  
            request={e=>{
            console.log('before request');
            postData()
              }}  
            markdown_text={responseData} 
            isCenter={true} 
            postData={postData}
        />
        :
        loading ==true?
        <AppCard label={"Lebalry"} logo={Blocks} onTyped={e=>{
            handleInputChange(e)
        }}  request={e=>{
            postData()
        }}  markdown_text={responseData} isCenter={true}  postData={postData}/> 
        :
        <AppCard label={"Lebalry"} logo={Hurricane} markdown_text={responseData} onTyped={e=>{
            handleInputChange(e)
        }} request={e=>{
            postData()
        }} postData={postData} /> 
    }

    </div>
  )
}

  


const AppCard=({label,logo,markdown_text = null,onTyped,prompt_,request,isCenter,postData})=>{
    // console.log('markdown text: ', markdown_text);
    let borderRadius = 8
  
    return <div style={{
      width:'80vw',
      height:'80vh',
      borderRadius:`${borderRadius}px`,
      margin: '8px',
      backgroundColor: 'white',
      boxShadow: 'rgba(3, 102, 214, 0.01) 0px 0px 0px 3px',
      boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
      border:`1px solid #f1f1f2`
    }}>
     <div style={{
      backgroundColor:'#fafafa57',
      width:'100%',
      height:'90%',
      borderRadius: `${borderRadius}px ${borderRadius}px 0 0`,
      display:'flex',
      justifyContent: isCenter == true? 'center' : 'flex-start',
      alignItems: isCenter == null? 'flex-start' : 'center',
      overflowY:'scroll',
    //   padding:'40px 0px'
     }}>
          { 
          markdown_text ==  null?  <img src={logo} width={50} height={50}/> 
          : 
          <div style={{backgroundColor:'transparent',color:'black',margin:'10px',textAlign: 'left' }}> 
          
          {/* <MarkdownWithSyntaxHighlighting  content={markdown_text}> </MarkdownWithSyntaxHighlighting> */}
          {/* <Markdown trim={false} remarkPlugins={[remarkGfm]}>{markdown_text}</Markdown> */}

          <Markdown
      remarkPlugins={[remarkGfm]}
    //   rehypePlugins={[rehypeRaw]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');

          return !inline && match ? (
            <SyntaxHighlighter style={dracula} PreTag="div" language={match[1]} {...props}>
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {markdown_text}
    </Markdown>

          </div>
          }
  
     </div>
     <div style={{ height: '1px',width:'100%', backgroundColor:"#f1f1f1"}} />
     <div style={{ height: '8px',}} />
     <div style={{
      height:'48px',
      backgroundColor:'white',
      borderRadius: `0 0 ${borderRadius}px ${borderRadius}px`,
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      fontSize:'14px',
      display:'flex',
      justifyContent:"space-between",
      padding:'0px 20px',
   
     }}>

      <div style={{
        display:'flex',
      }}>

        <FilePicker />
        {/* <img src={Add} width={35} height={35}/> */}
        

      <textarea 
      name='input-box'
        value={prompt_}
        onChange={(e)=> {
            onTyped(e)
            // handleInputChange
        }}
        type='text' 
        placeholder='Ask Lebalry anything...'
        style={{
            width:'450px',
            height:'40px',
            border:`0px solid`,
            marginLeft:'20px',
            backgroundColor:'transparent'
          }}
          ></textarea>

      </div>



      <div 
      onClick={e=>{
        // request(true)
        postData()
      }}
      style={{
        backgroundColor:'black',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'130px',
        height:'48px',
        borderRadius:'8px'
      }}>
        <img src={Send} width={26} height={26}/>
      </div>
  
     </div>
    </div>
  }


  