import React, { Component } from "react";
import DOMPurify from "dompurify";

class PurifiedProductDescription extends Component {
  render() {
    const { description } = this.props;
    const safeDescription = DOMPurify.sanitize(description);
    return (
      <div
        className="description"
        dangerouslySetInnerHTML={{ __html: safeDescription }}
      ></div>
    );
  }
}

export default PurifiedProductDescription;
