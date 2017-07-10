import { DynamicField } from './field-dynamic';

/**
 * Class used for Checkbox fields
 */

export class CheckboxField extends DynamicField<boolean> {
     /**
     * Field control type
     */
    controlType = 'checkbox';

    constructor(options: {} = {}) {
        super(options);
        this['options'] = options['options'] || [];
    }
}

export class CheckboxesField extends DynamicField<boolean> {
    /**
     * Field control type
     */
    controlType = 'checkboxes';

    constructor(options: {} = {}) {
        super(options);
        this['options'] = options['options'] || [];
    }
}
