import React from "react";
import styled from "styled-components";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgray;
  width: 220px;
  border-radius: 2px;
`; // 全体を囲むdiv

const Title = styled.h3`
  padding: 8px;
`; // Todoなどのタイトルを表すh3

const TaskList = styled.ul`
  padding: 8px;
  list-style: none;
  min-height: 200px;
  //スタイルを追加 後：前
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? "skyblue" : "gray")};
  flex-grow: 1; // 追加
`; // Taskを囲むul

export default class Column extends React.Component {
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver} //snapshot
            >
              {this.props.tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    );
  }
}
