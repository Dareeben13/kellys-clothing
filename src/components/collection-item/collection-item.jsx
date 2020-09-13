import React from "react";
import { connect } from "react-redux";

// import CustomButton from "../custom-button/custom-button";
import { addItem } from "../../redux/cart/cart.actions";

import {
  CollectionItemStyle,
  ImageStyle,
  ColectionFooterStyle,
  CustomButtonStyle,
  NameSpanStyle,
  PriceSpanStyle,
} from "./collection-item.styles";

// import "./collection-item.scss";

function CollectionItem({ item, addItem }) {
  const { name, price, imageUrl } = item;
  return (
    <CollectionItemStyle>
      <ImageStyle
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <ColectionFooterStyle>
        <NameSpanStyle>{name}</NameSpanStyle>
        <PriceSpanStyle>{price}</PriceSpanStyle>
      </ColectionFooterStyle>
      <CustomButtonStyle onClick={() => addItem(item)} inverted>
        Add to cart
      </CustomButtonStyle>
    </CollectionItemStyle>
  );
}

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
