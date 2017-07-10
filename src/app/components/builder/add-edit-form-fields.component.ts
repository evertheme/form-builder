import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormErrorsService } from 'snap/src/snap/forms/form-errors/form-errors.service';
import { BroadcastService } from 'snap/src/snap/feedback/spinner/broadcaster.service';

/**
 * Small panel for adding new field/editing existing ones of selected form
 */
@Component({
    selector: 'add-edit-form-fields',
    templateUrl: './add-edit-form-fields.component.html'
})
export class AddEditFormFieldsComponent implements OnInit, OnDestroy {
    /**
     * Form group that manage form controls for validation
     */
    addEditFormField: FormGroup;
    /**
     * Flag for show/hide certain field properties/attributes based on control type
     */
    selectedControlType: string;
    /**
     * Local form control object to store selected validation
     * @type {{}}
     */
    formControls: any = {};
    /**
     * Value of min length validation
     */
    minLengthVal: number;
    /**
     * Value of max length validation
     */
    maxLengthVal: number;
    /**
     * Value of pattern validation
     */
    patternVal: any;
    /**
     * Value of custom validation
     *
     * @example
     * onModelChange - Function name
     */
    customVal: string;
    /**
     * List of types for input field
     *
     * @example
     * text, number, email,...
     */
    inputTypes: string[];
    /**
     * List of source types, when source type is dynamic, show additional attributes for getting data from server
     */
    sourceTypes: any[];
    /**
     * Method of calling service
     *
     * @example
     * GET
     */
    serviceMethod: string;
    /**
     * Location of service
     */
    serviceUrl: string;
    /**
     * Array reference
     */
    arrayRef: string;
    /**
     * Value field
     */
    valueField: string;
    /**
     * Payload
     */
    payloadField: string;
    /**
     * Text field
     */
    textField: string;
    /**
     * Selected source type, default to static
     * @type {string}
     */
    selectedSourceType: string = 'Static';
    /**
     * Identification of field
     */
    keyValue: string;
    /**
     * List of static options for dropdown, radio buttons
     */
    options: any[];
    /**
     * Flag to check whether form is submitted
     * @type {boolean}
     */
    submitted: boolean = false;
    /**
     * Selected input type, defaulted to text
     * @type {string}
     */
    selectedTextBoxType: string = 'text';
    /**
     * Function name of lookup function for combobox, default to lookupFunction
     * @type {string}
     */
    lookupFunction: string;
    /**
     * List of result fields to be displayed
     * @type {string}
     */
    resultFields: string;
    /**
     * Function name of open lookup modal function for combobox, default to openLookupModal
     * @type {string}
     */
    openLookupModal: string;
    /**
     * Function name of modal change event handler, default to onModelChange
     * @type {string}
     */
    onModelChange: string = 'onModelChange';
    /**
     * Flag to check whether field is new or existing
     * @type {boolean}
     */
    isUpdate: boolean = false;
    /**
     * Selected field from existing list
     * @type {{}}
     */
    selectedField: any = {};
    /**
     * Toggle editing/read-only mode for specific fields
     * @type {boolean}
     *
     * @example
     * controlType, key
     */
    isEditing = false;
    /**
     * Editing field event
     */
    editingFieldEvent: any;
    /**
     * Selected default option
     */
    selectedDefaultOption: any;
    /**
     * Radio selection design
     */
    stacked: boolean;
    /**
     * Existing form object
     */
    @Input() existingForm: any;
    /**
     * Callback when form is saved
     * @type {EventEmitter}
     */
    @Output() onSave = new EventEmitter();
    /**
     * Step Reference for the field for wizard/accordion
     */
    step: any;
    /**
     * Checkbox for toggling helper text
     * @type {boolean}
     */
    hasHelperTextCheck: boolean = false;
    /**
     * Helper text
     */
    helperText: string;
    /**
     * Checkbox for toggling placeholder text
     * @type {boolean}
     */
    hasPlaceholderTextCheck: boolean = false;
    /**
     * Placeholder text
     */
    placeholderText: string;
    /**
     * Display list of uploaded files horizontally (default to false) or vertically (true)
     * @type {boolean}
     */
    isStackedSelection: boolean = false;
    /**
     * Maximum size to be uploaded, file cannot exceed this limit
     */
    maxFileSize: number;
    /**
     * Maximum number of files to be uploaded
     */
    maxUploads: number;
    /**
     * Toggle show/hide list of files to be uploaded
     */
    isFileListShownSelection: boolean = true;
    /**
     * Toggle upload area to be disabled
     */
    isDisabledSelection: boolean = false;
    /**
     * Upload id
     */
    templateId: string;
    /**
     * List of classes for displaying list of files
     */
    listClasses: string;
    /**
     * Base service url for calling upload endpoint
     */
    baseUrl: string;
    /**
     * Accepted file types to be uploaded
     */
    acceptedFileType: string;
    /**
     * List of colspan for group header field
     */
    colSpanList: any[];

