import {Component} from "@angular/core";
import {NoteCard, NoteCreator} from "../ui";
import { NoteService } from '../services';

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
    notes = [];

    constructor(private noteService: NoteService) {
        this.noteService.getNotes()
            .subscribe(response => this.notes = response.data);
    }

    onNoteChecked(note, i) {
        this.noteService.completeNote(note)
            .subscribe(note => {
                const i = this.notes.findIndex(localNote => localNote.id === note.id);
                this.notes.splice(i, 1);
            });
    }

    onNoteCreated(note) {
        this.noteService.createNote(note)
            .subscribe(response => this.notes.push(response));
    }
}