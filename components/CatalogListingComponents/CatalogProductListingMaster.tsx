import React from 'react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import useProductListing from '../../hooks/ProductListPageHooks/useProductsDataHook';
import { selectCart } from '../../store/slices/cart-slices/cart-local-slice';
import { selectWishlist } from '../../store/slices/wishlist-slices/wishlist-local-slice';
const HorizontalFilter = dynamic(() => import('../ProductListingComponents/HorizontalFilterList.tsx/HorizontalFilter'));
const ProductGridViewMaster = dynamic(() => import('../ProductListingComponents/ProductGridView/ProductGridViewMaster'));
const ProductDetailDrawer = dynamic(() => import('../ProductDetailComponents/ProductDetailDrawer/ProductDetailDrawer'));

function CatalogProductListingMaster() {
  const { productListingData, isLoading, handlePaginationBtn, productListTotalCount, sortBy, handleSortBy } = useProductListing();
  const wishlistData = useSelector(selectWishlist)?.items;
  const cartData = useSelector(selectCart)?.items;
  const [show, setShow] = useState(false);
  const [drawerData, setDrawerData] = useState({ productName: '', variantOf: '' });

  const handleClose = () => {
    setDrawerData({ productName: '', variantOf: '' });
    setShow(false);
  };
  const handleShow = (productName: string, variantOf: string) => {
    setDrawerData((prev: any) => ({ ...prev, productName: productName, variantOf: variantOf }));
    setShow(true);
  };

  const handleDisplayOfProductsList = () => {
    return (
      <ProductGridViewMaster
        productListingData={productListingData}
        isLoading={isLoading}
        handlePaginationBtn={handlePaginationBtn}
        productListTotalCount={productListTotalCount}
        handleShow={handleShow}
        wishlistData={wishlistData}
        cartData={cartData}
      />
    );
  };
  return (
    <div>
      <section className="listing-page ">
        <HorizontalFilter sortBy={sortBy} handleSortBy={handleSortBy} />
        <div className="container w-100">
          <div className="row mt-2 mt-sm-0 product-listing-row">{handleDisplayOfProductsList()}</div>
        </div>
        <ProductDetailDrawer show={show} handleClose={handleClose} data={drawerData} />
      </section>
    </div>
  );
}
export default CatalogProductListingMaster;
