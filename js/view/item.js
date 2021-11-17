import kanbanAPI from "../api/kanbanAPI.js";

export default class Item {
  constructor(id, content) {
    this.elements = {};
    this.elements.root = Item.createRoote();
    this.elements.input = this.elements.root.querySelector(
      ".kanban__item-input"
    );

    this.elements.root.dataset.id = id;
    this.elements.input.textContent = content;
    this.content = content;

    const onBlur = () => {
      const newContent = this.elements.input.textContent.trim();
      console.log(this.content, newContent);
      if (newContent === this.content) return;
      this.content = newContent;
      kanbanAPI.updateItem(id, {
        content: this.content,
      });
    };
    //adding the update method
    this.elements.input.addEventListener("blur", onBlur);

    //adding the delete method
    this.elements.root.addEventListener("dblclick", () => {
      const check = confirm("Are you really want to delete this item");
      if (check) {
        kanbanAPI.deleteItem(id);
        this.elements.input.removeEventListener("blur", onBlur);
        this.elements.root.parentElement.removeChild(this.elements.root);
      }
    });
  }

  static createRoote() {
    const range = document.createRange();
    range.selectNode(document.body);
    return range.createContextualFragment(`
    <div class="kanban__item" draggable="true">
      <div class="kanban__item-input" contenteditable></div>
   </div>
    `).children[0];
  }
}
