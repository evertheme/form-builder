import { FieldBase } from './field-base';

/**
 * Class used for file upload fields
 */

export class FileUploadField extends FieldBase<string> {
    /**
     * Field control type
     */
    controlType = 'fileupload';
    /**
     * Display list of uploaded files horizontally (default to false) or vertically (true)
     * @type {boolean}
     */
    isStacked: boolean;
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
    isFileListShown: boolean;
    /**
     * Toggle upload area to be disabled
     */
    isDisabled: boolean;
    /**
     * Upload id
     */
    templateId: string;
    /**
     * List of classes for displaying list of files
     */
    listClasses: string[];
    /**
     * Base service url for calling upload endpoint
     */
    baseUrl: string;
    /**
     * Accepted file types to be uploaded
     */
    acceptedFileType: string;

    constructor(options: {} = {}) {
        super(options);
        this.isStacked = options['isStacked'] || false;
        this.maxFileSize = options['maxFileSize'] || 2097152;
        this.maxUploads = options['maxUploads'] || 99999;
        this.isFileListShown = options['isFileListShown'] || true;
        this.isDisabled = options['isDisabled'] || false;
        this.templateId = options['templateId'] || '';
        this.listClasses = options['listClasses'] || [];
        this.baseUrl = options['baseUrl'] || '';
        this.acceptedFileType = options['acceptedFileType'] || '';
    }
}
