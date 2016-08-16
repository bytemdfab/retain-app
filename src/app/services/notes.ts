import {ApiService} from './api';
import {Injectable} from "@angular/core";

@Injectable()
export class NoteService {

    path: string = '/notes';

    constructor(private apiService: ApiService) {}

    createNote(note){
        return this.apiService.post(this.path, note);
    }

    getNotes() {
        return this.apiService.get(this.path);
    }

    completeNote(note) {
        return this.apiService.delete(`${this.path}/${note.id}`);
    }
}