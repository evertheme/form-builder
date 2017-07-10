export class SnapMocks {
    broadcastService = <any>{
        on: jasmine.createSpy('on').and.returnValue({ subscribe: () => {} }),
        broadcast: jasmine.createSpy('broadcast').and.callFake(() => {})
    };

    formErrorsService = <any>{
        addValue: jasmine.createSpy('addValue').and.callFake(() => {})
    };

    snapLightboxService = <any>{
        open: jasmine.createSpy('open').and.callFake(() => {})
    };
}
