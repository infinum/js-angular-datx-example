import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppCollection } from './collections/app.collection';
import { ArtistsModule } from './components/artists/artists.module';
import { initDatx } from './helpers/init-datx/init-datx.helper';
import { APP_COLLECTION } from './injection-tokens';
import { CustomFetchService } from './services/custom-feetch/custom-fetch.service';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, AppRoutingModule, HttpClientModule, ArtistsModule],
	providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: initDatx,
			multi: true,
			deps: [CustomFetchService],
		},
		{
			provide: APP_COLLECTION,
			useValue: new AppCollection(),
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
