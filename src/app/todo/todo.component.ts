
 import { Component } from '@angular/core';
 import { Task } from '../task/task';
 import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
 import { MatDialog } from '@angular/material/dialog';
 import { TaskDialogResult, TaskDialogComponent } from '../task-dialog/task-dialog.component';
 import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
 import { BehaviorSubject } from 'rxjs';
 
 const getObservable = (collection: AngularFirestoreCollection<Task>) => {
   const subject = new BehaviorSubject<Task[]>([]);
   collection.valueChanges({ idField: 'id' }).subscribe((val: Task[]) => {
     subject.next(val);
   });
   return subject;
 };
 
 @Component({
   selector: 'app-todo',
   templateUrl: './todo.component.html',
   styleUrls: ['./todo.component.css'],
 })
 export class TodoComponent {
   todo = getObservable(this.store.collection('todo'));
   inProgress = getObservable(this.store.collection('inProgress'));
   done = getObservable(this.store.collection('done'));
 
   constructor(private dialog: MatDialog, private store: AngularFirestore) {}
 
   newTask(): void {
     const dialogRef = this.dialog.open(TaskDialogComponent, {
       width: '270px',
       data: {
         task: {},
       },
     });
     dialogRef
       .afterClosed()
       .subscribe((result: TaskDialogResult) => {
         if (!result) {
           return;
         }
         this.store.collection('todo').add(result.task);
       });
   }
 
   editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
     const dialogRef = this.dialog.open(TaskDialogComponent, {
       width: '270px',
       data: {
         task,
         enableDelete: true,
       },
     });
     dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
       if (!result) {
         return;
       }
       if (result.delete) {
         this.store.collection(list).doc(task.id).delete();
       } else {
         this.store.collection(list).doc(task.id).update(task);
       }
     });
   }
 
   drop(event: CdkDragDrop<Task[]|null>): void {
     if (event.previousContainer === event.container) {
       return;
     }
     if (!event.previousContainer.data || !event.container.data) {
       return;
     }
     const item = event.previousContainer.data[event.previousIndex];
     this.store.firestore.runTransaction(() => {
       const promise = Promise.all([
         this.store.collection(event.previousContainer.id).doc(item.id).delete(),
         this.store.collection(event.container.id).add(item),
       ]);
       return promise;
     });
     transferArrayItem(
       event.previousContainer.data,
       event.container.data,
       event.previousIndex,
       event.currentIndex
     );
   }
 }