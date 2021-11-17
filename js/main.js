import kanbanAPI from "./api/kanbanAPI.js";
import kanban from "./view/kanban.js";

//console.log(kanbanAPI.updateItem(301446, " new value"));

//console.log(kanbanAPI.insertItem(3, "test newr"));

//console.log(kanbanAPI.deleteItem(647687));

new kanban(document.querySelector(".kanban"));
