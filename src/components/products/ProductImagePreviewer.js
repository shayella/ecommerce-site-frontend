import React, { Component } from "react";

class ProductImagePreviewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allImages: [],
      selectedImage: "",
      isLoading: true,
    };
  }
  componentDidMount() {
    console.log("Gallery ", this.props.gallery);
    this.setState({
      allImages: this.props.gallery,
      selectedImage: this.props.gallery[0],
    });
  }
  render() {
    return (
      <div className="product-image-previewer">
        <div className="image-thumbnail-container">
          {this.state.allImages.map((image) => {
            return (
              <img
                src={image}
                className="image-thumbnail"
                onClick={() => {
                  this.setState({ selectedImage: image });
                }}
                alt=""
              />
            );
          })}
        </div>
        <div className="selected-image-container">
          <img
            src={this.state.selectedImage}
            className="selected-image"
            alt=""
          />
        </div>
      </div>
    );
  }
}

export default ProductImagePreviewer;
