import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SnapModule } from 'snap/src/snap/snap.module';

import { LOVLookupComponent } from './lov-lookup.component';
import { PreviewFormComponent } from './preview-form.component';
import { FormBuilderModule } from '../builder/form-builder.module';
import { FormBuilderCoreModule } from '../core/form-builder-core.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FormBuilderModule,
        ReactiveFormsModule,
        SnapModule,
        FormBuilderCoreModule
    ],
    declarations: [
        LOVLookupComponent,
        PreviewFormComponent
    ],
    exports: [
        LOVLookupComponent,
        PreviewFormComponent
    ],
    providers: []
})
export class PreviewFormModule { }
