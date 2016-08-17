import {Component} from "@angular/core";
import {NoteCard, NoteCreator} from "../ui";
import { NoteService } from '../services';
import {Store} from '../store';
import 'rxjs/Rx';

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

    constructor(
        private noteService: NoteService,
        private store: Store
    ) {

        // first - define a subscription to State.notes changes
        this.store.changes.pluck('notes')
            .subscribe((notes: any) => this.notes = notes);

        // then get notes from api
        // and noteService updates the Store
        // which triggers the subscription we've defined earlier
        // empty subscribe() required, because Observable is **lazy**
        this.noteService.getNotes()
            .subscribe();
    }

    onNoteChecked(note, i) {
        this.noteService.completeNote(note)
            .subscribe();
    }

    onNoteCreated(note) {
        this.noteService.createNote(note)
            .subscribe();
    }
}