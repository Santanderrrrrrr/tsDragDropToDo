///<reference path="Decorators.ts" />
//<reference path="ProjectState.ts" />

namespace App {
  //ProjectInput Class
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;
    constructor() {
      super("project-input", "app", true, "user-input");

      this.titleInputElement = this.element.querySelector(
        "#title"
      ) as HTMLInputElement;
      this.descriptionInputElement = this.element.querySelector(
        "#description"
      ) as HTMLInputElement;
      this.peopleInputElement = this.element.querySelector(
        "#people"
      ) as HTMLInputElement;

      this.configure();
    }

    //   private isNotEmpty(...args: string[]): boolean {
    //     return args.every((arg: string) => arg.trim().length > 0);
    //   }
    configure() {
      this.element.addEventListener("submit", this.submitHandler.bind(this));
    }

      renderContent() {
        
    }

    private gatherUserInput(): [string, string, number] | void {
      const enteredTitle = this.titleInputElement.value;
      const enteredDescription = this.descriptionInputElement.value;
      const enteredPeople = this.peopleInputElement.value;

      const titleValdatable: Validatable = {
        value: enteredTitle,
        required: true,
      };
      const descriptionValdatable: Validatable = {
        value: enteredDescription,
        required: true,
        minLength: 5,
      };
      const peopleValdatable: Validatable = {
        value: +enteredPeople,
        required: true,
        min: 1,
        max: 5,
      };

      const validatableEntries = [
        titleValdatable,
        descriptionValdatable,
        peopleValdatable,
      ];

      if (validatableEntries.every((ve) => validate(ve))) {
        return [enteredTitle, enteredDescription, +enteredPeople];
      } else {
        alert(" Invalid Input, please try again.");
      }

      // if (!this.isNotEmpty(enteredTitle, enteredDescription, enteredPeople)) {
      //   alert("Invalid Input, please try again");
      // } else {
      //   return [enteredTitle, enteredDescription, +enteredPeople];
      // }
    }

    private clearInputs() {
      this.titleInputElement.value = "";
      this.descriptionInputElement.value = "";
      this.peopleInputElement.value = "";
    }

    @autoBind()
    private submitHandler(event: Event) {
      event.preventDefault();
      const userInput = this.gatherUserInput();

      if (Array.isArray(userInput)) {
        const [title, description, people] = userInput;
        projectState.addProject(title, description, people);
      }

      this.clearInputs();
    }
  }
}