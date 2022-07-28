import { PageEvent } from "@angular/material/paginator";
import { FormValue } from "../filter-form/form-value";

export class BeersState {
  static pageEvent: PageEvent;
  static formValue: FormValue;
  static filterOpened: boolean;
}
