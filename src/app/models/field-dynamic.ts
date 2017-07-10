import { FieldBase } from './field-base';

/**
 * Class used for all fields with Dynamic Source 
 * Currently DropDown, Checkbox and Radio extend
 * from this class
 * Extends base FieldBase class
 */

export class DynamicField<T> extends FieldBase<T> {
     /**
     * Field options , typed
     */
    options: T[] = [];

    constructor(options: {} = {}) {
        super(options);
        this['options'] = options['options'] || [];
        this['controlType'] = options['controlType'] || '';
    }
}
