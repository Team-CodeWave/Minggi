import { useState, useRef, forwardRef, useEffect } from "react";
import '../App.css';
import { CiCirclePlus } from "react-icons/ci";
const AboutMe = forwardRef( (props, ref)=>{
  const [dataState, setDataState] = useState({
    tt:"",
    r1:"", r2:"", r3:"", r4:"", r5:"", r6:"",
    t1:"", t2:"", t3:"", t4:"", t5:"", t6:"",
    c1:"", c2:"", c3:"", c4:"", c5:"", c6:"",
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
  let inputRef2 = useRef();
  let inputRef3 = useRef();
  let inputRef4 = useRef();
  let inputRef5 = useRef();
  let inputRef6 = useRef();
  let inputBtnRef1 = useRef();
  let inputBtnRef2 = useRef();
  let inputBtnRef3 = useRef();
  let inputBtnRef4 = useRef();
  let inputBtnRef5 = useRef();
  let inputBtnRef6 = useRef();

  let titleRef1 = useRef();
  let contentRef1 = useRef();
  let titleRef2 = useRef();
  let contentRef2 = useRef();
  let titleRef3 = useRef();
  let contentRef3 = useRef();
  let titleRef4 = useRef();
  let contentRef4 = useRef();
  let titleRef5 = useRef();
  let contentRef5 = useRef();
  let titleRef6 = useRef();
  let contentRef6 = useRef();
  
  return(
    <>
    <div className="wrapper">
      <button className="aboutme-save-btn" onClick={()=>{saveText()}}>저장</button>
      <div className="uploadImage-btn-container">
        <input ref={inputRef1} className="uploadImage-input" type="file"id="image_uploads"name="image_uploads"accept=".jpg, .jpeg, .png" onChange={(e)=>{uploadImage(e,"r1")}}/>
      </div>
      <div className="uploadImage-btn-container">
        <input ref={inputRef2} className="uploadImage-input" type="file"id="image_uploads"name="image_uploads"accept=".jpg, .jpeg, .png" onChange={(e)=>{uploadImage(e,"r2")}}/>
      </div>
      <div className="uploadImage-btn-container">
        <input ref={inputRef3} className="uploadImage-input" type="file"id="image_uploads"name="image_uploads"accept=".jpg, .jpeg, .png" onChange={(e)=>{uploadImage(e,"r3")}}/>
      </div>
      <div className="uploadImage-btn-container">
        <input ref={inputRef4} className="uploadImage-input" type="file"id="image_uploads"name="image_uploads"accept=".jpg, .jpeg, .png" onChange={(e)=>{uploadImage(e,"r3")}}/>
      </div>
      <div className="uploadImage-btn-container">
        <input ref={inputRef5} className="uploadImage-input" type="file"id="image_uploads"name="image_uploads"accept=".jpg, .jpeg, .png" onChange={(e)=>{uploadImage(e,"r3")}}/>
      </div>
      <div className="uploadImage-btn-container">
        <input ref={inputRef6} className="uploadImage-input" type="file"id="image_uploads"name="image_uploads"accept=".jpg, .jpeg, .png" onChange={(e)=>{uploadImage(e,"r3")}}/>
      </div>


      <div className="aboutme-container">
        <div className="aboutme-title">
        <textarea onChange={(e)=>{setDataState({...dataState, tt1:e.target.value});}} value={dataState.tt1} placeholder="제목" rows="1" className="aboutme-text-title" maxLength="25"></textarea>
        </div>
        <div className="aboutme-content-container">
          <div className="aboutme-content-item">
            <div ref={inputBtnRef1} className="aboutme-image-upload-Btn" onClick={()=>{
              inputRef1.current.click()
            }}>
              <CiCirclePlus />
              <div>
                {
                  dataState.r1?
                  <img className="image" src={dataState.r1} ref={ref}/>
                  :
                  null
                }
              </div>
            </div>
            <div className="aboutme-text-container">
              <textarea onChange={(e)=>{setDataState({...dataState, t1:e.target.value});}} value={dataState.t1} placeholder="제목" rows="1" className="aboutme-text-title" maxLength="15"></textarea>
              <textarea onInput={(e)=>{setDataState({...dataState, c1:e.target.value})}} value={dataState.c1} placeholder="내용" rows="1" className="aboutme-text" maxLength="30"></textarea>
            </div>
          </div>
          <div className="aboutme-content-item">
            <div ref={inputBtnRef2} className="aboutme-image-upload-Btn" onClick={()=>{
              inputRef2.current.click()
            }}>
              <CiCirclePlus />
              <div>
                {
                  dataState.r2?
                  <img className="image" src={dataState.r2} ref={ref}/>
                  :
                  null
                }
              </div>
            </div>
            <div className="aboutme-text-container">
              <textarea onInput={(e)=>{setDataState({...dataState, t2:e.target.value})}} value={dataState.t2} placeholder="제목" rows="1" className="aboutme-text-title" maxLength="15"></textarea>
              <textarea onInput={(e)=>{setDataState({...dataState, c2:e.target.value})}} value={dataState.c2} placeholder="내용" rows="1" className="aboutme-text" maxLength="30"></textarea>
            </div>
          </div>
          <div className="aboutme-content-item">
            <div ref={inputBtnRef3} className="aboutme-image-upload-Btn" onClick={()=>{
              inputRef3.current.click()
            }}>
              <CiCirclePlus />
              <div>
                {
                  dataState.r3?
                  <img className="image" src={dataState.r3} ref={ref}/>
                  :
                  null
                }
              </div>
            </div>
            <div className="aboutme-text-container">
              <textarea onInput={(e)=>{setDataState({...dataState, t3:e.target.value})}} value={dataState.t3} placeholder="제목" rows="1" className="aboutme-text-title" maxLength="15"></textarea>
              <textarea onInput={(e)=>{setDataState({...dataState, c3:e.target.value})}} value={dataState.c3} placeholder="내용" rows="1" className="aboutme-text" maxLength="30"></textarea>
            </div>
          </div>
          <div className="aboutme-content-item">
            <div ref={inputBtnRef4} className="aboutme-image-upload-Btn" onClick={()=>{
              inputRef4.current.click()
            }}>
              <CiCirclePlus />
              <div>
                {
                  dataState.r4?
                  <img className="image" src={dataState.r4} ref={ref}/>
                  :
                  null
                }
              </div>
            </div>
            <div className="aboutme-text-container">
              <textarea onInput={(e)=>{setDataState({...dataState, t4:e.target.value})}} value={dataState.t4} placeholder="제목" rows="1" className="aboutme-text-title" maxLength="15"></textarea>
              <textarea onInput={(e)=>{setDataState({...dataState, c4:e.target.value})}} value={dataState.c4} placeholder="내용" rows="1" className="aboutme-text" maxLength="30"></textarea>
            </div>
          </div>
          <div className="aboutme-content-item">
            <div ref={inputBtnRef5} className="aboutme-image-upload-Btn" onClick={()=>{
              inputRef5.current.click()
            }}>
              <CiCirclePlus />
              <div>
                {
                  dataState.r5?
                  <img className="image" src={dataState.r5} ref={ref}/>
                  :
                  null
                }
              </div>
            </div>
            <div className="aboutme-text-container">
              <textarea onInput={(e)=>{setDataState({...dataState, t5:e.target.value})}} value={dataState.t5} placeholder="제목" rows="1" className="aboutme-text-title" maxLength="15"></textarea>
              <textarea onInput={(e)=>{setDataState({...dataState, c5:e.target.value})}} value={dataState.c5} placeholder="내용" rows="1" className="aboutme-text" maxLength="30"></textarea>
            </div>
          </div>
          <div className="aboutme-content-item">
            <div ref={inputBtnRef6} className="aboutme-image-upload-Btn" onClick={()=>{
              inputRef6.current.click()
            }}>
              <CiCirclePlus />
              <div>
                {
                  dataState.r6?
                  <img className="image" src={dataState.r6} ref={ref}/>
                  :
                  null
                }
              </div>
            </div>
            <div className="aboutme-text-container">
              <textarea onInput={(e)=>{setDataState({...dataState, t6:e.target.value})}} value={dataState.t6} placeholder="제목" rows="1" className="aboutme-text-title" maxLength="15"></textarea>
              <textarea onInput={(e)=>{setDataState({...dataState, c6:e.target.value})}} value={dataState.c6} placeholder="내용" rows="1" className="aboutme-text" maxLength="30"></textarea>
            </div>
          </div>

        </div>
      </div>
      
      </div>
    </>
  );
});
export default AboutMe;
