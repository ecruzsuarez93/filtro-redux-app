import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as fromTodoAction from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('txtInputFisico', {static: false}) txtInputFisico: ElementRef;
  checkField: FormControl;
  txtInput: FormControl;
  editando: boolean;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.checkField = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);

    this.checkField.valueChanges.subscribe( () => { const accion = new fromTodoAction.ToggleTodoAction(this.todo.id);
                                                    this.store.dispatch(accion); });
  }

  editar() {
    this.editando = true;

    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);
  }
  terminarEdicion() {
    this.editando = false;

    if(this.txtInput.invalid)
      {
        this.txtInput.setValue(this.todo.texto);
        return;
      }

    if(this.todo.texto===this.txtInput.value)
       return;

    const accion = new fromTodoAction.EditarTodoAction(this.todo.id, this.txtInput.value);
    this.store.dispatch(accion);
  }

  borrarTodo(){
    const accion = new fromTodoAction.BorrarTodoAction(this.todo.id);

    this.store.dispatch(accion);
  }

}
