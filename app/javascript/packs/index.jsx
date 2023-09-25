// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client';
//import App from "../components/App"
import PropTypes from 'prop-types'
//import Suggestions from "../components/Suggestions";
import Suggestions from "../components/SuggestionHome";


const container = document.getElementById("root");
console.log(container)
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Suggestions />);

/*document.addEventListener("DOMContentLoaded", () => {
  render(<App />, document.body.appendChild(document.createElement("div")));
  console.log('hello');
});*/
