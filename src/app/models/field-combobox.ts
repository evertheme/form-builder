import { FieldBase } from './field-base';

/**
 * Class used for ComboBox fields
 * Additional parameters passed lookupFunction
 * and function for openLookupModal
 */

export class ComboboxField extends FieldBase<string> {
     /**
     * Field control type
     */
    controlType = 'combobox';
    /**
    * Function to be called for lookups
     */
    lookupFunction: string;
    /**
     * Function to be called for open lookup modal
    */
    openLookupModal: string;
    resultFields: any[];

    constructor(options: {} = {}) {
        super(options);
        this.lookupFunction = options['lookupFunction'] || '';
        this.openLookupModal = options['openLookupModal'] || '';
        this.resultFields = options['resultFields'] || [];
    }
}
