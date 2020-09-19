import React from "react";
import { withRouter } from "react-router-dom";

import CollectionItem from "../collection-item/collection-item";

import "./collection-preview.scss";

function CollectionPreview({ title, items, history, match }) {
  return (
    <div className="collection-preview">
      <h1
        className="title"
        onClick={() => history.push(`${match.path}/${title.toLowerCase()}`)}
      >
        {title.toUpperCase()}
      </h1>
      <div className="preview">
        {items
          .filter((item, idx) => idx < 4) // filter is just making sure that items on each row is just 4 i.e
          // till index 4
          .map((
            item // WE are just passing the entire item i.e CollectionItem back into itself, so that
          ) => (
            // It can be accessible in Its own Component
            <CollectionItem key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
}

export default withRouter(CollectionPreview);
