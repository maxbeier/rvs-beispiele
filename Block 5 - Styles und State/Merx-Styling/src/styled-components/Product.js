import styled, { css } from 'styled-components';
import variables from './variables';
import Heart from './Heart';
import { SpreadSt, CleanSt } from './App.css';

const ProductSt = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid ${variables.lightGray};
  border-radius: 4px;
  ${(props) =>
    props.isHighlighted &&
    css`
      background-color: ${variables.lightGray};
      border-color: ${variables.primaryColor};
    `}
`;

const ImageSt = styled.img`
  width: 100%;
`;

const TitleSt = styled.h5`
  margin: 0 0 0.5rem;
  padding: 0 1rem;
`;

const BodySt = styled.div`
  flex: 1;
  padding: 0 1rem;
`;

const PriceSt = styled.div`
  padding: 1rem;
  text-align: right;
  font-weight: bold;
  ${(props) =>
    props.isCheap &&
    css`
      composes: price;
      color: red;
    `}
`;

const Product = ({ id, title, body, price, image }) => {
  return (
    <ProductSt isHighlighted={!(id % 4)}>
      <a href={`/products/${id}`}>
        <ImageSt src={image} alt={title} />
        <TitleSt>{title}</TitleSt>
      </a>
      <BodySt>{body}</BodySt>
      <PriceSt isCheap={id % 3}>
        <SpreadSt>
          <CleanSt as="button">
            <Heart />
          </CleanSt>
          {price}
        </SpreadSt>
      </PriceSt>
    </ProductSt>
  );
};

export default Product;
