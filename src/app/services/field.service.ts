import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { FIELD_MODELS } from '../models/index';
import { FieldBase }     from '../models/field-base';

/**
 * Service used for various field related functionality
 */

@Injectable()
export class FieldService {

    /**
    * Variable to store data returned from the service call
    */
    data: any;

    constructor(private http: Http) {}

     /**
     * Method gets stream in case of dynamic source for the field
     * @param field
     * @returns {Observable[]}
     */
    getDynamicOptions(field: FieldBase<any>): Observable<any[]> {
        let serviceResponse: Observable<any[]>;

        if (field.source) {
            if (field.source.method && field.source.method.toUpperCase() === 'GET') {
                serviceResponse = this.getResponseFromGetService(field.source.serviceUrl);
            } else {
                let payload;

                try {
                    payload = JSON.parse(field.source.payloadField);
                } catch (err) {
                    console.log(err);
                }

                serviceResponse = this.getResponseFromPostService(field.source.serviceUrl, payload);
            }
        }

        return serviceResponse;
    }

     /**
     * Generic method to get response for get service
     * @param url
     * @returns {Observable[]}
     */
    getResponseFromGetService(url): Observable<any[]> {
        return this.http.get(url)
            .map((response: Response) => <any[]>response.json())
            .map(data => {
                return data;
            })
            .catch(this.handleError);
    }

     /**
     * Generic method to get response for post service
     * @param url
     * @param payload
     * @returns {Observable[]}
     */
    getResponseFromPostService(url, payload?): Observable<any[]> {
        return this.http.post(url, payload)
            .map((response: Response) => <any[]>response.json())
            .map(data => {
                return data;
            })
            .catch(this.handleError);
    }

     /**
     * Method creates sorted list of fields by sort order
     * @param field
     * @returns {Observable[]}
     */
    buildFields(data: any) {
        let fields: any = [];

        data.forEach((item: any) => {
            fields.push(new FIELD_MODELS[item.controlType](item));
        });

        return fields.sort((a, b) => a.order - b.order);
    }

     /**
     * Generic Error handling method
     * @param error
     * @returns {Observable}
     */
    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        return Observable.throw(error.json().error || 'Server error');
    }
}



