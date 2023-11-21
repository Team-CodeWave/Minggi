import { useState, useRef, forwardRef, useEffect } from "react";
import '../App.css';
import { CiCirclePlus } from "react-icons/ci";
const ImageAdaptor = forwardRef( (props, ref)=>{
  const [imageURLState, setImageURLState] = useState();

  let imageRef = useRef();

  let uploadImage = (e)=>{
    const file = e.target.files[0];
    const imageURL = URL.createObjectURL(file);
    setImageURLState(imageURL);
    let temp = [...props.dataList]
    temp.forEach((item)=>{
      if(item.id==props.id){
        item.data = imageURL;
        props.setDataList(temp);
        return;
      }
    })
    temp.push({id:props.id, data:imageURL});
    props.setDataList(temp);
  }
  useEffect(()=>{
    props.dataList.forEach((it)=>{if(it.id == props.id){
      setImageURLState(it.data);
    }});
  })
  let inputRef = useRef();
  let inputBtnRef = useRef();
  return(
    <>
    <div className="wrapper">
      <div className="uploadImage-btn-container">
        {/* <label htmlFor="image_uploads">버튼</label> */}
        <input ref={inputRef} className="uploadImage-input" type="file"
        id="image_uploads"
        name="image_uploads"
        accept=".jpg, .jpeg, .png" onChange={(e)=>{uploadImage(e)}}/>
      </div>
      <div ref={inputBtnRef} className="image-upload-Btn" onClick={()=>{
        inputRef.current.click()
      }}>
        <CiCirclePlus />
        <div>
          {
            imageURLState?
            <img className="image" src={imageURLState} ref={ref}/>
            :
            null
          }
        </div>
      </div>
      
      </div>
    </>
  );
});
export default ImageAdaptor;
