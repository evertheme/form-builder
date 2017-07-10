import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

/**
 * Service used for get/save form data to database
 */

@Injectable()
export class FormService {
    appUrl: string;

    constructor(
        private http: Http
    ) {}

    /**
     * Method deletes the specific form by id
     */
    deleteFormById(formId) {
        return this.http.delete(this.appUrl + '/dynamic-forms/' + formId)
            .map(this.extractData)
            .toPromise();
    }

    /**
    * Method gets the list of all dynamic forms
    */
    getAllDynamicForms() {
        return this.http.get(this.appUrl + '/dynamic-forms')
            .map(this.extractData)
            .toPromise();
    }

    /**
    * Method gets form information by form Id
    * @param formId
    */
    getDynamicFormById(formId) {
        return this.http.get(this.appUrl + '/dynamic-forms/' + formId)
            .map(this.extractData)
            .toPromise();
    };

    /**
    * Method gets the form body of the form by Id
    * @param formId
    */
    getDynamicForm(formId) {
        return this.http.get(this.appUrl + '/dynamic-forms/' + formId)
            .map(this.extractData)
            .map(data => data.formBody);
    };

    /**
    * Method gets specific form request by request Id
    * @param requestId
    */
    getFormRequest(requestId) {
        return this.http.get(this.appUrl + '/form-requests/' + requestId)
            .map(this.extractData)
            .map(data => data.requestData);
    }

    /**
    * Method saves new form data
    * @param form
    */
    saveNewForm(form) {
        return this.http.post(this.appUrl + '/submit-form', form)
            .map(this.extractData);
    }

    /**
    * Method updates existing form by form name
    * @param name
    * @param form
    */
    updateExistingForm(name, form) {
        return this.http.put(this.appUrl + '/submit-form/name/' + name, form)
            .map(this.extractData)
            .toPromise();
    }

    /**
    * Method updates existing form by form Id
    * @param formId
    * @param formData
    */
    updateExistingFormById(formId, formData) {
        return this.http.put(this.appUrl + '/submit-form/' + formId, formData)
            .map(this.extractData)
            .toPromise();
    }

    /**
    * Method extracts data from response
    * @param res
    */
    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }
}
