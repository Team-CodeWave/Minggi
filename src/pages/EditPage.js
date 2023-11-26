import React, { useCallback, useState, useRef, useEffect } from "react";
import '../App.css';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { BiLeftArrow, BiCube, BiCommentDetail, BiImageAdd } from "react-icons/bi";
import { GoGraph } from "react-icons/go";
import { PiFlowArrowFill } from "react-icons/pi";

import ImageAdaptor from "../components/ImageAdaptor.js";
import ThreeImage from "../components/ThreeImage.js";
import AboutMe from "../components/AboutMe.js";
import Scroll from "../components/Scroll.js";
import Profile from "../components/Profile.js";

function EditPage() {
  // 영역 관리 state
  const [state, setState] = useState({[uuidv4()]: []})
  
  // 블록 별 {id, data}
  const [dataList, setDataList] = useState([]);

  // 렌더링 시 return할 블록 {id, content}
  const [blockList, setBlockList] = useState([]);
  

  // 블록 렌더링 함수 (content로 식별)
  let createBlock = (content, id)=>{
    let result ;
    switch (content) {
      case '이미지1':
        return <ImageAdaptor id={id} dataList={dataList} setDataList={setDataList}/>;
    
      case '이미지2':
        return <ThreeImage id={id} dataList={dataList} setDataList={setDataList}/>;

      case '도형1':
        return <AboutMe id={id} dataList={dataList} setDataList={setDataList}/>;
      
      case '도형2':
        return <Scroll id={id} dataList={dataList} setDataList={setDataList}/>;
      
        case '도형3':
        return <Profile id={id} dataList={dataList} setDataList={setDataList}/>;

      default:
        return <div>HELL</div>;
    }
  }
  // 순서정렬
  const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
  
      return result;
  };

  // 새로운 블록 생성 함수(복사하여 붙여넣기)
  const copy = (source, destination, droppableSource, droppableDestination) => {
      console.log('==> dest', destination);
  
      const sourceClone = Array.from(source);
      const destClone = Array.from(destination);
      const item = sourceClone[droppableSource.index];
      let newId = uuidv4();
      destClone.splice(droppableDestination.index, 0, { ...item, id: newId });
      blockList.push({id:newId, content:item.content});
      setBlockList(blockList);
      return destClone;
  };
  
  // 다른 영역으로 블록 옮기기
  const move = (source, destination, droppableSource, droppableDestination) => {
      const sourceClone = Array.from(source);
      const destClone = Array.from(destination);
      const [removed] = sourceClone.splice(droppableSource.index, 1);
  
      destClone.splice(droppableDestination.index, 0, removed);
      let temp = {...state}
      temp[droppableSource.droppableId] = sourceClone;
      temp[droppableDestination.droppableId] = destClone;
      setState(temp);
      // return result;
  };
  
  const Content = styled.div`
      margin-left: 280px;
  `;
  
  const Item = styled.div`
      display: flex;
      user-select: none;
      padding: 0.5rem;
      margin: 0 0 0.5rem 0;
      align-items: flex-start;
      align-content: flex-start;
      line-height: 1.5;
      border-radius: 3px;
      background: #fff;
      border: 1px ${props => (props.isdragging == 'true' ? 'dashed #4099ff' : 'solid #ddd')};
  `;
  
  const Clone = styled(Item)`
      + div {
          /* display:b; */
      }
  `;
  const Handle = styled.div`
      display: flex;
      align-items: center;
      align-content: center;
      user-select: none;
      margin: -0.5rem 0.5rem -0.5rem -0.5rem;
      padding: 0.5rem;
      line-height: 1.5;
      border-radius: 3px 0 0 3px;
      background: #fff;
      border-right: 1px solid #ddd;
      color: #000;
  `;
  
  const List = styled.div`
      border: 1px ${props => (props.isdraggingover == "true" ? 'dashed #000' : 'solid #ddd')};
      background: #fff;
      padding: 0.5rem 0.5rem 0;
      border-radius: 3px;
      flex: 0 0 150px;
      font-family: sans-serif;
  `;
  
  const Kiosk = styled(List)`
      position: absolute;
      top: 0;
      left: 80px;
      bottom: 0;
      width: 200px;
  `;
  
  const Container = styled(List)`
      margin: 0.5rem 0.5rem 1.5rem;
      min-width: 1100px;
      background: #ccc;
  `;
  
  const Notice = styled.div`
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: center;
      padding: 0.5rem;
      margin: 0 0.5rem 0.5rem;
      border: 1px solid transparent;
      line-height: 1.5;
      color: #aaa;
  `;
  
  const Button = styled.button`
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: center;
      margin: 0.5rem;
      padding: 0.5rem;
      color: #000;
      border: 1px solid #ddd;
      background: #fff;
      border-radius: 3px;
      font-size: 1rem;
      cursor: pointer;
  `;
  
  const ButtonText = styled.div`
      margin: 0 1rem;
  `;
  
  // 식별자 리스트
  const ITEMS = [
    {
        id: uuidv4(),
        content: '도형1',
    },
    {
        id: uuidv4(),
        content: '도형2',
    },
    {
        id: uuidv4(),
        content: '도형3',
    },
    {
        id: uuidv4(),
        content: '도형4',
    },
  ];
  const ITEMS2 = [
      {
          id: uuidv4(),
          content: '글상자1',
      },
      {
          id: uuidv4(),
          content: '글상자2',
      },
      {
          id: uuidv4(),
          content: '글상자3',
      },
      {
          id: uuidv4(),
          content: '글상자4',
      },
      {
          id: uuidv4(),
          content: '글상자5',
      },
  ];
  const ITEMS3 = [
      {
          id: uuidv4(),
          content: '이미지1',
      },
      {
          id: uuidv4(),
          content: '이미지2',
      },
      {
          id: uuidv4(),
          content: '이미지3',
      },
      {
          id: uuidv4(),
          content: '이미지4',
      },
      {
          id: uuidv4(),
          content: '이미지5',
      },
  ];
  const ITEMS4 = [
      {
          id: uuidv4(),
          content: '그래프1',
      },
      {
          id: uuidv4(),
          content: '그래프2',
      },
      {
          id: uuidv4(),
          content: '그래프3',
      },
      {
          id: uuidv4(),
          content: '그래프4',
      },
      {
          id: uuidv4(),
          content: '그래프5',
      },
  ];
  const ITEMS5 = [
      {
          id: uuidv4(),
          content: '연대기1',
      },
      {
          id: uuidv4(),
          content: '연대기2',
      },
      {
          id: uuidv4(),
          content: '연대기3',
      },
      {
          id: uuidv4(),
          content: '연대기4',
      },
      {
          id: uuidv4(),
          content: '연대기5',
      },
  ];


  // Drag끝날때
  let onDragEnd = result => {
    //Drop된 영역에 따른 처리
    const { source, destination } = result;

    console.log('==> result', result);

    if (!destination) {
      return;
    }

    
    switch (source.droppableId) {
      // 같은 영역 내 순서 정렬
      case destination.droppableId:
        setState({...state,
            [destination.droppableId]: reorder(
                state[source.droppableId],
                source.index,
                destination.index
            )
        });
        break;
      // 새로운 블록 생성
      case 'ITEMS':
        setState({...state,
            [destination.droppableId]: copy(
                kioItem,
                state[destination.droppableId],
                source,
                destination
            )
        });
        break;
      // 영역 옮기기
      default:
        move(
          state[source.droppableId],
          state[destination.droppableId],
          source,
          destination
        )
        break;
    }
  };

  // 새로운 영역 생성 함수
  let addList = e => {
      setState({ ...state, [uuidv4()]: [] });
  };
  const [page, setPage] = useState(-1);

  // 왼쪽 카테고리 클릭 이벤트 css 변화 함수
  let flip = (idx)=>{
    categoryBtnRef.current.map((item, index)=>{
      if(item.classList.contains("clicked")){
        if(index == idx){
          categoryBtnRef.current[idx].classList.remove("clicked")
          setPage(-1);
          return;
        }
        else item.classList.remove("clicked");
      }
      else if(index == idx){
        item.classList+= " clicked";
        setPage(idx);
        return;
      }
    })
  }
  
  
  let categoryBtnRef = useRef([]);
  // 현재 보여줄 아이템 리스트 state
  const [kioItem, setKioItem] = useState();
  // 카테고리 선택 시 아이템 리스트 변화
  useEffect(()=>{
    switch (page) {
      case 0:
        setKioItem(ITEMS);
        break;
      
      case 1:
        setKioItem(ITEMS2);
        break;
      
      case 2:
        setKioItem(ITEMS3);
        break;
      
      case 3:
        setKioItem(ITEMS4);
        break;

      case 4:
        setKioItem(ITEMS5);
        break;
    
      default:
        setKioItem();
        break;
    }
  },[page])

  const resRef = useRef([]);
  const [imageList, setImageList] = useState([]); //이미지 리소스 넣기

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='category-container'>
        {/* state로 map 뿌리도록 바꿀 예정? */}
        <div className="category-item-container">
          <div className='category-item' ref={(el)=>{categoryBtnRef.current[0]=el}} onClick={()=>{flip(0)}}>
            <div className='category-item-front'><BiCube/></div>
            <div className='category-item-back'><p>도형</p></div>
          </div>
        </div>
        <div className="category-item-container">
          <div className='category-item' ref={(el)=>{categoryBtnRef.current[1]=el}} onClick={()=>{flip(1)}}>
            <div className='category-item-front'><BiCommentDetail/></div>
            <div className='category-item-back'><p>글상자</p></div>
          </div>
        </div>
        <div className="category-item-container">
          <div className='category-item' ref={(el)=>{categoryBtnRef.current[2]=el}} onClick={()=>{flip(2)}}>
            <div className='category-item-front'><BiImageAdd/></div>
            <div className='category-item-back'><p>이미지</p></div>
          </div>
        </div>
        <div className="category-item-container">
          <div className='category-item' ref={(el)=>{categoryBtnRef.current[3]=el}} onClick={()=>{flip(3)}}>
            <div className='category-item-front'><GoGraph/></div>
            <div className='category-item-back'><p>그래프</p></div>
          </div>
        </div>
        <div className="category-item-container">
          <div className='category-item' ref={(el)=>{categoryBtnRef.current[4]=el}} onClick={()=>{flip(4)}}>
            <div className='category-item-front'><PiFlowArrowFill/></div>
            <div className='category-item-back'><p>연대기</p></div>
          </div>
        </div>
      </div>
      <Droppable droppableId="ITEMS" isDropDisabled={true}>
        {(provided, snapshot) => (
          <Kiosk
            {...provided.droppableProps}
            onDragStart={console.log(snapshot)}
            ref={provided.innerRef}
            isdraggingover={snapshot.isDraggingOver.toString()}>
            
            {kioItem ?
              kioItem.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id}
                  index={index}>
                  {(provided, snapshot) => (
                    <React.Fragment>
                      <Item
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        isdragging={snapshot.isDragging.toString()}
                        style={provided.draggableProps.style}>
                        {item.content}
                      </Item>
                      {snapshot.isDragging && (
                        <Clone>{item.content}</Clone>
                      )}
                    </React.Fragment>
                  )}
                </Draggable>
              ))
            :
            <div className="noneClicked">
              <BiLeftArrow/> <p>카테고리를 클릭해주세요</p>
            </div>
            }
            

          </Kiosk>
        )}
      </Droppable>
        <Content>
          <Button onClick={addList}>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
              />
            </svg>
            <ButtonText>구역 생성</ButtonText>
          </Button>
      {Object.keys(state).map((list, i) => {
        console.log('==> list', list);
        return (
          <Droppable key={list} droppableId={list}>
            {(provided, snapshot) => (
              <Container
                {...provided.droppableProps}
                ref={provided.innerRef}
                isdraggingover={snapshot.isDraggingOver.toString()}>
                {state[list].length
                  ? state[list].map(
                      (item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}>
                          {(provided,snapshot) => (
                            <Item
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              isdragging={snapshot.isDragging.toString()}
                              style={provided.draggableProps.style}>
                              <Handle
                                {...provided.dragHandleProps}>
                                <svg width="24"height="24"viewBox="0 0 24 24">
                                  <path fill="currentColor" d="M3,15H21V13H3V15M3,19H21V17H3V19M3,11H21V9H3V11M3,5V7H21V5H3Z"/>
                                </svg>
                              </Handle>

                              {
                                createBlock(item.content,item.id)
                              }

                            </Item>
                          )}
                        </Draggable>
                      )
                    )
                  : !provided.placeholder && (
                    <Notice>
                      Drop items here
                    </Notice>
                  )}
                {provided.placeholder}
              </Container>
            )}
          </Droppable>
        );
      })}
    </Content>
  </DragDropContext>
  );
}


export default EditPage;