const initialData = {
  tasks: {
    task1: { id: "task1", content: "1.Take out the garbage" },
    task2: { id: "task2", content: "2.Watch my favorite show" },
    task3: { id: "task3", content: "3.Charge my phone" },
    task4: { id: "task4", content: "4.Cook dinner" }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Todo",
      taskIds: ["task1", "task2", "task3", "task4"]
    }, //動的にデータを取ってこないといけない
    "column-2": {
      id: "column-2",
      title: "progress",
      taskIds: []
    },
    "column-3": {
      id: "column-3",
      title: "done",
      taskIds: []
    }
  },
  columnOrder: ["column-1", "column-2", "column-3"]
};

export default initialData;
