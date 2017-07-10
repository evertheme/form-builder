import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormFieldComponent } from './dynamic-form-field.component';

describe('DynamicFormFieldComponent', function () {
    let comp: DynamicFormFieldComponent;
    let fixture: ComponentFixture<DynamicFormFieldComponent>;

    beforeEach(() => {
        TestBed.overrideComponent(DynamicFormFieldComponent, { set: { template: '' } })
            .configureTestingModule({
                declarations: [ DynamicFormFieldComponent ]
            });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DynamicFormFieldComponent);
        comp = fixture.componentInstance;
    });

    describe('Func: getIsLabel', () => {
        it('Should: return false if field is checkbox', () => {
            let result = comp.getIsLabel('checkbox');

            expect(result).toBe(false);
        });

        it('Should: return false if field is header', () => {
            let result = comp.getIsLabel('header');

            expect(result).toBe(false);
        });

        it('Should: return false if field is hidden', () => {
            comp.showHidden = false;

            let result = comp.getIsLabel('radio', true);

            expect(result).toBe(false);
        });

        it('Should: return true if field is hidden but shown manually', () => {
            comp.showHidden = true;

            let result = comp.getIsLabel('radio', true);

            expect(result).toBe(true);
        });
    });

    describe('Func: isRequired', () => {
        it('Should: return true if field is required', () => {
            comp.field = <any>{ formControls: [{ validator: 'required' }] };

            let result = comp.isRequired();

            expect(result).toBe(true);
        });

        it('Should: return false if field is not required', () => {
            comp.field = <any>{ formControls: [] };

            let result = comp.isRequired();

            expect(result).toBe(false);
        });
    });
});
