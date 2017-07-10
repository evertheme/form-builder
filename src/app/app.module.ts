import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SnapModule } from 'snap/src/snap/snap.module';
import { FormErrorsService } from 'snap/src/snap/forms/form-errors/form-errors.service';
import { SnapLightboxService } from 'snap/src/snap/page-layout/light-box/snap-light-box.service';
import { SnapMessageService } from 'snap/src/snap/feedback/messaging/message.service';
import { BroadcastService } from 'snap/src/snap/feedback/spinner/broadcaster.service';
import { SnapSpinnerService } from 'snap/src/snap/feedback/spinner/snap-spinner.service';

import { AppComponent }  from './app.component';
import { FieldControlService } from './services/field-control.service';
import { FieldService } from './services/field.service';
import { FormBuilderComponent } from './components/builder/form-builder.component';
import { FormListComponent } from './components/list/form-list.component';
import { FormService } from './services/form.service';
import { PositionPipe } from './pipes/position.pipe';
import { AddNewFormComponent } from './components/list/add-new-form.component';
import { EditExistingFormComponent } from './components/list/edit-existing-form.component';
import { PreviewFormComponent } from './components/preview/preview-form.component';
import { FormBuilderModule } from './components/builder/form-builder.module';
import { FormListModule } from './components/list/form-list.module';
import { PreviewFormModule } from './components/preview/preview-form.module';
import { AppConfig } from './app.config';
import { FormBuilderCoreModule } from './components/core/form-builder-core.component';

const routes = [
    { path: 'form-builder/:id', component: FormBuilderComponent },
    { path: 'form-list', component: FormListComponent },
    { path: 'form-list/add-new', component: AddNewFormComponent },
    { path: 'form-list/:id', component: EditExistingFormComponent },
    { path: 'form-list/:id/preview', component: PreviewFormComponent },
    { path: '', redirectTo: '/form-list', pathMatch: 'full' }
];

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        SnapModule,
        RouterModule.forRoot(routes),
        FormBuilderCoreModule,
        FormBuilderModule,
        FormListModule,
        PreviewFormModule
    ],
    declarations: [
        AppComponent,
        FormBuilderComponent,
        PositionPipe
    ],
    providers: [
        AppConfig,
        BroadcastService,
        FormErrorsService,
        FormService,
        FieldControlService,
        FieldService,
        SnapMessageService,
        SnapLightboxService,
        SnapSpinnerService
    ],
    bootstrap: [ AppComponent ],
    exports: [ PreviewFormModule ]
})
export class AppModule { }
