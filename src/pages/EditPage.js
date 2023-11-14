
// import '../App.css';
// import { Routes, Route, Link, useNavigate } from 'react-router-dom'
// import React, { useCallback, useState, useRef } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// function EditPage() {
//   let navigate = useNavigate();
//   let onDragEnd = useCallback(()=>{})
//   let drop1 = useRef();
//   let drag1 = useRef();
//   return (
//     <div className="main-page-container">
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Droppable droppableId="droppable-1">
//           {(provided, snapshot) => {
//             <div className='droppable' ref={provided.innerRef}
//             style={{backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey'}}>
//               <Draggable draggableId='draggable-1' index={1}>
//                 {(provided, snapshot)=>{
//                   const style = {
//                     ...provided.draggableStyle,
//                     backgroundColor: snapshot.isDragging ? 'blue' : 'white',
//                     fontSize: 18,
//                   }
//                   return(
//                     <div>
//                       <div className='edit-btn' ref={provided.innerRef} style={provided.draggableStyle}>
//                         Drag!
//                       </div>
//                     </div>
//                   )
//                 }}
//               </Draggable>
//             </div>
//           }}
//         </Droppable>
//       </DragDropContext>
//     </div>
//   );
// }

// export default EditPage;






// import React, { useEffect, useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// const reorder = (list, startIndex, endIndex) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);

//   return result;
// };

// const App = () => {
//   const items = [
//     { title: "타이틀 1", index: 1 },
//     { title: "타이틀 2", index: 2 },
//     { title: "타이틀 3", index: 3 },
//     { title: "타이틀 4", index: 4 },
//     { title: "타이틀 5", index: 5 },
//   ];
//   const [pageList, setPageList] = useState([]);

//   useEffect(() => {
//     setPageList(items);
//   }, []);

//   const onDragEnd = (result) => {
//     console.log(result);
//     if (!result.destination) {
//       return;
//     }
//     setPageList((items) =>
//       reorder(items, result.source.index, result.destination.index)
//     );
//   };

//   return (
//     <>
//       {pageList && (
//         <DragDropContext onDragEnd={onDragEnd}>
//           <Droppable droppableId="droppable">
//             {(provided) => (
//               <div {...provided.droppableProps} ref={provided.innerRef}>
//                 {pageList.map((item, index) => (
//                   <Draggable
//                     key={`item${item.index}`}
//                     draggableId={`item-${item.index}`}
//                     index={index}
//                   >
//                     {(provided) => (
//                       <div
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                       >
//                         <label>index: {index}</label>
//                         <br />
//                         <label>item.index: {item.index}</label>
//                         <br />
//                         <label>title: {item.title}</label>
//                         <input disabled type="text" ></input>
//                       </div>
//                     )}
//                   </Draggable>
//                 ))}

//                 {provided.placeholder}
                
//                 <div/>
//               </div>
//             )}
//           </Droppable>
//         </DragDropContext>
//       )}
//     </>
//   );
// };

// export default App;



import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import React, { useCallback, useState, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { BiCube, BiCommentDetail, BiImageAdd } from "react-icons/bi";
// import console = require('console');

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

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
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
        content: '글상자',
        block : <div>1!!</div>
    },
    {
        id: uuidv4(),
        content: '이미지',
        block : <div>2!!</div>
    },
    {
        id: uuidv4(),
        content: '그래프',
        block : <div>3!!</div>
    },
    {
        id: uuidv4(),
        content: '경험',
        block : <div>4!!</div>
    },
    {
        id: uuidv4(),
        content: '기술',
        block : <div>5!!</div>
    },
];
const ITEMS2 = [
  {
      id: uuidv4(),
      content: '도형1',
      block : <div>1!!</div>
  },
  {
      id: uuidv4(),
      content: '도형2',
      block : <div>2!!</div>
  },
  {
      id: uuidv4(),
      content: '도형3',
      block : <div>3!!</div>
  },
  {
      id: uuidv4(),
      content: '도형4',
      block : <div>4!!</div>
  },
];


function EditPage() {
    let state = {
        [uuidv4()]: []
    };
    let onDragEnd = result => {
        const { source, destination } = result;

        console.log('==> result', result);

        // dropped outside the list
        if (!destination) {
            return;
        }

        switch (source.droppableId) {
            case destination.droppableId:
                this.setState({
                    [destination.droppableId]: reorder(
                        this.state[source.droppableId],
                        source.index,
                        destination.index
                    )
                });
                break;
            case 'ITEMS':
                this.setState({
                    [destination.droppableId]: copy(
                        ITEMS,
                        this.state[destination.droppableId],
                        source,
                        destination
                    )
                });
                break;
            default:
                this.setState(
                    move(
                      this.state[source.droppableId],
                      this.state[destination.droppableId],
                      source,
                      destination
                    )
                );
                break;
        }
    };

    let addList = e => {
        this.setState({ [uuidv4()]: [] });
    };
    let flip = (e)=>{
    }
    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    
    return (
        <DragDropContext onDragEnd={this.onDragEnd}>
            <div className='category-container' onClick={()=>{flip()}}>
              <div className='category-item'>
                <div className='category-item-front'><BiCube/></div>
                <div className='category-item-back'>도형</div>
              </div>
              <div className='category-item'>
                <div className='category-item-front'><BiCommentDetail/></div>
                <div className='category-item-back'>글상자</div>
              </div>
              <div className='category-item'>
                <div className='category-item-front'><BiImageAdd/></div>
                <div className='category-item-back'>이미지</div>
              </div>
            </div>
            <Droppable droppableId="ITEMS" isDropDisabled={true}>
                {(provided, snapshot) => (
                    <Kiosk
                        {...provided.droppableProps}
                        onDragStart={console.log(snapshot)}
                        ref={provided.innerRef}
                        isdraggingover={snapshot.isDraggingOver.toString()}>
                        {ITEMS.map((item, index) => (
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
                        ))}
                    </Kiosk>
                )}
            </Droppable>
            <Content>
                <Button onClick={this.addList}>
                    <svg width="24" height="24" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                        />
                    </svg>
                    <ButtonText>Add List</ButtonText>
                </Button>
                {Object.keys(this.state).map((list, i) => {
                    console.log('==> list', list);
                    return (
                        <Droppable key={list} droppableId={list}>
                            {(provided, snapshot) => (
                                <Container
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    isdraggingover={snapshot.isDraggingOver.toString()}>
                                    {this.state[list].length
                                        ? this.state[list].map(
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
                                                                  <svg
                                                                      width="24"
                                                                      height="24"
                                                                      viewBox="0 0 24 24">
                                                                      <path
                                                                          fill="currentColor"
                                                                          d="M3,15H21V13H3V15M3,19H21V17H3V19M3,11H21V9H3V11M3,5V7H21V5H3Z"
                                                                      />
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