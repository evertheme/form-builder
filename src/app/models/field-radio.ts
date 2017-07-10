import { DynamicField } from './field-dynamic';

/**
 * Class used for Raio Button fields
 */

export class RadioField extends DynamicField<{ value: string }> {
     /**
     * Field control type
     */
    controlType = 'radio';
    /**
     * Shown inline/alternate style as default or stacked
     * @type {boolean}
     */
    stacked: boolean;

    constructor(options: {} = {}) {
        super(options);

        this.options = options['options'] || [];
        this.stacked = options['stacked'] || false;
    }
}
