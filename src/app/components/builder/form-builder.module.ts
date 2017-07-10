import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SnapModule } from 'snap/src/snap/snap.module';

import { AddEditFormFieldsComponent } from './add-edit-form-fields.component';
import { FormBuilderCoreModule } from '../core/form-builder-core.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SnapModule,
        FormBuilderCoreModule
    ],
    declarations: [
        AddEditFormFieldsComponent
    ],
    exports: [
        AddEditFormFieldsComponent
    ],
    providers: []
})
export class FormBuilderModule { }
