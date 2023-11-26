import { useState, useRef, forwardRef, useEffect } from "react";
import '../App.css';
import { CiCirclePlus } from "react-icons/ci";
const Profile = forwardRef( (props, ref)=>{
  const [dataState, setDataState] = useState({
    r1:"",
    tt:"",
    t1:"",
  });
  // r1, r2, r3


  let uploadImage = (e, idx)=>{
    const file = e.target.files[0];
    const imageURL = URL.createObjectURL(file);
    
    let tempURL = {...dataState}
    tempURL[idx] = imageURL;
    setDataState(tempURL);

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
  let saveText = ()=>{
    // let val = e.target.value;
    let tempDataState = {...dataState};
    // tempDataState[idx] = val;

    let temp = [...props.dataList]
    temp.forEach((item)=>{
      if(item.id==props.id){
        item.data = tempDataState;
        props.setDataList(temp);
        return;
      }
    })
    
    temp.push({id:props.id, data:tempDataState});
    props.setDataList(temp);
  }
  useEffect(()=>{
    props.dataList.forEach((it)=>{if(it.id == props.id){
      setDataState(it.data);
    }});
  },[])

  let inputRef1 = useRef();
  let inputBtnRef1 = useRef();

  return(
    <>
    <div className="wrapper">
      <button className="profile-save-btn" onClick={()=>{saveText()}}>저장</button>
      <div className="uploadImage-btn-container">
        <input ref={inputRef1} className="uploadImage-input" type="file"id="image_uploads"name="image_uploads"accept=".jpg, .jpeg, .png" onChange={(e)=>{uploadImage(e,"r1")}}/>
      </div>


      <div className="profile-container">
        <div ref={inputBtnRef1} className="profile-image-upload-Btn" onClick={()=>{
            inputRef1.current.click()
          }}>
          <CiCirclePlus />
          <div>
            {
              dataState.r1?
              <img className="profile-image" src={dataState.r1} ref={ref}/>
              :
              null
            }
          </div>
        </div>
        <div className="profile-content-container">
          <textarea onChange={(e)=>{setDataState({...dataState, tt:e.target.value});}} value={dataState.tt} placeholder="제목" rows="1" className="profile-text-title" maxLength="25"></textarea>
          <textarea onChange={(e)=>{setDataState({...dataState, t1:e.target.value});}} value={dataState.t1} placeholder="내용" rows="1" className="profile-text-content" maxLength="50"></textarea>
        </div>
      </div>
      
      </div>
    </>
  );
});
export default Profile;
