import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './react/App';

export class ReactMain {

    private target: HTMLElement | null;

    constructor() {
        this.target = document.getElementById('app-root');

        if ((module as any).hot) {
            (module as any).hot.accept('./ReactMain', () => {
                this.render();
            });
        }

        this.render();
    }

    private render(): void {
        ReactDOM.render(
            <App />,
            this.target,
        );
    }
}