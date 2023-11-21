import { useState, useRef, forwardRef, useEffect } from "react";
import '../App.css';
import { CiCirclePlus } from "react-icons/ci";
const ThreeImage = forwardRef( (props, ref)=>{
  const [imageURLState, setImageURLState] = useState({r1:"", r2:"", r3:""});
  // r1, r2, r3


  let uploadImage = (e, idx)=>{
    const file = e.target.files[0];
    const imageURL = URL.createObjectURL(file);
    
    let tempURL = {...imageURLState}
    tempURL[idx] = imageURL;
    setImageURLState(tempURL);

    let temp = [...props.dataList]
    temp.forEach((item)=>{
      if(item.id==props.id){
        item.data = tempURL;
        props.setDataList(temp);
        return;
      }
    })
    
    temp.push({id:props.id, data:tempURL});
    props.setDataList(temp);
  }

  useEffect(()=>{
    props.dataList.forEach((it)=>{if(it.id == props.id){
      setImageURLState(it.data);
    }});
  })

  let inputRef1 = useRef();
  let inputRef2 = useRef();
  let inputRef3 = useRef();
  let inputBtnRef1 = useRef();
  let inputBtnRef2 = useRef();
  let inputBtnRef3 = useRef();
  return(
    <>
    <div className="wrapper">
      <div className="uploadImage-btn-container">
        <input ref={inputRef1} className="uploadImage-input" type="file"id="image_uploads"name="image_uploads"accept=".jpg, .jpeg, .png" onChange={(e)=>{uploadImage(e,"r1")}}/>
      </div>
      <div className="uploadImage-btn-container">
        <input ref={inputRef2} className="uploadImage-input" type="file"id="image_uploads"name="image_uploads"accept=".jpg, .jpeg, .png" onChange={(e)=>{uploadImage(e,"r2")}}/>
      </div>
      <div className="uploadImage-btn-container">
        <input ref={inputRef3} className="uploadImage-input" type="file"id="image_uploads"name="image_uploads"accept=".jpg, .jpeg, .png" onChange={(e)=>{uploadImage(e,"r3")}}/>
      </div>

      <div className="threeImage-container">

        <div ref={inputBtnRef1} className="threeImage-upload-Btn" onClick={()=>{
          inputRef1.current.click()
        }}>
          <CiCirclePlus />
          <div>
            {
              imageURLState.r1?
              <img className="image" src={imageURLState.r1} ref={ref}/>
              :
              null
            }
          </div>
        </div>

        <div ref={inputBtnRef2} className="threeImage-upload-Btn" onClick={()=>{
          inputRef2.current.click()
        }}>
          <CiCirclePlus />
          <div>
            {
              imageURLState.r2?
              <img className="image" src={imageURLState.r2} ref={ref}/>
              :
              null
            }
          </div>
        </div>
        
        <div ref={inputBtnRef3} className="threeImage-upload-Btn" onClick={()=>{
          inputRef3.current.click()
        }}>
          <CiCirclePlus />
          <div>
            {
              imageURLState.r3?
              <img className="image" src={imageURLState.r3} ref={ref}/>
              :
              null
            }
          </div>
        </div>
      </div>


      
      </div>
    </>
  );
});
export default ThreeImage;
