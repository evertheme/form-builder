import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnapLightboxService } from 'snap/src/snap/page-layout/light-box/snap-light-box.service';
import { FormService } from '../../services/form.service';
import { AppConfig } from '../../app.config';

/**
 * List all existing forms in dynamicforms collection in mongoDB
 */
@Component({
    selector: 'form-list',
    templateUrl: './form-list.component.html'
})
export class FormListComponent implements OnInit {
    /**
     * List of forms
     */
    forms: any;
    /**
     * Selected form's id
     */
    formId: string;

    constructor(
        private appConfig: AppConfig,
        private formService: FormService,
        private router: Router,
        private snapLightboxService: SnapLightboxService
    ) {}

    /**
     * Call service to get all dynamic forms from database and assigned to forms array
     */
    ngOnInit() {
        this.formService.appUrl = this.appConfig.appURL;
        this.getAllDynamicForms();
    }

    /**
     * Redirect to add new form page
     */
    addNewForm() {
        this.router.navigate(['/form-list/add-new']);
    }

    /**
     * Redirect to form builder page passing selected form's id
     * @param id
     */
    buildFields(id) {
        this.router.navigate(['/form-builder/', id]);
    }

    /**
     * Redirect to form list page passing selected form's id
     * @param id
     */
    editExistingForm(id) {
        this.router.navigate(['/form-list/', id]);
    }

    /**
     * Redirect to preview page passing selected form's id
     * @param id
     */
    goToForm(id) {
        this.router.navigate(['/form-list/', id, 'preview']);
    }

    /**
     * Open modal containing selected form
     * @param id
     */
    openFormModal(id) {
        this.formId = id;
        this.snapLightboxService.open('preview-form-modal');
    }

      /**
     * Open modal window confirmation for the delete form
     * @param id
     */
    openConfirmation(id) {
        this.formId = id;
        this.snapLightboxService.open('delete-form-confirmation');
    }

    /**
     * Deletes the form from the database
    */
    deleteForm() {
        this.formService.deleteFormById(this.formId)
            .then((data) => {
                if (data && data.message) {
                    console.log(data.message);
                    this.getAllDynamicForms();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    /**
     * Gets the full list of the dynamic forms currently defined
     */
    private getAllDynamicForms() {
        this.formService.getAllDynamicForms()
            .then((data) => {
                this.forms = data;
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
