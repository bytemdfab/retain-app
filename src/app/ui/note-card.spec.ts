import { inject, async } from '@angular/core/testing';
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { NoteCard } from './note-card';

@Component({
    selector: 'note-card-test',
    directives: [
        NoteCard
    ],
    template: `
    <note-card [note]="note"></note-card>
    `

})
export class TestComponent {
    note = {
        value: 'note',
        title: 'title',
        color: 'red',
        id: 1
    }
}

describe('NoteCard', () => {
    let builder: TestComponentBuilder;

    beforeEach(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        builder = tcb;
    }));

    it('should have correct title', async(() => {
        builder.createAsync(TestComponent)
        .then((fixture: ComponentFixture<TestComponent>) => {
            const title = fixture.nativeElement.querySelector('.title');
            fixture.detectChanges();

            expect(title.textContent.trim()).toEqual('title');
        })
    }));

    it('should toggle checkmark', async(() => {
        builder.createAsync(TestComponent)
        .then((fixture: ComponentFixture<TestComponent>) => {
            
            const noteCard = fixture.nativeElement.querySelector('.note-card');
            fixture.detectChanges();

            const eventObject = document.createEvent('MouseEvents');
            eventObject.initEvent('mouseenter', true, false);
            noteCard.dispatchEvent(eventObject);
            fixture.detectChanges();

            let check = noteCard.querySelector('.icon');

            expect(check).toBeTruthy();

            eventObject.initEvent('mouseleave', true, false);
            noteCard.dispatchEvent(eventObject);
            fixture.detectChanges();

            check = noteCard.querySelector('.icon');

            expect(check).toBeNull();

        })
    }));

})