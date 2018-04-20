import * as React from "react";
import { SubscriptionFormView } from "./SubscriptionFormView";

export class LandingView extends React.Component<{}, {}> {
    render() {
        return <div>
            <div className="container-fluid first-view cover">
                <div className=" row">
                    <div className="bold-move-step1 col-sm">
                        <h1>Socks</h1>
                    </div>
                </div>
            </div>
            <div className="container-fluid bold-move-step2">
                <div className="row">
                    <div className="col-sm-7"><h1>Only</h1></div>
                    <div className="col-sm-5">
                        <h2>Is coming together&nbsp;at terrifying speed</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-7">
                        <h3>
                            Get notification and stand with us when we start pushing socks on all colors, sorts, and sizes all over the world
                    </h3>
                    </div>
                    <div className="col-sm-5">
                        <SubscriptionFormView />
                    </div>
                </div>
            </div>
        </div>;
    }
}