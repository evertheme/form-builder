import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

import { FormService } from '../../services/form.service';
import { SnapLightboxService } from 'snap/src/snap/page-layout/light-box/snap-light-box.service';
import { Step } from '../../models/step';
import { Button } from '../../models/button';
/**
 * Edit existing form
 */
@Component({
    selector: 'edit-existing-form',
    templateUrl: './edit-existing-form.component.html'
})
export class EditExistingFormComponent implements OnInit {
    /**
     * Existing form object
     * @type {{}}
     */
    existingForm: any = {};
    /**
     * Selected form's id
     */
    formId: string;
    /**
     * index of the button we want to delete
     */
    buttonIndexToDelete: number;
    /**
     * index of the step we want to delete
     */
    stepToDelete: number;
    /**
     * Form submission flag
     */
    submitted: boolean;

    constructor(
        private route: ActivatedRoute,
        private formService: FormService,
        private router: Router,
        private lightboxService: SnapLightboxService
    ) {
        this.formId = route.snapshot.params['id'];
    }

    /**
     * Call service to get selected form by id and set to existing form object
     */
    ngOnInit() {
        this.formService.getDynamicFormById(this.formId)
            .then(
                (data) => {
                    this.existingForm = data;
                    if (!this.existingForm.formButtons || !this.existingForm.formButtons.length) {
                        this.existingForm.formButtons = [];
                        this.addButton('Submit', 'onSubmit');
                    }
                });
    }

    /**
     * Call service to update existing form by id, passing updated form object to server
     * Redirect to either form list or form builder page after finish
     */
    updateForm(goToSetup: boolean, valid) {
        this.submitted = true;

        if (valid) {
            this.formService.updateExistingFormById(this.existingForm._id, this.existingForm)
                .then(
                    data => goToSetup ? this.setupFields() : this.cancel(),
                    err => console.log(err)
                );
        }
    }

    /**
     * Redirect to "form-builder" page after passing existing id
     */
    setupFields() {
        this.router.navigate(['/form-builder/', this.existingForm._id]);
    }

    /**
     * Redirect for form list page
     */
    cancel() {
        this.router.navigate(['/form-list']);
    }
    /**
     * TODO: Refactor below code to common component to be used in Add & Edit forms
     */

    /**
     * Opens lightbox for confirmation of deletion of form button
     */
    callDeleteButtonLightbox(i) {
        this.buttonIndexToDelete = i;
        this.lightboxService.open('delete-button-confirmation');
    }

    /**
     * Deletes the last button in the formButtons array if any buttons exist
     */
    deleteButton() {
        this.existingForm.formButtons.splice(this.buttonIndexToDelete, 1);
    }

    /**
     * adds a button to the local formButtons array
     */
    addButton(val?, callback?) {
        // let button = <Button>{type: this.getTypes()[0], value: val || 'New Button', callbackFunc: callback || ''};
        let button = new Button({type: this.getTypes()[0], callbackFunc: callback, value: val});
        this.existingForm.formButtons.push(button);
    }

    /**
     * generates list of types so buttons can't reuse types multiple times
     */
    getTypes(buttonType?): Array<string> {
        let tempTypes = ['Primary', 'Secondary', 'Tertiary', 'Cancel'];
        for (let button of this.existingForm.formButtons) {
            tempTypes = tempTypes.filter((type) => {
                return type !== button.type;
            });
        }
        if (buttonType) {
            tempTypes.push(buttonType);
        }
        return tempTypes;
    }
    /**
     * a function to add a new Step to (this.steps)
     */
    addStep() {
        let latestStep = this.existingForm.steps[this.existingForm.steps.length - 1];

        if (latestStep.name && latestStep.value) {
            this.existingForm.steps.push(new Step('', ''));
        }
    }
    /**
     * Deletes the step at specified index
     */
    deleteStep() {
        this.existingForm.steps.splice(this.stepToDelete, 1);
    }

    /**
     * Opens lightbox for confirmation of deletion of a step
     */
    callDeleteStepLightbox(i) {
        this.stepToDelete = i;
        this.lightboxService.open('delete-step-confirmation');
    }

    /**
     * adds the first step to the steps array on the form
     */
    addFirstStep() {
        if (this.existingForm.formType === 'accordion' || this.existingForm.formType === 'wizard') {
            if (!this.existingForm.steps || !this.existingForm.steps.length) {
                this.existingForm.steps = [new Step('One', '1')];
            }
        }
    }
}
