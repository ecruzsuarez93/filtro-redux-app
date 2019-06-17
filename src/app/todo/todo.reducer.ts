import * as fromTodoActions from "./todo.actions";
import { Todo } from "./todo.model";

const todo1 = new Todo("Vencer Thanos");
const todo2 = new Todo("Salvar el mundo");
const todo3 = new Todo("pedir prestado el traje de Iron Man");

todo2.completado = true;
const estadoInicial: Todo[] = [todo1, todo2, todo3];

export function todoReducer(
  state = estadoInicial,
  action: fromTodoActions.Acciones
): Todo[] {
  switch (action.type) {
    case fromTodoActions.AGREGAR_TODO:
      const todo = new Todo(action.texto);
      return [...state, todo];
    case fromTodoActions.TOGGLE_TODO:
      return state.map(todoEdit => {
        if (todoEdit.id === action.id) {
          return { ...todoEdit, completado: !todoEdit.completado };
        } else {
          return todoEdit;
        }
      });
    case fromTodoActions.TOGGLE_ALL_TODO:
      return state.map(todoEdit => {
        return { ...todoEdit, completado: action.completado };
      });
    case fromTodoActions.EDITAR_TODO:
      return state.map(todoEdit => {
        if (todoEdit.id === action.id) {
          return {
            ...todoEdit,
            texto: action.texto.charAt(0).toUpperCase() + action.texto.slice(1)
          };
        } else {
          return todoEdit;
        }
      });
    case fromTodoActions.BORRAR_TODO:
      return state.filter(todoEdit => todoEdit.id !== action.id);
    case fromTodoActions.BORRAR_COMPLETADOS_TODO:
      return state.filter(todoEdit => !todoEdit.completado);
    default:
      return state;
  }
}
