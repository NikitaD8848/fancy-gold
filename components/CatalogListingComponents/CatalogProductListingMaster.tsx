<<<<<<< HEAD
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
=======
import Image from 'next/image';
import React from 'react';
import image from '../../public/assets/images/under-maintainance.webp';

function CatalogProductListingMaster() {
  return (
    <div className="container vh-100">
      <div className="d-flex justify-content-center pt-5 mt-5 vh-100">
        <div>
          <Image src={image} alt="" className="img-fluid" width={450} height={695} />
          <h4 className="text-center pt-3">This page is under maintenance.</h4>
        </div>
      </div>
    </div>
  );
}

>>>>>>> 0c1f2f192e19906becae3058c4bd3c72cd6fb526
export default CatalogProductListingMaster;
