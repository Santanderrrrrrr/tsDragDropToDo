/// <reference path="Component.ts"/>
/// <reference path="ProjectItem.ts"/>
/// <reference path="ProjectState.ts"/>

namespace App {
  //project list class
  export class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget
  {
    assignedProjects: Project[];

    constructor(private typicalOf: "active" | "finished") {
      super("project-list", "app", false, `${typicalOf}-projects`);

      this.assignedProjects = [];

      this.configure();
      this.renderContent();
    }

    private renderProjects() {
      const listEl = document.getElementById(
        `${this.typicalOf}-projects-list`
      )! as HTMLUListElement;
      listEl.innerHTML = "";
      for (const prjItem of this.assignedProjects) {
        new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
      }
    }

    @autoBind()
    dragOverHandler(event: DragEvent): void {
      if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
        event.preventDefault();
        const listEl = this.element.querySelector("ul")!;
        listEl.classList.add("droppable");
      }
    }

    @autoBind()
    dropHandler(event: DragEvent): void {
      const prjId = event.dataTransfer!.getData("text/plain");
      projectState.moveProject(
        prjId,
        this.typicalOf === "active"
          ? ProjectStatus.Active
          : ProjectStatus.Finished
      );
    }

    @autoBind()
    dragLeaveHandler(_: DragEvent): void {
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.remove("droppable");
    }

    configure() {
      this.element.addEventListener("dragover", this.dragOverHandler);
      this.element.addEventListener("dragleave", this.dragLeaveHandler);
      this.element.addEventListener("drop", this.dropHandler);

      projectState.addListener((projects: Project[]) => {
        const relevantProjects = projects.filter((prj) => {
          if (this.typicalOf === "active") {
            return prj.status === ProjectStatus.Active;
          }
          return prj.status === ProjectStatus.Finished;
        });
        this.assignedProjects = relevantProjects;
        this.renderProjects();
      });
    }

    renderContent() {
      const listId = `${this.typicalOf}-projects-list`;
      this.element.querySelector("ul")!.id = listId;
      this.element.querySelector("h2")!.textContent =
        this.typicalOf.toUpperCase() + "PROJECTS";
    }
  }
}
