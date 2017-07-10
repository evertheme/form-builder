import { FieldBase } from './field-base';

/**
 * Class used for Textbox fields
 */

export class HeaderField extends FieldBase<string> {
    /**
     * Field control type
     */
    controlType = 'header';
    /**
     * Span across columns in case of multiple column layout
     */
    colSpan: string;
    /**
     * Attribute used for the type of the checkbox
     * Input type such as number, text, email
     * Defaults to text if not passed
     */
    type: string;


    constructor(options: {} = {}) {
        super(options);

        this.colSpan = options['colSpan'] || 'one';
    }
}
