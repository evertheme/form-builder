import { FieldBase } from './field-base';

/**
 * Class used for Textbox fields
 */

export class TextboxField extends FieldBase<string> {
     /**
     * Field control type
     */
    controlType = 'textbox';
    /**
    * Attribute used for the type of the checkbox
    * Input type such as number, text, email
    * Defaults to text if not passed
    */
    type: string;
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
        this.type = options['type'] || 'text';
        this.hasPlaceholderText = options['hasPlaceholderText'] || false;
        this.placeholderText = options['placeholderText'] || '';
    }
}
