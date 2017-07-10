import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SnapLightboxService } from 'snap/src/snap/page-layout/light-box/snap-light-box.service';
import { BroadcastService } from 'snap/src/snap/feedback/spinner/broadcaster.service';

import { FormService } from '../../services/form.service';
import { FieldControlService } from '../../services/field-control.service';
import { FieldService } from '../../services/field.service';
import { AppConfig } from '../../app.config';

/**
 * Preview form
 */
@Component({
    selector: 'preview-form',
    templateUrl: './preview-form.component.html'
})
export class PreviewFormComponent implements OnInit {
    /**
     * Lightbox modal id
     */
    @Input() modalId: string;
    /**
     * Selected form's id
     */
    @Input() formId: any;
    /**
     * List of form fields
     * @type {Array}
     */
    fields: any[] = [];
    /**
     * Functions object used for making callbacks from within dynamic form field component
     */
    callbackFunc: any;
    /**
     * Combobox model for reseller field
     */
    resellerObj: any;
    /**
     * Selected form's title
     */
    formTitle: string;
    /**
     * Selected form object
     */
    existingForm: any;
    /**
     * Flag to check whether form is submitted
     */
    submitted: boolean;
    /**
     * Current step
     * @type {number}
     */
    currentStep: number;
    /**
     * Form group used for validation
     */
    form: FormGroup;
    /**
     * Flag to toggle submit button if wizard has custom steps
     * @type {boolean}
     */
    hasCustomStep: boolean = false;

    constructor(
        private appConfig: AppConfig,
        private broadcastService: BroadcastService,
        private cdr: ChangeDetectorRef,
        private route: ActivatedRoute,
        private formService: FormService,
        private fieldControlService: FieldControlService,
        private fieldService: FieldService,
        private snapLightboxService: SnapLightboxService
    ) {}

    /**
     * Initialize functions object for handling field callbacks and get form data by id
     */
    ngOnInit() {
        this.formId = this.formId || this.route.snapshot.params['id'];
        this.callbackFunc = {
            getResellerName: this.getResellerName,
            onSelectRegion: this.selectRegion,
            openLightbox: this.openLightbox,
            resellerNameControl: this.resellerNameControl,
            submit: this.submit
        };
        this.resellerObj = {};
        this.formService.appUrl = this.appConfig.appURL;

        this.formService.getDynamicFormById(this.formId)
            .then(
                data => {
                    this.existingForm = data;

                    if (this.existingForm.formType === 'wizard') {
                        this.currentStep = 1;
                    }

                    this.generateButtonCallbacks(data.formButtons);
                    this.generateCallbacks(data.formBody);
                },
                err => this.fields = []
            );
    }

    /**
     * Set field values with new ones
     * @param newField
     * @returns {any[]}
     */
    setField(newField) {
        let existingField;

        for (let field of this.fields) {
            if (field.key === newField.key) {
                existingField = field;
            }
        }

        if (existingField && existingField.key) {
            for (let prop in newField) {
                if (newField.hasOwnProperty(prop)) {
                    existingField[prop] = newField[prop];
                }
            }
        }

        return this.fields;
    }

    /**
     * Set reseller account with new values
     * @param reseller
     */
    setResellerAccount = (reseller) => {
        let newField = {
            key: 'reseller',
            model: reseller
        };

        this.fields = this.setField(newField);
        this.cdr.detectChanges();
    };

    /**
     * Get reseller name when searching through combobox
     * @param searchString
     * @returns {Promise<T>}
     */
    getResellerName = (searchString: any) => {
        return new Promise((resolve: any, reject: any) => {
            resolve([{
                childAcctNumber: '1018987',
                customerName: 'CDW LOGISTICS INC-1018987',
                customerNumber: '1045166'
            }, {
                childAcctNumber: '1045166',
                customerName: 'CDW LOGISTICS INC-1045166',
                customerNumber: '1045166'
            }, {
                childAcctNumber: '1160302',
                customerName: 'CDW LOGISTICS INC-1160302',
                customerNumber: '1045166'
            }, {
                childAcctNumber: '1261689',
                customerName: 'CDW LOGISTICS INC-1261689',
                customerNumber: '1045166'
            }, {
                childAcctNumber: '1262774',
                customerName: 'CDW LOGISTICS INC-1262774',
                customerNumber: '1045166'
            }]);
        });
    };

    /**
     * Handler when region is selected
     * @param selectedRegion
     */
    selectRegion = (selectedRegion) => {
        if (selectedRegion) {
            let canadaProvinces = [
                {key: '1', value: 'British Columbia'}, {key: '2', value: 'Ontario'},
                {key: '3', value: 'Quebec'}
            ];
            let usStates = [
                {key: '1', value: 'Arizona'}, {key: '2', value: 'Colorado'},
                {key: '3', value: 'Dallas'}
            ];

            let newField = {
                key: 'states',
                model: '1',
                options: selectedRegion === '103' ? usStates : canadaProvinces,
                hidden: false
            };

            this.fields = this.setField(newField);
        }
    };

    /**
     * Handler when lightbox is opened
     * @param data
     */
    openLightbox = (data) => {
        this.resellerObj = data || {};
        this.snapLightboxService.open('lookupResellerModal');
    };

    /**
     * Form control for reseller name field
     * @param c
     * @returns {any}
     */
    resellerNameControl = (c: FormControl): any => {
        if (c.value) {
            return this.hasReseller(c.value) ? null : { pattern: { valid: false } };
        } else {
            return { required: { valid: false } };
        }
    };

    /**
     * Set form status to submitted state and call onSubmit callback if form is valid
     */
    submit = () => {
        this.submitted = true;

        this.broadcastService.broadcast('FORM_BUILDER::FORM_SUBMITTED', true);

        if (this.form.valid) {
            this.snapLightboxService.close(this.modalId);
        }
    };

    /**
     * Check reseller selection if it has correct data
     * @param data
     * @returns {string|string|string|string|string|string|any|any|any|any}
     */
    private hasReseller = (data) => {
        return data.childAcctNumber && data.customerName && data.customerNumber;
    };

    /**
     * Build fields using field service
     * @param data
     */
    private buildFields(data) {
        this.fields = this.fieldService.buildFields(data);
        this.form = this.fieldControlService.toFormGroup(this.fields, this.callbackFunc);
    }

    /**
     * Generate functions object for handling button callbacks
     * @param data
     */
    private generateButtonCallbacks(data) {
        this.fieldControlService.generateButtonCallbacks(data, this.callbackFunc, this.modalId);
    }

    /**
     * Generate functions object for handling field callbacks
     * @param data
     */
    private generateCallbacks(data) {
        this.fieldControlService.generateCallbacks(data, this.callbackFunc);
        this.buildFields(data);
    }

    /**
     * returns the button class for each type
     */
    getButtonClass(type) {
            switch (type) {
                case 'Primary': return 'primary-button';
                case 'Secondary': return 'secondary-button';
                case 'Cancel': return 'cancel-button';
                case 'Tertiary': return 'tertiary-button';
                default: return '';
            }
    }

    fieldFocus(form, name) {
        let match = this.fields.filter((field) => {
            return field.key === name;
        });

        if (match && match[0]) {
            this.currentStep = match[0].step;
        }
    }
}
