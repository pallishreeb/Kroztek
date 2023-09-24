import React, { useState ,useRef,useCallback} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import  {htmlToText} from 'html-to-text';
import { height } from '@mui/system';
const Editor = ({article,setArticle}) => {
    const [value, setValue] = useState();
//        const wrapperRef = useCallback(wrapper =>{
//             if(wrapper == null) return;
//             wrapper.innerHTML = value;
//             const editor = document.createElement("div")
//             wrapper.append(editor)
//        },[value])
//   console.log(value)
    const handleEditorChange = (event) =>{
        console.log("from editor",event);
        setValue(event)
    }
    return(
        <div>
            <div style={{marginTop:"0.7rem"}}>
                <ReactQuill theme={"snow"} value={value} onChange={handleEditorChange}
                 />
            </div>
             
               


           
            {/* <p id='editor' className='mt-5' ref={wrapperRef}>

            </p> */}
        
        </div>
      
    ) 
}

export default Editor