import {Component} from "@angular/core";
import {NoteCard, NoteCreator} from "../ui";

@Component({
    selector: 'notes-container',
    directives: [
        NoteCard,
        NoteCreator
    ],
    styles: [`
.notes {
  padding-top: 50px;
}
.creator {
  margin-bottom: 40px; 
}`],
    template: `
<div class="row center-xs notes">
    <div class="col-xs-6 creator">
        <note-creator (createNote)="onNoteCreated($event)">
        </note-creator>
    </div>
    <div class="notes col-xs-8">
        <div class="row between-xs">
            <note-card 
                class="col-xs-4"
                [note]="note"
                (checked)="onNoteChecked($event, i)"
                *ngFor="let note of notes; let i = index"
            >
            
</note-card>
        </div>
    </div>
</div>`
})
export class Notes {
    notes = [
        {title: 'new note', value: 'note text goes here', color: 'seagreen'},
        {title: 'Clean UP!', value: 'Don\'t forget to clean the room', color: 'lightblue'},
        {title: 'Chores', value: 'Clean your workspace', color: 'lightblue'}
        ];

    onNoteChecked(note, i) {
        this.notes.splice(i, 1);
    }

    onNoteCreated(note) {
        this.notes.push(note);
    }
}