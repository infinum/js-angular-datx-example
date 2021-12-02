import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatxModule } from '@datx/jsonapi-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppCollection } from './collections/app.collection';
import { ArtistsModule } from './components/artists/artists.module';
import { APP_COLLECTION } from './injection-tokens';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		DatxModule.forRoot({
			baseUrl: 'http://localhost:3000/',
		}),
		ArtistsModule,
	],
	providers: [
		{
			provide: APP_COLLECTION,
			useValue: new AppCollection(),
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
