namespace App{
    
    export function validate(validatableInput: Validatable) {
      let isValid = true;
      if (validatableInput.required) {
        isValid =
          isValid && validatableInput.value.toString().trim().length !== 0;
      }
      if (
        validatableInput.minLength !== undefined &&
        typeof validatableInput.value === "string"
      ) {
        isValid =
          isValid &&
          validatableInput.value.length >= validatableInput.minLength;
      }
      if (
        validatableInput.maxLength !== undefined &&
        typeof validatableInput.value === "string"
      ) {
        isValid =
          isValid &&
          validatableInput.value.length <= validatableInput.maxLength;
      }
      if (
        validatableInput.max !== undefined &&
        typeof validatableInput.value === "number"
      ) {
        isValid = isValid && validatableInput.value <= validatableInput.max;
      }
      if (
        validatableInput.min !== undefined &&
        typeof validatableInput.value === "number"
      ) {
        isValid = isValid && validatableInput.value >= validatableInput.min;
      }
      return isValid;
    }
}