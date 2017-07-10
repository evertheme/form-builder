import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldBase } from '../../models/field-base';

/**
 * Generate form field based on control type
 */
@Component({
    selector: 'df-field',
    templateUrl: './dynamic-form-field.component.html'
})
export class DynamicFormFieldComponent {
    /**
     * Local variable for toggling date picker popup
     * @type {{}}
     */
    displayDatePicker: any = {};
    /**
     * Currently modified field
     */
    @Input() field: FieldBase<any>;
    /**
     * Selected form
     */
    @Input() form: FormGroup;
    /**
     * Functions object used for making callbacks from within dynamic form field component
     */
    @Input() callbackFunc: any;
    /**
     * Flag to check whether form is submitted
     */
    @Input() submitted: boolean;
    /**
     * Show hidden fields for development and hide on usage
     */
    @Input() showHidden: boolean;
    /**
     * Check whether form is in valid status
     * @returns {boolean}
     */
    get isValid() { return this.form.controls[this.field.key].valid; }
    /**
     * Check whether field needs custom label
     * @param type
     * @param isHidden
     * @returns {boolean}
     */
    getIsLabel(type: any, isHidden?: boolean) {
        return type !== 'checkbox' && type !== 'header' && (!isHidden || this.showHidden);
    }

    isRequired() {
        if (this.field && this.field.formControls) {
            for (let control of this.field.formControls) {
                if (control.validator === 'required') {
                    return true;
                }
            }
        }

        return false;
    }
}
