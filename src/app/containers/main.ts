import { Component } from '@angular/core';
import { AppBar } from '../ui';

@Component({
	selector: 'main-container',
    directives: [
        AppBar
    ],
	template: `
<div>
    <app-bar></app-bar>
    <main class="main">
        Content goes here
    </main>
</div>
	`
})
export class Main {
	
}