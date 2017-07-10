import { TextboxField }    from './field-textbox';
import { CheckboxField, CheckboxesField }   from './field-checkbox';
import { RadioField }      from './field-radio';
import { DropdownField }   from './field-dropdown';
import { ComboboxField }     from './field-combobox';
import { DatepickerField }     from './field-datepicker';
import { DynamicField }     from './field-dynamic';
import { TextareaField }    from './field-textarea';
import { HeaderField }    from './field-header';
import { FileUploadField }    from './field-fileupload';
import { BlankField } from './field-blank';

export * from './button';
export * from './field-base';
export * from './field-blank';
export * from './field-checkbox';
export * from './field-combobox';
export * from './field-datepicker';
export * from './field-dropdown';
export * from './field-dynamic';
export * from './field-fileupload';
export * from './field-header';
export * from './field-radio';
export * from './field-textarea';
export * from './field-textbox';
export * from './step';

/**
 * Constant storing all possible field Models *
 */

export const FIELD_MODELS = {
    blank: BlankField,
    checkbox: CheckboxField,
    checkboxes: CheckboxesField,
    combobox: ComboboxField,
    datepicker: DatepickerField,
    dropdown: DropdownField,
    dynamic: DynamicField,
    fileupload: FileUploadField,
    header: HeaderField,
    radio: RadioField,
    textarea: TextareaField,
    textbox: TextboxField
};
