import { Injectable } from '@angular/core';

@Injectable()
export class AppConfig {
    public env = 'dev';

    public envConfig = {
        dev: {
            appUrl: 'http://usmlrs1296.arrow.com:8080'
        }
    };

    get appURL(): string { return this.envConfig[this.env].appUrl; }
}
