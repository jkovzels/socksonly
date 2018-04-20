import * as React from "react";
import * as ReactDom from "react-dom";

export class SubscriptionFormView extends React.Component<{}, {}> {
    render() {
        var trapStyle = {
            position: 'absolute',
            left: '-5000px'
        } as React.CSSProperties;
        return <form
            action="https://sockson.us17.list-manage.com/subscribe/post?u=ba52caf8b1fd6f20f4dc582f0&amp;id=8591b179f4"
            method="post" id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form" className="subscription-form">
            <label htmlFor="mce-EMAIL">Email Address </label>
            <br />
            <input type="email" name="EMAIL" id="mce-EMAIL" />
            <div style={trapStyle} aria-hidden="true">
                <input type="text" name="b_ba52caf8b1fd6f20f4dc582f0_8591b179f4" tabIndex={-1} />
            </div>

            <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" />
        </form>;
    }
}