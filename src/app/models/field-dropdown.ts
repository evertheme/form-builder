import { DynamicField } from './field-dynamic';
import { KeyValue } from './field-base';

/**
 * Class used for Dropdown fields
 * Extends Dynamic Field
 */

export class DropdownField extends DynamicField<KeyValue> {
     /**
     * Field control type
     */
    controlType = 'dropdown';

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
    }
}
