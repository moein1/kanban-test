export default class kanbanAPI {
  static getItem(columnId) {
    const column = getColumn(columnId);
    if (!column) return [];
    return column.items;
  }

  static insertItem(columnId, content) {
    const data = read();
    const column = data.find((column) => column.id == columnId);
    if (!column) throw Error("the column does not exist");
    const newData = {
      id: Math.floor(Math.random() * 1000000),
      content,
    };
    console.log("this is new Item ", newData);
    column.items.push(newData);
    save(data);
    return newData;
  }

  static updateItem(itemId, newProp) {
    const data = read();
    console.log("updaging the new vaue ", itemId, newProp);
    const [item, currentColumn] = getItemAndColumn(data, itemId);
    if (!item) throw new Error("Item not found");
    item.content =
      newProp.content === undefined ? item.content : newProp.content;
    //update column and postion
    if (newProp.columnId !== undefined && newProp.position !== undefined) {
      const targetColumn = data.find(
        (column) => column.id === newProp.columnId
      );
      if (!targetColumn) throw new Error("Target column not found!");
      //delete the item from the current location
      currentColumn.items.splice(currentColumn.items.indexOf(item), 1);

      //move the item to the target column and postion

      targetColumn.items.splice(newProp.position, 0, item);
      console.log("target column", targetColumn);
    }
    save(data);
  }

  static deleteItem(itemId) {
    const data = read();
    console.log("this is item id ", itemId);
    const [item, currentColumn] = getItemAndColumn(data, itemId);
    if (item) {
      currentColumn.items.splice(currentColumn.items.indexOf(item), 1);
      save(data);
    }
  }
}

function getItemAndColumn(data, itemId) {
  return (() => {
    for (const column of data) {
      const item = column.items.find((item) => item.id === itemId);
      console.log("this is item ", item);
      if (item) {
        return [item, column];
      }
    }
  })();
}

function read() {
  const json = localStorage.getItem("kanban-data");
  if (!json)
    return [
      { id: 1, items: [] },
      { id: 2, items: [] },
      { id: 3, items: [] },
    ];

  return JSON.parse(json);
}

function getColumn(columnId) {
  return read().find((column) => column.id == columnId) || [];
}

function save(data) {
  localStorage.setItem("kanban-data", JSON.stringify(data));
}
