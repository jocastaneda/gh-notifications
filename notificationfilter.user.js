// ==UserScript==
// @name        GitHub notification filter
// @namespace   https://blog.josemcastaneda.com
// @version     0.1.0
// @description Shows a small UI that toggles GitHub issue notifications.
// @author      Jose Castaneda
// @match       https://github.com/notifications
// ==/UserScript==
//

(function() {
  'use strict';
  // get all the groups. The groups are repo based notifications.
  const boxedGroup = document.querySelectorAll(".boxed-group");

  // bail since there is nothing to show.
  if(!boxedGroup) {
      return;
  }

  // Let's create our event handler for later use.
  const handleClick = ({target}) => {
  	// instantiate a selector.
  	let selector = '';
    if (target.id.includes('issue')) {
      selector = `.${target.id.substring(7, 12)}-notification`;
    } else {
      selector = `.${target.id.substring(7, 19)}-notification`;
    }

    // query select all that match.
    const notificationList = target.parentElement.parentElement.querySelectorAll(selector)

    // toggle the display property for them all.
    notificationList.forEach(function(item) {
    	item.style.display = item.style.display === 'none' ? '' : 'none';
    });
  }

  // Let's loop over each repo and add things.
  boxedGroup.forEach(function(element, key) {
    // there are two types of notifications.
    const types = ['issue', 'pull-request'];

    // let's create a container for our buttons.
    let filters = document.createElement("div");
    // add a class for styling.
    filters.className = 'boxed-group-inner';

    // create a button to use for toggling.
    types.forEach(function(type) {
      let button = document.createElement("button");
      let id = type.split('-');
      button.innerText = `Toggle ${id[0]}` ;
      button.id = `toggle-${type}-${key}`;
      button.className = 'btn btn-sm';
      button.onclick = handleClick;
      filters.appendChild(button);
    });

    // place a div for reasons.
    element.prepend(filters);
  });
})();

