import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BroadcastService } from 'snap/src/snap/feedback/spinner/broadcaster.service';
import { FormErrorsService } from 'snap/src/snap/forms/form-errors/form-errors.service';

import { AddEditFormFieldsComponent } from './add-edit-form-fields.component';
import { SnapMocks } from '../../../test/snap.mock';

let snapMocks = new SnapMocks();
let broadcastService = snapMocks.broadcastService;
let formErrorsService = snapMocks.formErrorsService;

describe('AddEditFormFieldsComponent', function () {
    let comp: AddEditFormFieldsComponent;
    let fixture: ComponentFixture<AddEditFormFieldsComponent>;

    beforeEach(() => {
        TestBed.overrideComponent(AddEditFormFieldsComponent, { set: { template: '' } })
            .configureTestingModule({
                declarations: [ AddEditFormFieldsComponent ],
                providers: [
                    { provide: BroadcastService, useValue: broadcastService },
                    { provide: FormErrorsService, useValue: formErrorsService }
                ]
            });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddEditFormFieldsComponent);
        comp = fixture.componentInstance;
    });

    describe('Func: ngOnInit', () => {
        beforeEach(() => {
            comp.ngOnInit();
        });

        it('Should: set default variables', () => {
            expect(comp.inputTypes.length).not.toBe(0);
            expect(comp.colSpanList.length).not.toBe(0);
            expect(comp.sourceTypes.length).not.toBe(0);
        });
    });

    describe('Func: populateFieldData', () => {
        beforeEach(() => {
            comp.selectedField = {};
            comp.addEditFormField = <any>{ controls: {
                key: { setValue: jasmine.createSpy('setValue').and.callFake(() => {}) },
                label: { setValue: jasmine.createSpy('setValue').and.callFake(() => {}) },
                title: { setValue: jasmine.createSpy('setValue').and.callFake(() => {}) },
                value: { setValue: jasmine.createSpy('setValue').and.callFake(() => {}) },
                onModelChange: { setValue: jasmine.createSpy('setValue').and.callFake(() => {}) },
                order: { setValue: jasmine.createSpy('setValue').and.callFake(() => {}) },
                model: { setValue: jasmine.createSpy('setValue').and.callFake(() => {}) },
                hasHelperText: { setValue: jasmine.createSpy('setValue').and.callFake(() => {}) },
                helperText: { setValue: jasmine.createSpy('setValue').and.callFake(() => {}) },
                textboxType: { setValue: jasmine.createSpy('setValue').and.callFake(() => {}) },
                hasPlaceholderText: { setValue: jasmine.createSpy('setValue').and.callFake(() => {}) },
                placeholderText: { setValue: jasmine.createSpy('setValue').and.callFake(() => {}) },
                lookupFunction: { setValue: jasmine.createSpy('setValue').and.callFake(() => {}) },
                openLookupModal: { setValue: jasmine.createSpy('setValue').and.callFake(() => {}) },
                sourceType: { setValue: jasmine.createSpy('setValue').and.callFake(() => {}) },
                numRows: { setValue: jasmine.createSpy('setValue').and.callFake(() => {}) },
                isStacked: { setValue: jasmine.createSpy('setValue').and.callFake(() => {}) },
                isDisabled: { setValue: jasmine.createSpy('setValue').and.callFake(() => {}) },
                isFileListShown: { setValue: jasmine.createSpy('setValue').and.callFake(() => {}) },
                maxFileSize: { setValue: jasmine.createSpy('setValue').and.callFake(() => {}) },
                maxUploads: { setValue: jasmine.createSpy('setValue').and.callFake(() => {}) },
                templateId: { setValue: jasmine.createSpy('setValue').and.callFake(() => {}) },
                baseUrl: { setValue: jasmine.createSpy('setValue').and.callFake(() => {}) },
                acceptedFileType: { setValue: jasmine.createSpy('setValue').and.callFake(() => {}) },
                listClasses: { setValue: jasmine.createSpy('setValue').and.callFake(() => {})},
                colSpan: { setValue: jasmine.createSpy('setValue').and.callFake(() => {})},
                step: { setValue: jasmine.createSpy('setValue').and.callFake(() => {})}
            } };
        });

        it('Should: set editing mode', () => {
            comp.populateFieldData();

            expect(comp.isEditing).toBe(true);
        });

        it('Should: set source type as static only for checkbox', () => {
            comp.selectedField.controlType = 'checkbox';

            comp.populateFieldData();

            expect(comp.sourceTypes.length).toBe(1);
        });

        it('Should: set source type as static only for checkboxes', () => {
            comp.selectedField.controlType = 'checkboxes';

            comp.populateFieldData();

            expect(comp.sourceTypes.length).toBe(1);
        });

        it('Should: set default model value if exists', () => {
            comp.selectedField.model = 'test';

            comp.populateFieldData();

            expect(comp.addEditFormField.controls['model'].setValue).toHaveBeenCalled();
        });

        it('Should: set place holder value if control type is textbox', () => {
            comp.selectedField.controlType = 'textbox';

            comp.populateFieldData();

            expect(comp.addEditFormField.controls['textboxType'].setValue).toHaveBeenCalled();
            expect(comp.addEditFormField.controls['hasPlaceholderText'].setValue).toHaveBeenCalled();
            expect(comp.addEditFormField.controls['placeholderText'].setValue).toHaveBeenCalled();
        });

        it('Should: set additional functions value if control type is combobox', () => {
            comp.selectedField.controlType = 'combobox';

            comp.populateFieldData();

            expect(comp.addEditFormField.controls['lookupFunction'].setValue).toHaveBeenCalled();
            expect(comp.addEditFormField.controls['openLookupModal'].setValue).toHaveBeenCalled();
        });

        it('Should: set number of rows and place holder value if control type is textarea', () => {
            comp.selectedField.controlType = 'textarea';

            comp.populateFieldData();

            expect(comp.addEditFormField.controls['numRows'].setValue).toHaveBeenCalled();
            expect(comp.addEditFormField.controls['hasPlaceholderText'].setValue).toHaveBeenCalled();
            expect(comp.addEditFormField.controls['placeholderText'].setValue).toHaveBeenCalled();
        });

        it('Should: set selected default option if control type is dropdown', () => {
            comp.selectedField.controlType = 'dropdown';
            comp.selectedField.model = 'test';

            comp.populateFieldData();

            expect(comp.selectedDefaultOption).toBe('test');
        });

        it('Should: set stacked option if control type is radio and stacked', () => {
            comp.selectedField.controlType = 'radio';
            comp.selectedField.stacked = true;

            comp.populateFieldData();

            expect(comp.stacked).toBe(true);
        });

        it('Should: set file upload option if control type is fileupload', () => {
            comp.selectedField.controlType = 'fileupload';
            comp.selectedField.listClasses = ['class1', 'class2'];

            comp.populateFieldData();

            expect(comp.addEditFormField.controls['isStacked'].setValue).toHaveBeenCalled();
            expect(comp.addEditFormField.controls['isDisabled'].setValue).toHaveBeenCalled();
            expect(comp.addEditFormField.controls['isFileListShown'].setValue).toHaveBeenCalled();
            expect(comp.addEditFormField.controls['maxFileSize'].setValue).toHaveBeenCalled();
            expect(comp.addEditFormField.controls['maxUploads'].setValue).toHaveBeenCalled();
            expect(comp.addEditFormField.controls['templateId'].setValue).toHaveBeenCalled();
            expect(comp.addEditFormField.controls['baseUrl'].setValue).toHaveBeenCalled();
            expect(comp.addEditFormField.controls['acceptedFileType'].setValue).toHaveBeenCalled();
            expect(comp.addEditFormField.controls['listClasses'].setValue).toHaveBeenCalled();
        });

        it('Should: set col span option if control type is header', () => {
            comp.selectedField.controlType = 'header';
            comp.selectedField.colSpan = 1;

            comp.populateFieldData();

            expect(comp.addEditFormField.controls['colSpan'].setValue).toHaveBeenCalled();
        });

        it('Should: set source value for dynamic field', () => {
            comp.selectedField.source = {
                method: 'GET',
                serviceUrl: 'Test',
                arrayRef: '',
                valueField: 'name',
                payloadField: 'object',
                textField: 'value'
            };

            comp.populateFieldData();

            expect(comp.addEditFormField.controls['sourceType'].setValue).toHaveBeenCalled();
            expect(comp.serviceMethod).toBe('GET');
            expect(comp.serviceUrl).toBe('Test');
            expect(comp.arrayRef).toBe('');
            expect(comp.valueField).toBe('name');
            expect(comp.payloadField).toBe('object');
            expect(comp.textField).toBe('value');
        });

        it('Should: set step value for wizard form', () => {
            comp.existingForm = {
                formType: 'wizard'
            };

            comp.populateFieldData();

            expect(comp.addEditFormField.controls['step'].setValue).toHaveBeenCalled();
        });

        it('Should: set step value for accordion form', () => {
            comp.existingForm = {
                formType: 'accordion'
            };

            comp.populateFieldData();

            expect(comp.addEditFormField.controls['step'].setValue).toHaveBeenCalled();
        });

        it('Should: add validators', () => {
            comp.selectedField.formControls = [
                { validator: 'required' },
                { validator: 'minLength', value: 1 },
                { validator: 'maxLength', value: 5 },
                { validator: 'pattern', value: '' },
                { validator: 'custom', value: 'doSomething' },
            ];

            comp.populateFieldData();

            expect(comp.formControls.required).toBe(true);
            expect(comp.formControls.minLength).toBe(true);
            expect(comp.minLengthVal).toBe(1);
            expect(comp.formControls.maxLength).toBe(true);
            expect(comp.maxLengthVal).toBe(5);
            expect(comp.formControls.pattern).toBe(true);
            expect(comp.patternVal).toBe('');
            expect(comp.customVal).toBe('doSomething');
        });
    });

    describe('Func: addEditField', () => {
        beforeEach(() => {
            spyOn(comp.onSave, 'emit').and.callFake(() => {});
            spyOn(comp, 'cancelEditing').and.callFake(() => {});
        });

        it('Should: check validation before add/update field', () => {
            comp.addEditFormField = <any>{ valid: false };

            let result = comp.addEditField(false);

            expect(comp.submitted).toBe(true);
            expect(result).toBe(false);
        });

        it('Should: map options if selected source type is static', () => {
            comp.selectedSourceType = 'Static';
            comp.options = [{ key: 'test', value: 'ting' }, { key: 'missing', value: '' }];
            comp.addEditFormField = <any>{ valid: true, value: {} };

            comp.addEditField(false);

            expect(comp.onSave.emit).toHaveBeenCalledWith({
                formData: { formControls: [], options: [{ key: 'test', value: 'ting' }] }, update: false
            });
        });

        it('Should: map validators', () => {
            comp.formControls = { required: true, minLength: true, maxLength: true, pattern: true, custom: true };
            comp.minLengthVal = 1;
            comp.maxLengthVal = 5;
            comp.patternVal = 'somePattern';
            comp.customVal = 'doSomething';
            comp.addEditFormField = <any>{ valid: true, value: {} };

            comp.addEditField(false);

            expect(comp.onSave.emit).toHaveBeenCalledWith({
                formData: { formControls: [
                    { validator: 'required', value: true },
                    { validator: 'minLength', value: 1 },
                    { validator: 'maxLength', value: 5 },
                    { validator: 'pattern', value: 'somePattern' },
                    { validator: 'custom', value: 'doSomething' },
                ]}, update: false
            });
        });

        it('Should: add source information if selected source type is dynamic', () => {
            comp.addEditFormField = <any>{ valid: true, value: {} };
            comp.selectedSourceType = 'Dynamic';
            comp.serviceMethod = 'GET';
            comp.serviceUrl = 'test';
            comp.arrayRef = '';
            comp.valueField = 'name';
            comp.payloadField = 'object';
            comp.textField = 'value';

            comp.addEditField(false);

            expect(comp.onSave.emit).toHaveBeenCalledWith({
                formData: {
                    formControls: [],
                    source: {
                        method: 'GET', serviceUrl: 'test', arrayRef: '', valueField: 'name', payloadField: 'object',
                        textField: 'value'
                    } }, update: false
            });
        });

        it('Should: set type when selected control type is textbox', () => {
            comp.addEditFormField = <any>{ valid: true, value: {} };
            comp.selectedControlType = 'textbox';
            comp.selectedTextBoxType = 'email';

            comp.addEditField(false);

            expect(comp.onSave.emit).toHaveBeenCalledWith({
                formData: { type: 'email', formControls: [] }, update: false
            });
        });

        it('Should: set stacked value when selected control type is radio', () => {
            comp.addEditFormField = <any>{ valid: true, value: {} };
            comp.selectedControlType = 'radio';
            comp.stacked = true;

            comp.addEditField(false);

            expect(comp.onSave.emit).toHaveBeenCalledWith({
                formData: { stacked: true, formControls: [] }, update: false
            });
        });

        it('Should: set model value when selected control type is checkbox', () => {
            comp.addEditFormField = <any>{ valid: true, value: { model: 'true' } };
            comp.selectedControlType = 'checkbox';

            comp.addEditField(false);

            expect(comp.onSave.emit).toHaveBeenCalledWith({
                formData: { model: true, formControls: [] }, update: false
            });
        });
    });

    describe('Func: cancelEditing', () => {
        it('Should: set reset form', () => {
            comp.addEditFormField = <any>{
                reset: jasmine.createSpy('reset').and.callFake(() => {}),
                controls: {
                    sourceType: { setValue: jasmine.createSpy('setValue') },
                    onModelChange: { setValue: jasmine.createSpy('setValue') }
                }
            };

            comp.cancelEditing();

            expect(comp.submitted).toBe(false);
            expect(comp.isEditing).toBe(false);
            expect(comp.isUpdate).toBe(false);

            expect(comp.selectedField).toEqual({});
            expect(comp.options).toEqual([{ key: '1' }]);
        });
    });

    describe('Func: addNewOption', () => {
        it('Should: not add new option when no value inputted', () => {
            comp.options = [{ key: '' }];

            let result = comp.addNewOption();

            expect(result).toBe(false);
        });

        it('Should: not add new option when list of radio reach maximum allowed', () => {
            comp.options = [{ key: '1' }, { key: '2' }, { key: '3' }, { key: '4' }, { key: '5' }];
            comp.selectedControlType = 'radio';

            let result = comp.addNewOption();

            expect(result).toBe(false);
        });

        it('Should: not add new option when list of checkboxes reach maximum allowed', () => {
            comp.options = [{ key: '1' }, { key: '2' }, { key: '3' }, { key: '4' }, { key: '5' }];
            comp.selectedControlType = 'checkboxes';

            let result = comp.addNewOption();

            expect(result).toBe(false);
        });

        it('Should: add new option that automatically increase', () => {
            comp.options = [{ key: '1' }, { key: '2' }, { key: '3' }];
            comp.selectedControlType = 'checkboxes';

            comp.addNewOption();

            expect(comp.options.length).toBe(4);
            expect(comp.options[3].key).toBe('4');
        });
    });

    describe('Func: removeNewOption', () => {
        it('Should: remove selected option', () => {
            comp.options = [{ key: 'name' }];

            comp.removeNewOption(0);

            expect(comp.options.length).toBe(0);
        });
    });

    describe('Func: checkExistingKey', () => {
        it('Should: return true if current key already used', () => {
            comp.existingForm = { formBody: [{ key: '1' }] };

            let result = comp.checkExistingKey('1');

            expect(result).toBe(true);
        });
    });

    describe('Func: setupOptions', () => {
        beforeEach(() => {
            comp.sourceTypes = [];
            comp.options = [];
            comp.isEditing = false;
        });

        it('Should: set options for radio fields', () => {
            comp.selectedControlType = 'radio';

            comp.setupOptions();

            expect(comp.sourceTypes.length).toBe(2);
            expect(comp.options.length).toBe(2);
        });

        it('Should: set options for dropdown fields', () => {
            comp.selectedControlType = 'dropdown';

            comp.setupOptions();

            expect(comp.sourceTypes.length).toBe(2);
            expect(comp.options.length).toBe(1);
        });

        it('Should: set options for checkbox fields', () => {
            comp.selectedControlType = 'checkbox';
            comp.addEditFormField = <any>{ controls: {
                model: { setValue: jasmine.createSpy('model').and.callFake(() => {}) }
            } };

            comp.setupOptions();

            expect(comp.sourceTypes.length).toBe(1);
            expect(comp.options[0].key).toBe(false);
        });

        it('Should: set options for checkboxes fields', () => {
            comp.selectedControlType = 'checkboxes';
            comp.addEditFormField = <any>{ controls: {
                model: { setValue: jasmine.createSpy('model').and.callFake(() => {}) }
            } };

            comp.setupOptions();

            expect(comp.sourceTypes.length).toBe(1);
            expect(comp.options[0].key).toBe(false);
        });

        it('Should: set options for combobox fields', () => {
            comp.selectedControlType = 'combobox';

            comp.setupOptions();

            expect(comp.lookupFunction).toBe('lookupFunction');
            expect(comp.openLookupModal).toBe('openLookupModal');
        });
    });

    describe('Func: setDefaultOption', () => {
        beforeEach(() => {
            comp.addEditFormField = <any>{ controls: { model: { setValue: jasmine.createSpy('setValue') } } };
        });

        it('Should: set default model option for radio field', () => {
            let option = { key: '1' };
            comp.selectedControlType = 'radio';

            comp.setDefaultOption(option);

            expect(comp.selectedDefaultOption).toBe(option.key);
        });

        it('Should: set default model option for dropdown field', () => {
            let option = { key: '1' };
            comp.selectedControlType = 'dropdown';

            comp.setDefaultOption(option);

            expect(comp.selectedDefaultOption).toBe(option.key);
        });

        it('Should: set default model option for checkbox field', () => {
            let option = { key: '1' };
            comp.selectedControlType = 'checkbox';

            comp.setDefaultOption(option);

            expect(option.key).toBe(true);
            expect(comp.selectedDefaultOption).toBe(true);
        });
    });
});
