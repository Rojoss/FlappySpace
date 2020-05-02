import * as React from 'react';

interface IProps {
    name: string;
}

export default class Screen extends React.Component<IProps, any> {
    public render(): React.ReactNode {
        return <div className={`screen screen--${this.props.name}`}>
            <div className='screen-content'>
                {this.props.children}
            </div>
        </div>;
    }
}