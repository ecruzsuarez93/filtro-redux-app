import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../todo/todo.model';
import * as fromFiltros from './filter.action';

@Pipe({
  name: 'filterTodo'
})
export class FilterPipe implements PipeTransform {

  transform(todos: Todo[] , filtro?: fromFiltros.filtrosValidos): Todo[] {
    
    switch(filtro){
      case 'completados':
        return todos.filter(todo => todo.completado);
      case 'pendientes':
         return todos.filter(todo => !todo.completado);
      default :
      return todos;
      
    }
  }

}
