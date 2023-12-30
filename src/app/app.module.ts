import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDLwWRfzS3W48KWEZX6QMXarDUOt-UlLj4",
  authDomain: "tutorial-a8db2.firebaseapp.com",
  projectId: "tutorial-a8db2",
  storageBucket: "tutorial-a8db2.appspot.com",
  messagingSenderId: "546121755095",
  appId: "1:546121755095:web:0fc8623ab118d156508392",
  measurementId: "G-E7W0TMPL86"
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    provideFirestore(() => getFirestore()),
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,

    // initialize angularfire with credentials from the dashboard
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    // Import the AngularFireDatabaseModule to use database
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
