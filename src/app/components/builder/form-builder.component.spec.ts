import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { BroadcastService } from 'snap/src/snap/feedback/spinner/broadcaster.service';
import { SnapLightboxService } from 'snap/src/snap/page-layout/light-box/snap-light-box.service';

import { FieldControlService } from '../../services/field-control.service';
import { FormBuilderComponent } from './form-builder.component';
import { FormService } from '../../services/form.service';
import { FormBuilderMocks } from '../../../test/form-builder.mock';
import { SnapMocks } from '../../../test/snap.mock';

let formBuilderMocks = new FormBuilderMocks();
let snapMocks = new SnapMocks();

let activatedRoute = { snapshot: { params: { id: '1' } } };
let broadcastService = snapMocks.broadcastService;
let fieldControlService = formBuilderMocks.fieldControlService;
let formService = formBuilderMocks.formService;
let routerService = formBuilderMocks.routerService;
let snapLightboxService = snapMocks.snapLightboxService;

describe('FormBuilderComponent', function () {
    let comp: FormBuilderComponent;
    let fixture: ComponentFixture<FormBuilderComponent>;

    beforeEach(() => {
        TestBed.overrideComponent(FormBuilderComponent, { set: { template: '' } })
            .configureTestingModule({
                declarations: [ FormBuilderComponent ],
                providers: [
                    { provide: ActivatedRoute, useValue: activatedRoute },
                    { provide: BroadcastService, useValue: broadcastService },
                    { provide: FieldControlService, useValue: fieldControlService },
                    { provide: FormService, useValue: formService },
                    { provide: Router, useValue: routerService },
                    { provide: SnapLightboxService, useValue: snapLightboxService }
                ]
            });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FormBuilderComponent);
        comp = fixture.componentInstance;
    });

    describe('Func: ngOnInit', () => {
        beforeEach(() => {
            comp.ngOnInit();
        });

        it('Should: set form id', () => {
            expect(comp.formId).toBe('1');
        });

        it('Should: get dynamic form by id', () => {
            expect(formService.getDynamicFormById).toHaveBeenCalled();
        });
    });

    describe('Func: save', () => {
        it('Should: update existing form', () => {
            let qs = { controlType: 'textbox', key: '1' };
            comp.existingForm = { formBody: [{ key: '1' }] };

            comp.save(qs, true);

            expect(formService.updateExistingForm).toHaveBeenCalled();
        });

        it('Should: add field to existing form', () => {
            let qs = { controlType: 'textbox', key: '1' };
            comp.existingForm = { formBody: [{ key: '1' }] };

            comp.save(qs, false);

            expect(formService.updateExistingForm).toHaveBeenCalled();
        });
    });

    describe('Func: goToPreview', () => {
        it('Should: open preview form modal', () => {
            comp.goToPreview();

            expect(snapLightboxService.open).toHaveBeenCalledWith('preview-form-modal');
        });
    });

    describe('Func: openConfirmation', () => {
        it('Should: open preview form modal', () => {
            comp.openConfirmation({});

            expect(comp.selectedField).toEqual({});
            expect(snapLightboxService.open).toHaveBeenCalledWith('removeFieldConfirmation');
        });
    });

    describe('Func: deleteField', () => {
        it('Should: update existing form', () => {
            comp.selectedField = { key: '1' };
            comp.existingForm = { formBody: [{ key: '1' }, { key: '2' }] };

            comp.deleteField();

            expect(formService.updateExistingForm).toHaveBeenCalled();
        });
    });

    describe('Func: editField', () => {
        it('Should: broadcast event', () => {
            comp.editField({});

            expect(broadcastService.broadcast).toHaveBeenCalled();
        });
    });

    describe('Func: reOrderField', () => {
        it('Should: update existing form', () => {
            comp.existingForm = { formName: '' };

            comp.reOrderField();

            expect(formService.updateExistingForm).toHaveBeenCalled();
        });
    });
});
