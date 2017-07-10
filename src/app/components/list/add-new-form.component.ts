import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FormService } from '../../services/form.service';
import { Step } from '../../models/step';

/**
 * Add new form
 */
@Component({
    selector: 'add-new-form',
    templateUrl: './add-new-form.component.html'
})
export class AddNewFormComponent {
    /**
     * Form object with default one column layout
     * @type {{formLayout: string}}
     */
    newForm: any = { formLayout: 'oneColumn' };

    constructor(
        private formService: FormService,
        private router: Router
    ) {}

    /**
     * onInit function
     */
     ngOnInit() {
          if (!this.newForm.formButtons || !this.newForm.formButtons.length) {
                        this.newForm.formButtons = [];
                        this.addButton('Submit', 'onSubmit');
                    }
     }
    /**
     * Call service to save new form to mongoDB
     */
    saveForm(form) {
        if (form.valid) {
            this.formService.saveNewForm(this.newForm)
                .subscribe(
                    data => this.cancel(),
                    err => console.log(err)
                );
        }
    }

    /**
     * Return to form list page
     */
    cancel() {
        this.router.navigate(['/form-list']);
    }

    /**
     * TODO: Refactor below code to common component to be used in Add & Edit forms
     */

    /**
     * adds the first step to the steps array on the form
     */
    addFirstStep() {
        if (this.newForm.formType === 'accordion' || this.newForm.formType === 'wizard') {
            this.newForm.steps = [new Step('One', '1')];
        } else {
            delete this.newForm.steps;
        }
    }

    /**
     * a function to add a new Step to (this.steps)
     */
    addStep() {
        let latestStep = this.newForm.steps[this.newForm.steps.length - 1];

        if (latestStep.name && latestStep.value) {
            this.newForm.steps.push(new Step('', ''));
        }
    }

     /**
     * adds a button to the local formButtons array
     */
    addButton(val?, callback?) {
        this.newForm.formButtons.push({type: this.getTypes()[0], value: val || 'New Button', callbackFunc: callback || ''});
    }

    /**
     * generates list of types so buttons can't reuse types multiple times
     */
    getTypes(buttonType?): Array<string> {
        let tempTypes = ['Primary', 'Secondary', 'Tertiary', 'Cancel'];
        for (let button of this.newForm.formButtons) {
            tempTypes = tempTypes.filter((type) => {
                return type !== button.type;
            });
        }
        if (buttonType) {
            tempTypes.push(buttonType);
        }
        return tempTypes;
    }
}
