import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DragulaService } from 'ng2-dragula';

import { DynamicFormLayoutComponent } from './dynamic-form-layout.component';

describe('DynamicFormLayoutComponent', function () {
    let comp: DynamicFormLayoutComponent;
    let fixture: ComponentFixture<DynamicFormLayoutComponent>;

    beforeEach(() => {
        TestBed.overrideComponent(DynamicFormLayoutComponent, { set: { template: '' } })
            .configureTestingModule({
                declarations: [ DynamicFormLayoutComponent ],
                providers: [
                    DragulaService
                ]
            });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DynamicFormLayoutComponent);
        comp = fixture.componentInstance;
    });

    describe('Func: ngOnInit', () => {
        it('Should: add listener when drag and drop field', () => {
            comp.fields = [{ key: '1' }, { key: '2' }];
            spyOn(comp.onReOrderField, 'emit').and.callFake(() => {});

            comp.ngOnInit();

            comp.dragulaService.drop.emit();

            expect(comp.onReOrderField.emit).toHaveBeenCalled();
        });
    });

    describe('Func: removeField', () => {
        it('Should: call on delete field callback', () => {
            spyOn(comp.onDeleteField, 'emit').and.callFake(() => {});

            comp.removeField({});

            expect(comp.onDeleteField.emit).toHaveBeenCalled();
        });
    });

    describe('Func: editField', () => {
        beforeEach(() => {
            spyOn(comp.onEditField, 'emit').and.callFake(() => {});

            comp.editField({});
        });

        it('Should: set edited field', () => {
            expect(comp.editedField).toEqual({});
        });

        it('Should: call on edit field callback', () => {
            expect(comp.onEditField.emit).toHaveBeenCalled();
        });
    });
});
