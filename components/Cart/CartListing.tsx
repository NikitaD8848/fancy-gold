import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'react-toastify';
import useAddToCartHook from '../../hooks/CartPageHook/useAddToCart';
import useCartPageHook from '../../hooks/CartPageHook/useFetchCartItems';
import styles from '../../styles/components/cartProductDetail.module.scss';
const ApiErrorPage = dynamic(() => import('../ApiErrorPage'));
const CartSkeleton = dynamic(() => import('./CartSkeleton'));
const CartProductDetail = dynamic(() => import('./CartProductDetail'));
const SizeQtyTable = dynamic(() => import('./SizeQtyTable'));
const  NoDataFound  = dynamic(()=> import('../NoDataFound')) ;

const CartListing = () => {
  const { cartListingItems, setCartListingItems, isLoading, errorMessage } = useCartPageHook();
  const { addToCartItem, placeOrderAPIFunc, RemoveItemCartAPIFunc } = useAddToCartHook();
  const [deliveryDate, setDeliveryDate] = useState('');
  const user = localStorage.getItem('user');
  useEffect(() => {
    if (cartListingItems?.transaction_date) {
      const transactionDate = new Date(cartListingItems.transaction_date);
      transactionDate.setDate(transactionDate.getDate() + 16);
      setDeliveryDate(transactionDate.toISOString().split('T')[0]);
    }
  }, [cartListingItems?.transaction_date]);

  const handleDeleteRow = (itemCode: string) => {
    const params = {
      item_code: itemCode,
      quotation_id: cartListingItems?.name,
    };
    RemoveItemCartAPIFunc(params, setCartListingItems);
  };
  // to update Cart list after updating Quantity or wastage
  const handleUpdateListData = (data: any) => {
    const updatedOrder =
      data?.order?.length > 0 &&
      data?.order?.map((item: any) => {
        return {
          size: item?.size,
          quantity: item?.qty,
          colour: item?.colour,
        };
      });
    const addToCartParams = {
      item_code: data?.item_code,
      party_name: cartListingItems?.party_name,
      purity: cartListingItems?.purity,
      cust_name: cartListingItems?.cust_name,
      colour: data?.colour,
      wastage: data?.wastage,
      qty_size_list: updatedOrder || data?.order,
      remark: cartListingItems?.remark,
      user: user,
    };
    addToCartItem(addToCartParams, setCartListingItems);
  };

  const handleQtyChange = (categoryIndex: number, orderIndex: number, sizeIndex: number, newQty: number, data: any) => {
    const updatedItems = { ...cartListingItems };
    updatedItems.categories[categoryIndex].orders[orderIndex].order[sizeIndex].qty = newQty;
    setCartListingItems(updatedItems);

    handleUpdateListData(data);
  };
  const handleDeleteSize = (categoryIndex: number, orderIndex: number, sizeIndex: number, data: any) => {
    if (!cartListingItems) return;
    const updatedItems = { ...cartListingItems };
    updatedItems.categories[categoryIndex]?.orders[orderIndex]?.order.splice(sizeIndex, 1);
    setCartListingItems(updatedItems);
    handleUpdateListData(data);
  };
  const handlePlaceOrder = async () => {
    const selectedDate = new Date(deliveryDate);
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 15);
    selectedDate.setHours(0, 0, 0, 0);
    minDate.setHours(0, 0, 0, 0);
    const params = {
      order_id: cartListingItems?.name,
      party_name: cartListingItems?.party_name,
    };
    if (selectedDate < minDate) {
      toast.error('Delivery date cannot be before 15 days from the transaction date.');
    } else {
      placeOrderAPIFunc(params, setCartListingItems);
    }
  };

  const onEditwastage = (categoryIndex: number, orderIndex: number, data: string) => {
    const updatedItems = { ...cartListingItems };
    updatedItems.categories[categoryIndex].orders[orderIndex].wastage = data;
    setCartListingItems(updatedItems);
  };
  const handleDataRendering = () => {
    if (isLoading) {
      return <CartSkeleton />;
    }
    if (cartListingItems?.categories?.length > 0) {
      return (
        <div className="border p-3">
          <div className="d-flex justify-content-between">
            <div>
              <label>Customer Name: {cartListingItems?.cust_name} </label>
              <br />
              <label>Order Purity: {cartListingItems?.purity}</label>
              <div>
                <label>Delivery Date: </label>
                <input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} min={deliveryDate} />
              </div>
            </div>
            <div className={`${styles.place_order_container}`}>
              <button className={`${styles?.place_order_btn}`} onClick={handlePlaceOrder}>
                Place Order
              </button>
            </div>
          </div>
          <hr className="mt-3" />
          {cartListingItems?.categories?.length > 0 &&
            cartListingItems?.categories?.map((category: any, categoryIndex: number) => (
              <div className="p-3" key={categoryIndex}>
                <h5 className="py-2">
                  {category?.category} | Total Weight: {category?.total_weight}gm
                </h5>
                <div className={`row ${styles?.table_header}`}>
                  <div className="col-lg-5 col-md-5 col-12 text-center">Products</div>
                  <div className="col-lg-2 col-md-2 col-12 text-center">Note</div>
                  <div className="col-lg-5 col-md-5 col-12"></div>
                </div>
                <div className="row">
                  {category?.orders?.length > 0 &&
                    category?.orders?.map((order: any, orderIndex: any) => (
                      <>
                        <div className={`col-lg-7 col-md-6 col-12 ${styles.border}`}>
                          <CartProductDetail
                            data={order}
                            onEditWastage={(data: any) => onEditwastage(categoryIndex, orderIndex, data)}
                            handleEditWastage={handleUpdateListData}
                          />
                        </div>
                        <div className={`col-lg-4 col-md-5 col-12 ${styles.border}`}>
                          <SizeQtyTable
                            data={order}
                            onQtyChange={(sizeIndex: number, newQty: number, data: any) =>
                              handleQtyChange(categoryIndex, orderIndex, sizeIndex, newQty, data)
                            }
                            onDelete={(sizeIndex: number, data: any) => handleDeleteSize(categoryIndex, orderIndex, sizeIndex, data)}
                          />
                        </div>
                        <div className={`col-lg-1 col-md-1 col-12 ${styles.cross_icon_container} `}>
                          <RxCross2
                            onClick={() => {
                              handleDeleteRow(order?.item_code);
                            }}
                          />
                        </div>
                      </>
                    ))}
                </div>
              </div>
            ))}
          <hr />
          <div className="d-flex justify-content-between">
            <textarea className="w-50 p-3" rows={2} placeholder="Terms & Conditions"></textarea>
            <div className={`${styles.place_order_container}`}>
              <h3>Grand Total weight : {cartListingItems?.grand_total_weight}gm</h3>
              <div className="d-flex justify-content-end w-100">
                <button className={`${styles?.place_order_btn}`} onClick={handlePlaceOrder}>
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (errorMessage !== '' && cartListingItems?.length <= 0 && isLoading === false) {
      return <ApiErrorPage />;
    }
    if (Object.keys(cartListingItems).length === 0 && cartListingItems.constructor === Object && errorMessage === '') {
      return (
        <NoDataFound title="Cart list is empty !!" message="Add Items to cart to view cart list." />
      );
    }
  };
  return (
    <div className="container">
      <h2 className="theme-blue text-center my-3">My Shopping Cart</h2>
      {handleDataRendering()}
    </div>
  );
};

export default CartListing;
