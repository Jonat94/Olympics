import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerLocaleData } from '@angular/common';
import localFr from '@angular/common/locales/fr';
import { AppModule } from './app/app.module';
registerLocaleData(localFr, 'fr');

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
