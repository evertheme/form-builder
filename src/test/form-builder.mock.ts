export class FormBuilderMocks {
    dynamicForms: any = {};
    updatedForms: any = {};

    fieldControlService = <any>{
        generateCallbacks: jasmine.createSpy('generateCallbacks').and.callFake(() => {}),
        toFormGroup: jasmine.createSpy('toFormGroup').and.callFake(() => {})
    };

    formService = <any>{
        getDynamicFormById: jasmine.createSpy('getDynamicFormById').and.returnValue(Promise.resolve(this.dynamicForms)),
        updateExistingForm: jasmine.createSpy('updateExistingForm').and.returnValue(Promise.resolve(this.updatedForms))
    };

    routerService = <any>{
        navigate: jasmine.createSpy('navigate').and.callFake(() => {})
    };
}
