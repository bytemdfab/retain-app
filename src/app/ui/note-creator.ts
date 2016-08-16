import {Component, Output, EventEmitter} from "@angular/core";
import { ColorPicker } from './color-picker';

@Component({
    selector: 'note-creator',
    directives: [
        ColorPicker
    ],
    styles: [`
.note-creator {
    padding: 20px;
    background-color: white;
    border-radius: 3px;
}
.title {
    font-weight: bold;
    color: rgba(0,0,0,0.8);
}
.full {
    height: 100px;
}`],
    template: `<div class="note-creator shadow" [ngStyle]="{'background-color': newNote.color}">

    <form class="row" (submit)="onCreateNote()" >
        <input 
                type="text"
                [(ngModel)]="newNote.title"
                name="newNoteTitle"
                placeholder="Title"
                class="col-xs-10 title"
                *ngIf="fullForm"
        >

        <input 
                type="text"
                (focus)="toggle(true)"
                [(ngModel)]="newNote.value"
                name="newNoteValue"
                placeholder="Take a note ..."
                class="col-xs-10"
        >
        
        <div class="actions col-xs-12 row between-xs">
            <div class="col-xs-3">
                <color-picker 
                        [colors]="colors"
                        (selected)="onColorSelect($event)"
                >
                </color-picker>
            </div>
        
            <button
                    type="submit"
                    class="btn-light"
                    *ngIf="fullForm"
            >
                Done
            </button>
        </div>
    </form>
</div>
`
})
export class NoteCreator {

    @Output() createNote = new EventEmitter();

    newNote = {
        title: '',
        value: '',
        color: 'white'
    };

    colors: Array<string> = ['#b19cd9', '#ff9691', '#77dd77', '#aec6cf', '#f49ac2', 'white'];

    fullForm: boolean = false;

    reset() {
        this.newNote = {
            title: '',
            value: '',
            color: 'white'
        };
    }

    onCreateNote() {
        const {title, value, color} = this.newNote;

        if (title && value) {
            this.createNote.next({title, value, color});
            this.reset();
        }
    }

    onColorSelect(color) {
        this.newNote.color = color;
    }

    toggle(value: boolean) {
        this.fullForm = value;
    }

}
