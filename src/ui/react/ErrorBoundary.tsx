import * as React from 'react';

interface IState {
    error?: Error;
    errorInfo?: React.ErrorInfo;
}

export default class ErrorBoundary extends React.Component<any, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            error: undefined,
            errorInfo: undefined
        };
    }

    public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        this.setState({ error, errorInfo });
        console.error(error, errorInfo);
    }

    public render(): React.ReactNode {
        if (this.state.error) {
            return <div className='scene scene-error'>
                <h1>Something went wrong.</h1>
                <p>{this.state.error.toString()}</p>
                <pre className='error-object'>{JSON.stringify(this.state.errorInfo)}</pre>
            </div>;
        }
        return this.props.children;
    }
}