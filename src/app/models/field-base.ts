
/**
 * Interface used for the Error Messages
 */
export interface IError {
     /**
     * Error key
     */
    key: string;
     /**
     * Error message
     */
    msg: string;
     /**
     * Error language (optional)
     */
    lang?: string;
}

/**
 * Interface used for the Dynamic Data Sources
 */
export interface ISource {
     /**
     * REST method
     */
    method: string;
     /**
     * Service URL
     */
    serviceUrl: string;
     /**
     * Reference to array in return data
     */
    arrayRef: string;
     /**
     * Field used for the value
     */
    valueField: string;
     /**
     * Field used for payload
     */
    payloadField?: any;
     /**
     * Field used for the text
     */
    textField: string;
}

/**
 * Interface used for Key/Value pairs
 */
export interface KeyValue {
     /**
     * Key used for Key/value
     */
    key: string;
     /**
     * Value used for Key/value
     */
    value: string;
}

/**
 * Base class used for all fields on the form
 * Typed interface
 */
export class FieldBase<T> {
     /**
     *Type of the field
     */
    value: T;
     /**
     * Unique key used for the field
     */
    key: string;
     /**
     * Field label
     */
    label: string;
     /**
     * Field title
     */
    title: string;
     /**
     * Field order
     */
    order: number;
     /**
     * Control type of the field
     */
    controlType: string;
     /**
     * Dynamic Source Reference
     */
    source?:  ISource;
     /**
     * Form validators
     */
    formControls: any;
     /**
     * Hidden option
     */
    hidden: boolean;
     /**
     * Angular model name
     */
    model: any;
     /**
     * Function to be called when model changes
     */
    onModelChange: string;
     /**
     * Position on the screen
     */
    position: string;
    /**
     * Has helper text
     */
    hasHelperText: boolean;
    /**
     * Text for the helper under the field
     */
    helperText: string;
    /**
     * Steps for wizard form
     */
    step: number;

    constructor(options: {
        value?: T,
        key?: string,
        label?: string,
        title?: string,
        order?: number,
        controlType?: string,
        source?: ISource,
        formControls?: any,
        hidden?: boolean,
        model?: any,
        onModelChange?: string,
        position?: string,
        hasHelperText?: boolean,
        helperText?: string,
        step?: number
    } = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.title = options.title || this.label;
        this.order = options.order || 1;
        this.controlType = options.controlType || '';
        this.source = options.source;
        this.formControls = options.formControls;
        this.hidden = options.hidden || false;
        this.model = options.model;
        this.onModelChange = options.onModelChange || 'onModelChange';
        this.position = options.position || 'L';
        this.helperText = options.helperText;
        this.hasHelperText = options.hasHelperText || false;
        this.step = options.step || null;
    }
}