    constructor(
        private broadcastService: BroadcastService,
        private formErrorsService: FormErrorsService
    ) {

        this.formErrorsService.addValue('existing', 'Inputted value already exist.');

        this.addEditFormField = new FormGroup({
            fieldList: new FormControl(),
            key: new FormControl('', [(c: FormControl) => {
                if (this.isUpdate) {
                    return !this.checkExistingKey(c.value) ? null : {existing: {valid: false}};
                } else {
                    return null;
                }
            }]),
            label: new FormControl(),
            title: new FormControl(),
            value: new FormControl(),
            source: new FormControl(),
            hidden: new FormControl(),
            model: new FormControl(),
            onModelChange: new FormControl('', [(c: FormControl) => {
                if (this.selectedControlType === 'dropdown' || this.selectedControlType === 'combobox') {
                    return c.value ? null : { required: { valid: false } };
                }

                return null;
            }]),
            order: new FormControl(),
            controlType: new FormControl('', Validators.required),
            lookupFunction: new FormControl('', [(c: FormControl) => {
                if (this.selectedControlType === 'combobox') {
                    return c.value ? null : { required: { valid: false } };
                }

                return null;
            }]),
            resultFields: new FormControl('', [(c: FormControl) => {
                if (this.selectedControlType === 'combobox') {
                    return c.value ? null : { required: { valid: false } };
                }

                return null;
            }]),
            openLookupModal: new FormControl('', [(c: FormControl) => {
                if (this.selectedControlType === 'combobox') {
                    return c.value ? null : { required: { valid: false } };
                }

                return null;
            }]),
            textboxType: new FormControl('', [(c: FormControl) => {
                if (this.selectedControlType === 'textbox') {
                    return c.value ? null : { required: { valid: false } };
                }

                return null;
            }]),
            sourceType: new FormControl(),
            numRows: new FormControl(3, [(c: FormControl) => {
                if (this.selectedControlType === 'textarea') {
                    return c.value ? null : { required: { valid: false } };
                }

                return null;
            }]),
            requiredCheck: new FormControl(),
            minLthCheck: new FormControl(),
            minLthValue: new FormControl(),
            maxLthCheck: new FormControl(),
            maxLthValue: new FormControl(),
            patternCheck: new FormControl(),
            patternValue: new FormControl(),
            customCheck: new FormControl(),
            customValue: new FormControl(),
            hasHelperText: new FormControl(false),
            helperText: new FormControl(),
            hasPlaceholderText: new FormControl(false),
            placeholderText: new FormControl(),
            step: new FormControl('', [(c: FormControl) => {
                if (this.existingForm &&
                    (this.existingForm.formType === 'wizard' || this.existingForm.formType === 'accordion')) {
                    return c.value ? null : { required: { valid: false } };
                }
            }]),
            isStacked: new FormControl(),
            maxFileSize: new FormControl(),
            maxUploads: new FormControl(),
            isFileListShown: new FormControl(),
            isDisabled: new FormControl(),
            templateId: new FormControl(),
            listClasses: new FormControl(),
            baseUrl: new FormControl('', [(c: FormControl) => {
                if (this.selectedControlType === 'fileupload') {
                    return c.value ? null : { required: { valid: false } };
                }

                return null;
            }]),
            acceptedFileType: new FormControl(),
            colSpan: new FormControl('one')
        });

    }

