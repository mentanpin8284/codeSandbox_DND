import React from "react";
import initialData from "./components/initial-fata";
import Column from "./components/Column";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

class App extends React.Component {
  state = initialData; // stateを指定

  onDragEnd = (result) => {
    const { draggableId, source, destination } = result;

    // destination: ドロップ先 がない場合には処理を終了
    if (!destination) {
      return;
    }

    // ドロップ前後のIDが同じで、ドロップ前後のindexが同じ場合には処理を終了
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = this.state.columns[source.droppableId]; //開始の場所を取得column-?
    const finish = this.state.columns[destination.droppableId]; // 終了の場所を取得、移動先
    console.log(start);
    console.log(finish);

    if (start === finish) {
      // 開始と終わりのcolumn-??が同じ場合であれば実行
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1); // indexの値を参照し、1個削除
      newTaskIds.splice(destination.index, 0, draggableId); // indexの値を参照し、0個削除、1個追加

      // startをコピーし、taskIdsを上書き
      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };

      // stateをコピーし、columnを上書き
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      };

      // stateの更新
      this.setState(newState);
      console.log("DragEnd");
      return; // ここを通ったら処置を終わらせる
    }

    // 開始と終わりのcolumn-??が違う場合の処理
    const startTaskIds = Array.from(start.taskIds); //開始時のカラムからタスクidを取得
    startTaskIds.splice(source.index, 1); //doraggableに元々あった場所から一つ削除
    const newStart = {
      ...start, //開始時のカラムをコピー
      taskIds: startTaskIds // taskIdsの値をstartTaskIdsに置き換える
    };

    const finishTaskIds = Array.from(finish.taskIds); //終了時のカラムからタスクidを取得
    finishTaskIds.splice(destination.index, 0, draggableId); //drragebleなものを1つ追加
    const newFinish = {
      ...finish, // 終了時のカラムをコピー
      taskIds: finishTaskIds // taskIdsの値をfinishTaskIdsに置き換える
    };

    const newState = {
      ...this.state, //現在のstateをコピー
      columns: {
        ...this.state.columns, // columnsをコピー
        [newStart.id]: newStart, // start時のid: {id: start時のid, title: 'start時のtitle', taskIds: 'start時のids'}
        [newFinish.id]: newFinish // finish時のid: {id: finish時のid, title: 'finish時のtitle', taskIds: 'finish時のids'}
      }
    };

    this.setState(newState); // stateの更新→再度レンダリング
  };

  render() {
    return (
      <>
        <DragDropContext //3つのコールバックを取れる
          // onDragStart={} //開始時
          // onDragUpdate={} //途中
          onDragEnd={this.onDragEnd} //終了時 **絶対に必要**
        >
          <Container>
            {this.state.columnOrder.map((columnId) => {
              const column = this.state.columns[columnId];
              const tasks = column.taskIds.map(
                (taskId) => this.state.tasks[taskId]
              );
              // console.log(column) //initialDataのcolumns中身がcolumnが入っている
              // console.log(tasks) // initialDataのtasksIDを利用してtasksのcontentを持ってくる
              return <Column key={column.id} column={column} tasks={tasks} />;
            })}
          </Container>
        </DragDropContext>
      </>
    );
  }
}

export default App;
