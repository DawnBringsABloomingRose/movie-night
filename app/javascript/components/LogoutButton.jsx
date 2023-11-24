import React from "react";
import { Button } from "antd";

class LogoutButton extends React.Component {
    render() {
        const authToken = document.head.querySelector("meta[name=csrf-token]")?.content
        return(<>
        <form method="post" action="/users/sign_out">
        <input type="hidden" name="_method" value="delete" autocomplete="off" />
        <Button htmlType="submit">Logout</Button>
        <input type="hidden" name="authenticity_token" value={authToken} autocomplete="off" />
        </form>
        </>)
    }
};

export default LogoutButton;