import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './shared/modules/app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