    /**
     * Initialize default LOV values.
     */
    ngOnInit() {
        this.inputTypes = ['email', 'number', 'password', 'text'];
        this.colSpanList = [
            { name: 'One', value: 'one' }, { name: 'Two', value: 'two' }, { name: 'Three', value: 'three' }
        ];
        this.sourceTypes = [{ name: 'Static', value: 'static' }, { name: 'Dynamic', value: 'dynamic' }];

        this.editingFieldEvent = this.broadcastService.on('EDITING::FIELD')
            .subscribe((field) => {
                this.selectedField = field;
                this.populateFieldData();
            });
    }

    /**
     * Destroy listening event.
     */
    ngOnDestroy() {
        if (this.editingFieldEvent) {
            this.editingFieldEvent.unsubscribe();
        }
    }

    /**
     * Populate selected field data when selected
     */
    populateFieldData() {

        this.isEditing = true;
        // add reset functionality
        this.selectedControlType = this.selectedField.controlType;

        // set default static options
        if (this.selectedControlType === 'checkbox' || this.selectedControlType === 'checkboxes') {
            this.sourceTypes = [{ name: 'Static', value: 'static' }];
        } else {
            this.sourceTypes = [{ name: 'Static', value: 'static' }, { name: 'Dynamic', value: 'dynamic' }];
        }

        let controls = this.addEditFormField.controls;

        // set form values
        controls['key'].setValue(this.selectedField.key);
        controls['label'].setValue(this.selectedField.label);
        controls['title'].setValue(this.selectedField.title);
        controls['value'].setValue(this.selectedField.value);
        controls['onModelChange'].setValue(this.selectedField.onModelChange);
        controls['order'].setValue(this.selectedField.order);

        if (this.selectedField.model) {
            controls['model'].setValue(this.selectedField.model);
        }

        // set helper text
        controls['hasHelperText'].setValue(this.selectedField.hasHelperText);
        controls['helperText'].setValue(this.selectedField.helperText);

        // set optional fields
        switch (this.selectedControlType) {
            case 'textbox':
                controls['textboxType'].setValue(this.selectedField.type);
                controls['hasPlaceholderText'].setValue(this.selectedField.hasPlaceholderText);
                controls['placeholderText'].setValue(this.selectedField.placeholderText);
                break;

            case 'combobox':
                controls['lookupFunction'].setValue(this.selectedField.lookupFunction);

                if (this.selectedField.resultFields && this.selectedField.resultFields.length) {
                    controls['resultFields'].setValue(this.selectedField.resultFields.join(','));
                }
                controls['openLookupModal'].setValue(this.selectedField.openLookupModal);
                break;

            case 'textarea' :
                controls['numRows'].setValue(this.selectedField.numRows);
                controls['hasPlaceholderText'].setValue(this.selectedField.hasPlaceholderText);
                controls['placeholderText'].setValue(this.selectedField.placeholderText);
                break;

            case 'dropdown':
            case 'radio':
                this.selectedDefaultOption = this.selectedField.model;
                controls['model'].setValue(this.selectedField.model);

                if (this.selectedControlType === 'radio') {
                    this.stacked = this.selectedField.stacked;
                }
                break;

            case 'fileupload':
                controls['isStacked'].setValue(this.selectedField.isStacked);
                controls['isDisabled'].setValue(this.selectedField.isDisabled);
                controls['isFileListShown'].setValue(this.selectedField.isFileListShown);
                controls['maxFileSize'].setValue(this.selectedField.maxFileSize);
                controls['maxUploads'].setValue(this.selectedField.maxUploads);
                controls['templateId'].setValue(this.selectedField.templateId);
                controls['baseUrl'].setValue(this.selectedField.baseUrl);
                controls['acceptedFileType'].setValue(this.selectedField.acceptedFileType);

                if (this.selectedField.listClasses && this.selectedField.listClasses.length) {
                    controls['listClasses'].setValue(this.selectedField.listClasses.join(','));
                }
                break;

            case 'header':
                controls['colSpan'].setValue(this.selectedField.colSpan);
                break;
        }

        // set source details
        if (this.selectedField.source) {
            controls['sourceType'].setValue('Dynamic');
            this.serviceMethod = this.selectedField.source.method;
            this.serviceUrl = this.selectedField.source.serviceUrl;
            this.arrayRef = this.selectedField.source.arrayRef;
            this.valueField = this.selectedField.source.valueField;
            this.payloadField = this.selectedField.source.payloadField;
            this.textField = this.selectedField.source.textField;
        } else {
            controls['sourceType'].setValue('Static');
            this.serviceMethod = null;
            this.serviceUrl = null;
            this.arrayRef = null;
            this.valueField = null;
            this.payloadField = null;
            this.textField = null;

            // set options
            if (this.selectedField.options && this.selectedField.options.length) {
                this.options = JSON.parse(JSON.stringify(this.selectedField.options));
            } else {
                if (this.selectedControlType === 'radio') {
                    this.options = [{ key: '1' }, { key: '2' }];
                } else if (this.selectedControlType === 'dropdown') {
                    this.options = [{ key: '1' }];
                }
            }
        }

        // add step reference for the wizard and accordion forms
        if (this.existingForm)  {
            if (this.existingForm.formType === 'wizard' || this.existingForm.formType === 'accordion') {
                controls['step'].setValue(this.selectedField.step);
            }
        }

        // reset validators field value
        this.formControls.required = false;
        this.formControls.minLength = false;
        this.formControls.maxLength = false;
        this.formControls.pattern = false;
        this.formControls.custom = false;
        this.minLengthVal = null;
        this.maxLengthVal = null;
        this.patternVal = null;
        this.customVal = null;

        // add all validators
        if (this.selectedField.formControls) {
            this.selectedField.formControls.forEach(item => {
                switch (item.validator) {
                    case 'required':
                        this.formControls.required = true;
                        break;

                    case 'minLength':
                        this.formControls.minLength = true;
                        this.minLengthVal = item.value;
                        break;

                    case 'maxLength':
                        this.formControls.maxLength = true;
                        this.maxLengthVal = item.value;
                        break;

                    case 'pattern':
                        this.formControls.pattern = true;
                        this.patternVal = item.value;
                        break;

                    case 'custom':
                        this.formControls.custom = true;
                        this.customVal = item.value;
                        break;
                }
            });
        }

        // set list classes for file upload field
        if (this.selectedField.listClasses) {
            let listClasses = this.selectedField.listClasses.join(',');
            controls['listClasses'].setValue(listClasses);
        }
    }

