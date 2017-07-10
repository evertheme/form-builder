import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SnapModule } from 'snap/src/snap/snap.module';

import { AddNewFormComponent } from './add-new-form.component';
import { EditExistingFormComponent } from './edit-existing-form.component';
import { FormListComponent } from './form-list.component';
import { PreviewFormModule } from '../preview/preview-form.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SnapModule,
        PreviewFormModule
    ],
    declarations: [
        AddNewFormComponent,
        EditExistingFormComponent,
        FormListComponent
    ],
    exports: [
        AddNewFormComponent,
        EditExistingFormComponent,
        FormListComponent
    ],
    providers: []
})
export class FormListModule { }
