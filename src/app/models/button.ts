export class Button {
    type: String;
    callbackFunc: String;
    value: String;

    constructor(options: {
        type?: String,
        callbackFunc?: String,
        value?: String
    } = {}) {
        this.type = options.type;

        if (options.callbackFunc) {
            this.callbackFunc = options.callbackFunc;
        } else {
            switch (this.type) {
                case 'Primary':
                    this.callbackFunc = 'onSubmit';
                    break;
                case 'Tertiary':
                case 'Secondary':
                    this.callbackFunc = 'onSelect';
                    break;
                case 'Cancel':
                    this.callbackFunc = 'onCancel';
                    break;
            }
        }

        this.value = options.value;
    }
}
