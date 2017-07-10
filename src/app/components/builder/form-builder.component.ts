import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnapLightboxService } from 'snap/src/snap/page-layout/light-box/snap-light-box.service';

import { FIELD_MODELS } from '../../models/index';
import { FormService } from '../../services/form.service';
import { FieldControlService } from '../../services/field-control.service';
import { BroadcastService } from 'snap/src/snap/feedback/spinner/broadcaster.service';

/**
 * Form builder
 */
@Component({
    selector: 'form-builder',
    templateUrl: './form-builder.component.html'
})
export class FormBuilderComponent implements OnInit {
    /**
     * List of fields
     * @type {Array}
     */
    fields: any[] = [];
    /**
     * Functions object used for making callbacks from within dynamic form field component
     */
    callbackFunc: any;
    /**
     * Selected form's title
     */
    selectedFormTitle: string;
    /**
     * Selected form's id
     */
    formId: string;
    /**
     * Selected existing form
     */
    existingForm: any;
    /**
     * Selected field
     */
    selectedField: any;
    /**
     * Form group used for validation
     */
    form: FormGroup;

    constructor(
        private broadcastService: BroadcastService,
        private formService: FormService,
        private fieldControlService: FieldControlService,
        private route: ActivatedRoute,
        private router: Router,
        private snapLightboxService: SnapLightboxService
    ) {}

    /**
     * Get selected form by id
     */
    ngOnInit() {
        this.formId = this.route.snapshot.params['id'];
        this.callbackFunc = {};

        this.getDynamicFormById();
    }

    /**
     * Call service to save new field or updating existing ones
     * When succeed, refresh form data from server
     * @param qs
     * @param update
     */
    save(qs: any, update?: boolean) {
        let newField = new FIELD_MODELS[qs.controlType](qs);
        let existingForm = JSON.parse(JSON.stringify(this.existingForm));

        if (update) {
            for (let i = 0; i < existingForm.formBody.length; i++) {
                let field = existingForm.formBody[i];

                if (field.key === newField.key) {
                    existingForm.formBody[i] = newField;
                    break;
                }
            }
        } else {
            existingForm.formBody.push(newField);
        }

        this.formService.updateExistingForm(existingForm.formName, existingForm)
            .then(
                () => this.getDynamicFormById(),
                err => console.log(err)
            );
    }

    /**
     * Navigate to preview page by passing existing form's id
     */
    goToPreview() {
        this.snapLightboxService.open('preview-form-modal');
    }

    /**
     * Open confirmation modal before deleting existing field
     * @param field
     */
    openConfirmation(field) {
        this.selectedField = field;
        this.snapLightboxService.open('removeFieldConfirmation');
    }

    /**
     * Call service to delete existing field
     */
    deleteField() {
        let pos = this.existingForm.formBody.findIndex((field) => {
            return field.key === this.selectedField.key;
        });

        this.existingForm.formBody.splice(pos, 1);

        this.formService.updateExistingForm(this.existingForm.formName, this.existingForm)
            .then(
                data => this.displayGeneratedForm(data),
                err => console.log(err)
            );
    }

    /**
     * Set editing field
     */
    editField(field) {
        this.broadcastService.broadcast('EDITING::FIELD', field);
    }

    /**
     * Reorder field
     */
    reOrderField() {
        this.formService.updateExistingForm(this.existingForm.formName, this.existingForm)
            .then(
                data => this.displayGeneratedForm(data),
                err => console.log(err)
            );
    }

    /**
     * Refresh dynamic form fields displayed on right panel
     * @param form
     */
    private displayGeneratedForm(form) {
        this.callbackFunc = {};

        this.fieldControlService.generateCallbacks(form.formBody, this.callbackFunc);

        this.existingForm = form;
        this.fields = form.formBody;
        this.form = this.fieldControlService.toFormGroup(this.fields, this.callbackFunc);
    }

    /**
     * Get dynamic form by id and display
     */
    private getDynamicFormById() {
        this.formService.getDynamicFormById(this.formId)
            .then(
                data => {
                    this.existingForm = data;
                    this.displayGeneratedForm(this.existingForm);
                }
            );
    }
}
