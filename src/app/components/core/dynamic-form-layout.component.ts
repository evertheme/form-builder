import { Component, Input, Output, OnInit, EventEmitter }  from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DragulaService } from 'ng2-dragula';

import { FieldBase } from '../../models/field-base';

/**
 * Display form fields in one columns layout
 */
@Component({
    selector: 'dynamic-form-layout',
    templateUrl: './dynamic-form-layout.component.html',
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
export class DynamicFormLayoutComponent implements OnInit {
    /**
     * Flag to check whether form is submitted
     */
    submitted: boolean;
    /**
     * Drag and drop options object
     */
    dragulaOptions: any;
    /**
     * Current Field Being Edited
     */
    editedField: FieldBase<any>;
    /**
     * Selected step for showing fields of that step
     */
    selectedStep = 1;
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
        public dragulaService: DragulaService
    ) {
        this.dragulaOptions = {
            moves: (el, container, handle) => {
                return handle.className.indexOf('drag-handle') >= 0;
            }
        };
    }

    /**
     * Add listener for when an item is dropped to new place
     */
    ngOnInit() {
        this.dragulaService.drop.subscribe(() => {
            this.reOrderField();
        });
    }

    /**
     * Call delete field callback
     * @param field
     */
    removeField(field) {
        this.onDeleteField.emit(field);
    }

    /**
     * Call edit field callback
     * @param field
     */
    editField(field) {
        this.editedField = field;
        this.onEditField.emit(field);
    }

      /**
     * Reorder Fields on the form
     * Sequential order Assumed
     */
    private reOrderField() {
        let order = 1;
        for (let field of this.fields) {
            field.order = order;
            order++;
        }

        this.onReOrderField.emit();
    }
}
