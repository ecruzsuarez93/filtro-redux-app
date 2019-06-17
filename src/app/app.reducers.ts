import { Todo } from './todo/todo.model';
import { ActionReducerMap } from '@ngrx/store';
import * as fromTodo from './todo/todo.reducer';
import * as fromFiltro  from './filter/filter.reducer';
import * as fromFiltrosValidos from './filter/filter.action';



export interface AppState{
    todos: Todo[];
    filtro: fromFiltrosValidos.filtrosValidos;
}


export const appReducer: ActionReducerMap<AppState> = {
   todos: fromTodo.todoReducer,
   filtro: fromFiltro.filtroReducer
};
