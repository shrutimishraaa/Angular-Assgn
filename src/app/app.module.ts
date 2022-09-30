
 import { BrowserModule } from '@angular/platform-browser';
 import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { NgModule } from '@angular/core';
 import { AppComponent } from './app.component';
 import { MatToolbarModule } from '@angular/material/toolbar';
 import { MatIconModule } from '@angular/material/icon';
 import { TaskComponent } from './task/task.component';
 import { MatCardModule } from '@angular/material/card';
 import { DragDropModule } from '@angular/cdk/drag-drop';
 import { MatButtonModule } from '@angular/material/button';
 import { MatDialogModule } from '@angular/material/dialog';
 import { TaskDialogComponent } from './task-dialog/task-dialog.component';
 import { MatInputModule } from '@angular/material/input';
 import { FormsModule } from '@angular/forms';
 import { environment } from 'src/environments/environment';
 import { AngularFireModule } from '@angular/fire/compat';
 import { FirestoreModule } from '@angular/fire/firestore';
import { LoginComponent } from './login/login.component';
import { SignUpComponent} from './signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
// import { HotToastModule } from '@ngneat/hot-toast';
import {HotToastModule} from '@ngneat/hot-toast';
import { MatMenuModule } from '@angular/material/menu';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { TodoComponent } from './todo/todo.component';







 @NgModule({
   declarations: [AppComponent, TaskComponent, TaskDialogComponent, LoginComponent, SignUpComponent, TodoComponent],
   imports: [
     BrowserModule,
     MatToolbarModule,
     MatIconModule,
     MatCardModule,
     DragDropModule,
     MatButtonModule,
     MatDialogModule,
     MatInputModule,
     FormsModule,
     AngularFireModule.initializeApp(environment.firebase),
     FirestoreModule,
     AngularFireModule ,
     BrowserAnimationsModule,
     ReactiveFormsModule,
     MatFormFieldModule,
     provideFirebaseApp(() => initializeApp(environment.firebase)),
     provideAuth(() => getAuth()),
     provideFirestore(() => getFirestore()),
     provideStorage(() => getStorage()),
     HotToastModule.forRoot(),
     MatMenuModule,
     AppRoutingModule,
   ],
   providers: [],
   bootstrap: [AppComponent],
 })
 export class AppModule {}