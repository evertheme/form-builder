import { Component, Input, Output, EventEmitter }  from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DragulaService } from 'ng2-dragula';
import { BroadcastService } from 'snap/src/snap/feedback/spinner/broadcaster.service';

import { DynamicFormLayoutComponent } from './dynamic-form-layout.component';

/**
 * Display form fields in one columns layout
 */
@Component({
    selector: 'dynamic-form-layout-view',
    templateUrl: './dynamic-form-layout-view.component.html',
    styles: [`
        .stacked-form.drag-and-drop>ul li {
            height: auto !important;
            padding: .14em;
        }
        .stacked-form.drag-and-drop>ul li .drag-node {
            border: 1px dashed #C6C7C7;
            height: 5.2em;
            padding: .5em;
        }
        .edit {
            border-color: #009DDC !important;
        }
        .stacked-form.drag-and-drop>ul li.field-help .drag-node {
            height: 6.6em !important;
        }
        .stacked-form.drag-and-drop>ul li.height-2-rows .drag-node {
            height: 10.67em;
        }
        .stacked-form.drag-and-drop>ul li.height-3-rows .drag-node {
            height: 16.15em;
        }
    `]
})
export class DynamicFormLayoutViewComponent extends DynamicFormLayoutComponent {
    /**
     * Drag and drop options object
     */
    dragulaOptions: any;
    /**
     * Form initiation event object
     */
    formInit: any;
    /**
     * Form validation completed event object
     */
    formValidationCompleted: any;
    /**
     * Form submission event object
     */
    formSubmission: any;
    /**
     * Current step
     * @type {number}
     */
    @Input() currentStep: number;
    @Output() currentStepChange = new EventEmitter();
    /**
     * Flag to check whether form is submitted
     */
    @Input() submitted: boolean;
    /**
     * Existing form object
     */
    @Input() existingForm: any;
    /**
     * Form group used for validation
     */
    @Input() form: FormGroup;
    /**
     * Toggle read-only mode for dynamic form field component
     */
    @Input() editable: boolean;
    /**
     * Functions object used for making callbacks from within dynamic form field component
     */
    @Input() callbackFunc: any;
    /**
     * List of form fields
     * @param value
     */
    @Input() fields: any[];
    /**
     * List of custom steps for wizard layout
     */
    @Input() customSteps: any[];
    /**
     * Callback when selected field is deleted
     * @type {EventEmitter}
     */
    @Output() onDeleteField = new EventEmitter();
    /**
     * Callback when selected field is edited
     * @type {EventEmitter}
     */
    @Output() onEditField = new EventEmitter();
    /**
     * Callback when fields are reordered
     * @type {EventEmitter}
     */
    @Output() onReOrderField = new EventEmitter();

    constructor(
        public broadcastService: BroadcastService,
        public dragulaService: DragulaService
    ) {
        super(dragulaService);
    }

    ngOnInit() {
        this.formInit = this.broadcastService.on('FORM_BUILDER::FORM_INIT')
            .subscribe(() => {
                console.log('Form is initialized.');
            });

        this.formValidationCompleted = this.broadcastService.on('FORM_BUILDER::FORM_VALIDATE_COMPLETED')
            .subscribe(() => {
                console.log('Form is validated.');
            });

        this.formSubmission = this.broadcastService.on('FORM_BUILDER::FORM_SUBMITTED')
            .subscribe(() => {
                console.log('Form is submitted.');
            });
    }

    ngDestroy() {
        this.formInit.unsubscribe();
        this.formValidationCompleted.unsubscribe();
        this.formSubmission.unsubscribe();
    }

    /**
     * Go to previous page of create request modal
     */
    previousPage() {
        this.currentStep = this.currentStep - 1;
        this.currentStepChange.emit(this.currentStep);
    }

    /**
     * Go to next page of create request modal
     */
    nextPage() {
        this.currentStep = this.currentStep + 1;
        this.currentStepChange.emit(this.currentStep);
    }
}
