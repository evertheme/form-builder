import { FieldBase } from './field-base';

/**
 * Class used for Textarea fields
 */

export class TextareaField extends FieldBase<string> {
     /**
     * Field control type
     */
    controlType = 'textarea';
    /**
    * Number of rows for the Textarea
    * Defaults to 10 if not passed
    */
    numRows: number;
    /**
     * Attribute used for the placeholder flag
     */
    hasPlaceholderText: boolean;
     /**
     * Attribute used for the placeholder
     */
    placeholderText: string;

    constructor(options: {} = {}) {
        super(options);
        this.numRows = options['numRows'] || 2;
        this.hasPlaceholderText = options['hasPlaceholderText'] || false;
        this.placeholderText = options['placeholderText'] || '';
    }
}
