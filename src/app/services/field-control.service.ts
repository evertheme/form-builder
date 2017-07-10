import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnapLightboxService } from 'snap/src/snap/page-layout/light-box/snap-light-box.service';

import { FieldBase, KeyValue } from '../models/field-base';
import { DynamicField } from '../models/field-dynamic';
import { FieldService } from './field.service';

/**
 * Service used for Field Controls
 */

@Injectable()
export class FieldControlService {

    /**
    * Array used to store response from the service call
     */
    sourceResponseData: any[];

    constructor(
        private fieldService: FieldService,
        private snapLightboxService: SnapLightboxService
    ) {}

      /**
     * Method used to generate Form Group
     * based on the field definitions
     * @param fields
     * @param callbackFunc
     * @returns new {FormGroup}
    */
    toFormGroup(fields: FieldBase<any>[], callbackFunc: any) {
        let group: any = {};

        fields.forEach((field) => {
            if (field.source) {
                let dropdown: DynamicField<KeyValue> = <DynamicField<KeyValue>>field;
                let targetElem: any ;
                let options: any[];

                this.fieldService.getDynamicOptions(dropdown)
                    .subscribe(
                        (data) => {
                            this.sourceResponseData = data;

                            options = this.sourceResponseData.map((elem) => {
                                if (dropdown.source.arrayRef) {
                                    targetElem = elem[dropdown.source.arrayRef];
                                } else {
                                    targetElem = elem;
                                }

                                return {
                                    key: targetElem[dropdown.source.valueField],
                                    value: targetElem[dropdown.source.textField]
                                };
                            });

                            dropdown.options = options;
                        }
                    );
            }

            if (field.formControls) {
                group[field.key] = this.setFormControls(field.value,  field.formControls, callbackFunc);
            } else {
                group[field.key] = new FormControl(field.value || '');
            }
        });

        return new FormGroup(group);
    }

    /**
     * Method used to set field validators
     * @param value
     * @param controls
     * @param callbackFunc
     * @returns new {FormControl}
    */
    setFormControls(value, controls, callbackFunc) {
        let formControls = [];

        for (let i = 0; i < controls.length; i++) {
            switch (controls[i].validator) {
                case 'required':
                    formControls.push(Validators.required);
                    break;
                case 'minLength':
                    formControls.push(Validators.minLength(controls[i].value));
                    break;
                case 'maxLength':
                    formControls.push(Validators.maxLength(controls[i].value));
                    break;
                case 'pattern':
                    formControls.push(Validators.pattern(controls[i].value));
                    break;
                case 'custom':
                    formControls.push(callbackFunc[controls[i].value]);
                    break;
            }
        }

        return new FormControl(value || '', formControls);
    }

    /**
     * Method used to generate default callbacks for handling button click
     * @param buttons
     * @param callbackObject
     * @param id
     * @returns void
    */
    generateButtonCallbacks = (buttons, callbackObject, id?) => {
        for (let button of buttons) {
            if (button.callbackFunc && !callbackObject[button.callbackFunc]) {
                callbackObject[button.callbackFunc] = () => {
                    if (id) {
                        this.snapLightboxService.close(id);
                    }
                };
            }
        }
    };

    /**
     * Method used to generate default callbacks
     * @param fields
     * @param callbackObject
     * @returns void
    */
    generateCallbacks = (fields, callbackObject) => {
        for (let field of fields) {
            if (field.onModelChange && !callbackObject[field.onModelChange]) {
                callbackObject[field.onModelChange] = () => {};
            }

            if (field.lookupFunction && !callbackObject[field.lookupFunction]) {
                callbackObject[field.lookupFunction] = () => {
                    return Promise.resolve([]);
                };
            }

            if (field.openLookupModal && !callbackObject[field.openLookupModal]) {
                callbackObject[field.openLookupModal] = () => {};
            }

            if (field.formControls) {
                for (let control of field.formControls) {
                    if (control.validator === 'custom' && !callbackObject[control.value]) {
                        callbackObject[control.value] = () => {};
                    }
                }
            }
        }
    };
}
