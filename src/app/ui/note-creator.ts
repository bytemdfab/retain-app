import {Component} from "@angular/core";

@Component({
    selector: 'note-creator',
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
    template: `<div class="note-creator shadow">
<pre>{{ newNote | json }}</pre>
    <form class="row">
        <input 
                type="text"
                [ngModel]="newNote.title"
                (ngModelChange)="newNote.title = $event"
                name="newNoteTitle"
                placeholder="Title"
                class="col-xs-10 title"
        >

        <input 
                type="text"
                [ngModel]="newNote.value"
                (ngModelChange)="newNote.value = $event"
                name="newNoteValue"
                placeholder="Take a note ..."
                class="col-xs-10"
        >
        
        <div class="actions col-xs-12 row between-xs">
            <button
                    type="submit"
                    class="btn-light"
            >
                Done
            </button>
        </div>
    </form>
</div>
`
})
export class NoteCreator {
    newNote = {
        title: '',
        value: ''
    }
}
