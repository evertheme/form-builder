import { FieldBase } from './field-base';

/**
 * Class used for Blank field
 */

export class BlankField extends FieldBase<any> {
    /**
     * Field control type
     */
    controlType = 'blank';

    constructor(options: {} = {}) {
        super(options);
    }
}
