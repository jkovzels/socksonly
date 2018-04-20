import * as React from "react";

export interface LandingProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class LandingView extends React.Component<{}, {}> {
    render() {
        return <div>
        <div className="first-view cover">
            <div className="bold-move-step1">
                <h1>Socks</h1>; 
            </div>
        </div>
        <div className="bold-move-step2">
            <h1>Only</h1>
        </div>
        </div>;
    }
}