    /**
     * Save new field or update existing one
     * @param isUpdate
     */
    addEditField(isUpdate?: boolean) {
        if (!this.checkValidation()) {
            return false;
        }

        let formData = JSON.parse(JSON.stringify(this.addEditFormField.value));

        formData.formControls = [];

        // map options
        if (this.selectedSourceType === 'Static' && this.options) {

            formData.options = this.options.filter((option) => {
                return option.key && option.value;
            });

        }

        // map validators
        for (let prop in this.formControls) {
            if (this.formControls.hasOwnProperty(prop)) {
                switch (prop) {
                    case 'required':
                        if (this.formControls[prop]) {
                            formData.formControls.push({ validator: 'required', value: this.formControls[prop] });
                        }
                        break;

                    case 'minLength':
                        if (this.minLengthVal) {
                            formData.formControls.push({ validator: 'minLength', value: this.minLengthVal });
                        }
                        break;

                    case 'maxLength':
                        if (this.maxLengthVal) {
                            formData.formControls.push({ validator: 'maxLength', value: this.maxLengthVal });
                        }
                        break;

                    case 'pattern':
                        if (this.patternVal) {
                            formData.formControls.push({ validator: 'pattern', value: this.patternVal });
                        }
                        break;

                    case 'custom':
                        if (this.customVal) {
                            formData.formControls.push({ validator: 'custom', value: this.customVal });
                        }
                        break;
                }
            }
        }

        // add source information
        if (this.selectedSourceType === 'Dynamic') {
            formData.source = {};
            formData.source.method = this.serviceMethod;
            formData.source.serviceUrl = this.serviceUrl;
            formData.source.arrayRef = this.arrayRef;
            formData.source.valueField = this.valueField;
            formData.source.payloadField = this.payloadField;
            formData.source.textField = this.textField;
        }

        switch (this.selectedControlType) {
            case 'textbox':
                formData.type = this.selectedTextBoxType;
                break;

            case 'radio':
                formData.stacked = this.stacked;
                break;

            case 'checkbox':
                if (typeof formData.model === 'string') {
                    formData.model = formData.model === 'true';
                }
                break;

            case 'combobox':
                formData.resultFields = formData.resultFields.split(',');
        }

        // split listClasses string into array
        if (formData.listClasses && formData.listClasses.length) {
            formData.listClasses = formData.listClasses.split(',');
        }

        this.onSave.emit({
            formData: formData,
            update: isUpdate
        });

        this.isUpdate = isUpdate;

        this.cancelEditing();
    }

