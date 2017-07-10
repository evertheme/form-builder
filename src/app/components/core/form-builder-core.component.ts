import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { SnapModule } from 'snap/src/snap/snap.module';

import { DynamicFormFieldComponent } from './dynamic-form-field.component';
import { DynamicFormLayoutComponent } from './dynamic-form-layout.component';
import { DynamicFormLayoutViewComponent } from './dynamic-form-layout-view.component';

@NgModule({
    imports: [
        CommonModule,
        DragulaModule,
        FormsModule,
        ReactiveFormsModule,
        SnapModule
    ],
    declarations: [
        DynamicFormFieldComponent,
        DynamicFormLayoutComponent,
        DynamicFormLayoutViewComponent
    ],
    exports: [
        DynamicFormFieldComponent,
        DynamicFormLayoutComponent,
        DynamicFormLayoutViewComponent
    ],
    providers: []
})
export class FormBuilderCoreModule { }
