import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SnapMessageService } from 'snap/src/snap/feedback/messaging/message.service';
import { SnapLightboxService } from 'snap/src/snap/page-layout/light-box/snap-light-box.service';
import { SnapSpinnerService } from 'snap/src/snap/feedback/spinner/snap-spinner.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

/**
 * This component provides the ability to lookup and select LOV data.
 */
@Component({
    selector: 'ar-lov-lookup',
    templateUrl: './lov-lookup.component.html'
})
export class LOVLookupComponent implements OnInit {
    /**
     * LOV lookup modal's id
     */
    @Input() modalId: string;
    /**
     * Lookup type
     */
    @Input() type: string;
    /**
     * Lookup label
     */
    @Input() label: string;
    /**
     * Default sort column
     */
    @Input() defaultSortCol: string;
    /**
     * Default sort direction
     */
    @Input() defaultSortDir: string;
    /**
     * Default search page size
     */
    @Input() defaultPageSize: number;
    /**
     * Include all quotes in search
     */
    @Input() includeAllQuotes: boolean;
    /**
     * Search string
     */
    @Input() searchStr: string;
    /**
     * Callback when result is selected
     * @type {EventEmitter<any>}
     */
    @Output() onSelect = new EventEmitter<any>();
    /**
     * Lookup results list
     */
    lookupResults: any[];
    /**
     * Show/hide results
     */
    showResults: boolean;
    /**
     * Search object to be passed to server
     */
    searchObject: any;
    /**
     * Flag to check whether lookup search is completed
     */
    lookupComplete: boolean;
    /**
     * List of page results
     */
    pageResults: any[];
    /**
     * Current page
     */
    pageNum: number;
    /**
     * Spinner delay in time
     */
    delayIn: number;
    /**
     * Spinner delay out time
     */
    delayOut: number;
    /**
     * Flag to check whether result is array of string
     */
    isStringArray: boolean;
    /**
     * Total number of pages
     */
    totalPages: number;
    /**
     * Show message whether search has result
     */
    lookupStatus: string;
    /**
     * List of object keys
     */
    arrayOfKeys: any[];

    constructor(
        private http: Http,
        private _snapLightboxService: SnapLightboxService,
        private _snapMessageService: SnapMessageService,
        private snapSpinnerService: SnapSpinnerService
    ) {
        this.lookupResults = [];
        this.showResults = false;
        this.lookupComplete = false;
        this.pageResults = [];
        this.pageNum = 0;
        this.isStringArray = false;
        this.delayIn = 500;
        this.delayOut = 500;
    }

    /**
     * Lifecycle hook for when the component is initialized.
     */
    ngOnInit() {
        this.searchObject = {
            allQuotes: this.includeAllQuotes
        };

        if (this.searchStr) {
            this.findData();
        }
    }

    /**
     * Executes a search and displays the results.
     */
    findData() {
        this.showResults = true;

        // reset first
        this.pageNum = 0;
        this.lookupResults = [];
        this.totalPages = 0;

        // create searchObject
        if (this.type === 'pCategoryName' || this.type === 'pManufacturerName') {
            this.searchStr = this.searchStr || '%';
        }

        this.searchObject[this.type] = this.searchStr;

        this.getResults();

        if (this.searchStr === '%') {
            this.searchStr = undefined;
        }
    }

    /**
     * Code to execute when a user selects a result.
     * @param {object} result
     */
    handleSelect(result: any) {
        this.showResults = false;
        this.onSelect.emit(result);

        this._snapLightboxService.close(this.modalId);
    }

    /**
     * Retrieves the requested data.
     */
    getResults = () => {
        this.lookupStatus = '';

        this.snapSpinnerService.start(this.modalId + 'Spinner');

        return this.http
            .post('http://usmlrs1577.arrow.com:8001/myWorkSpaceGlobal/lov/pagedResellers', {
                pageNum: 0,
                pageSize: 20,
                sortCol: 'customerName',
                sortOrder: 'asc',
                requestType: 'Reseller',
                searchRequestRows: [
                    {
                        attrName: 'customerName',
                        operand: '=',
                        attrValue: this.searchStr
                    },
                    {
                        attrName: 'allQuotes',
                        operand: '=',
                        attrValue: 'N'
                    }
                ]
            })
            .toPromise()
            .then((res: Response) => {
                return res.json() || [];
            })
            .then((data) => {
                if (data.responseData.content && data.responseData.content.length > 0) {
                    this.isStringArray = typeof data.responseData.content[0] === 'string';
                    this.pageResults = data.responseData.content;

                    if (this.pageResults.length) {
                        this.arrayOfKeys = Object.keys(this.pageResults[0]);
                    }

                    this._pushPageResults();

                    this.lookupStatus = '';
                } else {
                    this.lookupStatus = 'No Matching Records Found.';
                }

                this.totalPages = data.responseData.totalPages;

                if (this.pageNum < this.totalPages) {
                    this.pageNum = this.pageNum + 1;
                }

                this.lookupComplete = true;

                this.snapSpinnerService.stop(this.modalId + 'Spinner');
            })
            .catch(() => {
                this._snapMessageService.addAlert('Error getting LOV data.', 'error');
            });
    };

    /**
     * Close modal
     */
    cancel() {
        this._snapLightboxService.close(this.modalId);
    }

    /////////////////////
    // helpers

    /**
     * Adds the results of a new page to the existing result set.
     * @private
     */
    private _pushPageResults() {
        let i = 0;
        while (i < this.pageResults.length) {
            if (typeof this.pageResults[i] !== 'string') {
                this.lookupResults.push(Object.assign({}, this.pageResults[i]));
            } else {
                this.lookupResults.push(this.pageResults[i]);
            }
            i++;
        }
    }
}
