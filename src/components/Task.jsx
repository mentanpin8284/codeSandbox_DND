import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const List = styled.li`
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
  list-style: none;
  // 条件分岐でスタイルを表示させる 後：前
  background-color: ${(props) =>
    props.isDragging ? "lightgreen" : "lightgray"};
`;

export default class Task extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <List
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging} //snapshot
          >
            {this.props.task.content}
          </List>
        )}
      </Draggable>
    );
  }
}