    /**
     * Reset form validation and default field values
     */
    cancelEditing() {
        this.submitted = false;
        this.isEditing = false;
        this.isUpdate = false;

        this.addEditFormField.reset();

        // reset existing form field selection
        this.selectedField = {};
        this.options = [{ key: '1' }];

        // reset default field values
        let controls = this.addEditFormField.controls;

        controls['sourceType'].setValue('Static');
        controls['onModelChange'].setValue('onModelChange');
    }

    /**
     * Add new option
     */
    addNewOption() {
        let latestValue = this.options[this.options.length - 1].key;
        let limitReached = (this.selectedControlType === 'radio' || this.selectedControlType === 'checkboxes') &&
            this.options.length === 5;

        if (latestValue === '' || limitReached) {
            return false;
        }

        if (!latestValue || isNaN(Number(latestValue))) {
            latestValue = '';
        } else {
            latestValue = (Number(latestValue) + 1).toString();
        }

        this.options.push({ key: latestValue });
    }

    /**
     * Remove current option
     * @param pos
     */
    removeNewOption(pos) {
        this.options.splice(pos, 1);
    }

    /**
     * Check if existing key has already been used inside form
     * @param key
     * @returns {boolean}
     */
    checkExistingKey = (key) => {
        let existed = false;

        if (this.existingForm && this.existingForm.formBody) {
            for (let field of this.existingForm.formBody) {
                if (field.key === key) {
                    existed = true;
                    break;
                }
            }
        }

        return existed;
    };

    /**
     * Default to static options list for radio buttons and dropdown selection
     */
    setupOptions() {
        if (!this.isEditing) {
            switch (this.selectedControlType) {
                case 'radio':
                    this.sourceTypes = [{ name: 'Static', value: 'static' }, { name: 'Dynamic', value: 'dynamic' }];
                    this.options = [{ key: '1' }, { key: '2' }];
                    break;

                case 'dropdown':
                    this.sourceTypes = [{ name: 'Static', value: 'static' }, { name: 'Dynamic', value: 'dynamic' }];
                    this.options = [{ key: '1' }];
                    break;

                case 'checkbox':
                case 'checkboxes':
                    this.sourceTypes = [{ name: 'Static', value: 'static' }];
                    this.options = [{ key: false }];
                    this.addEditFormField.controls['model'].setValue(false);
                    break;

                case 'combobox':
                    this.lookupFunction = 'lookupFunction';
                    this.openLookupModal = 'openLookupModal';
                    break;
            }
        }
    }

    /**
     * Default model option
     * @param option
     */
    setDefaultOption(option) {
        if (this.selectedControlType === 'radio' || this.selectedControlType === 'dropdown') {
            this.selectedDefaultOption = option.key;
            this.addEditFormField.controls['model'].setValue(option.key);
        } else if (this.selectedControlType === 'checkbox') {
            option.key = true;
            this.selectedDefaultOption = true;
            this.addEditFormField.controls['model'].setValue(true);
        }
    }
    /**
     * Check form validation
     * @returns {boolean}
     */
    private checkValidation() {
        this.submitted = true;
        return this.addEditFormField.valid;
    }
}
