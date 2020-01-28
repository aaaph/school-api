import { BadRequest } from "http-errors";
import { ValidationError } from "class-validator";
interface IValidationErrorBody {
  property: string;
  constraints: { [type: string]: string };
}

class ValidationBadRequest extends BadRequest {
  validationArr: IValidationErrorBody[];
  message: string;
  constructor(errors: ValidationError[]) {
    super();
    this.validationArr = errors.map(error => {
      const { property, constraints } = error;
      return { property, constraints };
    });
    this.message = JSON.stringify(this.validationArr);
  }
}
export { ValidationBadRequest };
