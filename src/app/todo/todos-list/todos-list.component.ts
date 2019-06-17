import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Todo } from '../todo.model';
import { filtrosValidos } from '../../filter/filter.action';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styles: []
})
export class TodosListComponent implements OnInit {
   listTodo: Todo[] = [];
   filtro:filtrosValidos;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.subscribe(state => {
       this.listTodo = state.todos;
       this.filtro = state.filtro;
    });
  }

}
