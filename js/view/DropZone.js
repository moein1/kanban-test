export default class DropZone {
  static createDropZone() {
    const range = document.createRange();
    range.selectNode(document.body);
    const dropZone = range.createContextualFragment(`
    <div class="kanban__dropzone"></div>
    `).children[0];

    //add the class for drag over
    dropZone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZone.classList.add("kanban__dropzone--active");
    });
    /**remove the class for the active after leavig */
    dropZone.addEventListener("dragleave", (e) => {
      e.preventDefault();
      dropZone.classList.remove("kanban__dropzone--active");
    });
    return dropZone;
  }
}
