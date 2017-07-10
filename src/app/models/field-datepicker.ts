import { FieldBase } from './field-base';

/**
 * Class used for Date Picker fields
 */

export class DatepickerField extends FieldBase<string> {
     /**
     * Field control type
     */
    controlType = 'datepicker';

    constructor(options: {} = {}) {
        super(options);
    }
}
