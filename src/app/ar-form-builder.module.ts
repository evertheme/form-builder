import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FieldControlService } from './services/field-control.service';
import { FieldService } from './services/field.service';
import { FormService } from './services/form.service';
import { PositionPipe } from './pipes/position.pipe';
import { FormBuilderCoreModule } from './components/core/form-builder-core.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        PositionPipe
    ],
    exports: [
        FormBuilderCoreModule
    ]
})
export class ArFormBuilderModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ArFormBuilderModule,
            providers: [ FormService, FieldControlService, FieldService ]
        };
    }
}
