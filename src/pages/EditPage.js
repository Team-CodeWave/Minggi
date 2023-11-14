import React, { useCallback, useState, useRef, useEffect } from "react";
import '../App.css';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { BiLeftArrow, BiCube, BiCommentDetail, BiImageAdd } from "react-icons/bi";
// import console = require('console');



function EditPage() {
  const [state, setState] = useState({[uuidv4()]: []})
  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
  
      return result;
  };
  /**
   * Moves an item from one list to another list.
   */
  const copy = (source, destination, droppableSource, droppableDestination) => {
      console.log('==> dest', destination);
  
      const sourceClone = Array.from(source);
      const destClone = Array.from(destination);
      const item = sourceClone[droppableSource.index];
  
      destClone.splice(droppableDestination.index, 0, { ...item, id: uuidv4() });
      return destClone;
  };
  
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
  
  const ITEMS = [
    {
        id: uuidv4(),
        content: '도형1',
        block : <div>도형1!!</div>
    },
    {
        id: uuidv4(),
        content: '도형2',
        block : <div>도형2!!</div>
    },
    {
        id: uuidv4(),
        content: '도형3',
        block : <div>도형3!!</div>
    },
    {
        id: uuidv4(),
        content: '도형4',
        block : <div>도형4!!</div>
    },
  ];
  const ITEMS2 = [
      {
          id: uuidv4(),
          content: '글상자1',
          block : <div>글상자1!!</div>
      },
      {
          id: uuidv4(),
          content: '글상자2',
          block : <div>글상자2!!</div>
      },
      {
          id: uuidv4(),
          content: '글상자3',
          block : <div>글상자3!!</div>
      },
      {
          id: uuidv4(),
          content: '글상자4',
          block : <div>글상자4!!</div>
      },
      {
          id: uuidv4(),
          content: '글상자5',
          block : <div>글상자5!!</div>
      },
  ];
  const ITEMS3 = [
      {
          id: uuidv4(),
          content: '이미지1',
          block : <div>이미지1!!</div>
      },
      {
          id: uuidv4(),
          content: '이미지2',
          block : <div>이미지2!!</div>
      },
      {
          id: uuidv4(),
          content: '이미지3',
          block : <div>이미지3!!</div>
      },
      {
          id: uuidv4(),
          content: '이미지4',
          block : <div>이미지4!!</div>
      },
      {
          id: uuidv4(),
          content: '이미지5',
          block : <div>이미지5!!</div>
      },
  ];


  let onDragEnd = result => {
    const { source, destination } = result;

    console.log('==> result', result);

    if (!destination) {
      return;
    }

    switch (source.droppableId) {
      case destination.droppableId:
        setState({...state,
            [destination.droppableId]: reorder(
                state[source.droppableId],
                source.index,
                destination.index
            )
        });
        break;
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

  let addList = e => {
      setState({ ...state, [uuidv4()]: [] });
  };
  const [page, setPage] = useState(-1);

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
  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  let categoryBtnRef = useRef([]);
  const [kioItem, setKioItem] = useState();
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
    
      default:
        setKioItem();
        break;
    }
  },[page])
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='category-container'>
        {/* state로 map 뿌리도록 바꿀 예정? */}
        <div className='category-item' ref={(el)=>{categoryBtnRef.current[0]=el}} onClick={()=>{flip(0)}}>
          <div className='category-item-front'><BiCube/></div>
          <div className='category-item-back'><p>도형</p></div>
        </div>
        <div className='category-item' ref={(el)=>{categoryBtnRef.current[1]=el}} onClick={()=>{flip(1)}}>
          <div className='category-item-front'><BiCommentDetail/></div>
          <div className='category-item-back'><p>글상자</p></div>
        </div>
        <div className='category-item' ref={(el)=>{categoryBtnRef.current[2]=el}} onClick={()=>{flip(2)}}>
          <div className='category-item-front'><BiImageAdd/></div>
          <div className='category-item-back'><p>이미지</p></div>
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
            <ButtonText>Add List</ButtonText>
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

                              {item.block}

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