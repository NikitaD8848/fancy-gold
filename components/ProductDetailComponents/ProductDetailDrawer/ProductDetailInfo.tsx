import { useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useAddToCartHook from '../../../hooks/CartPageHook/useCartFunctions';
import { CONSTANTS } from '../../../services/config/app-config';
import { get_access_token } from '../../../store/slices/auth/token-login-slice';
import { selectCart } from '../../../store/slices/cart-slices/cart-local-slice';
import styles from '../../../styles/components/productCard.module.scss';
import productDetailStyles from '../../../styles/components/productDetail.module.scss';
import { callPostAPI } from '../../../utils/http-methods';

const ProductDetailInfo = ({ data, getProductDetailData }: any) => {
  const cartList = useSelector(selectCart)?.items;
  const TokenFromStore: any = useSelector(get_access_token);
  const { addToCartItem } = useAddToCartHook();
  const cust_name = localStorage.getItem('cust_name');
  const colour: any = localStorage.getItem('colour');
  const user = localStorage.getItem('user');
  const party_name = localStorage.getItem('party_name');
  const purity = localStorage.getItem('localPurity');
  const initialState: any = {
    colour: colour,
    size: '',
    quantity: '',
    remark: '',
    design_style: '',
  };

  const [sizeTable, setSizeTable] = useState([initialState]);
  const [cartProductsData, setCartProductsData] = useState({
    wastage: '',
    remark: '',
    rejection_note: '',
  });
  const [errors, setErrors] = useState<{ [key: number]: { size?: string; quantity?: string } }>({});
  const [customerError, setCustomerError] = useState('');
  const [reject, setReject] = useState(false);
  const inputRefs = useRef<any[]>([]);

  const handleAddRow = () => {
    setSizeTable([...sizeTable, initialState]);
  };

  const handleDeleteRow = (index: number) => {
    const updatedSizeTable = sizeTable.filter((_, i) => i !== index);
    setSizeTable(updatedSizeTable);
  };
  const handleKeyDown = (event: any) => {
    event.preventDefault();
    if (event?.key === 'Enter' || event?.keyCode === 13) {
      handleAddRow();
      setTimeout(() => {
        // Focus on the size input of the last row
        const lastIndex = sizeTable.length;
        inputRefs.current[lastIndex]?.focus();
      }, 0);
    }
  };
  const handleInputChange = (index: number, event: any) => {
    const { name, value } = event.target;
    const updatedSizeTable = sizeTable.map((row, i) => {
      if (i === index) {
        const updatedRow = { ...row, [name]: value };
        return updatedRow;
      }
      return row;
    });

    setSizeTable(updatedSizeTable);
  };
  const postRejectionNoteAPI = (params: any) => {
    const version = CONSTANTS?.ARC_APP_CONFIG?.version;
    const method = 'reject_new_arrival_item';
    const entity = 'product_list';
    const apiSDKName = CONSTANTS?.ARC_APP_CONFIG?.app_name;
    const url = `${CONSTANTS?.API_BASE_URL}${apiSDKName}?version=${version}&method=${method}&entity=${entity}&item_code=${params?.item_code}&rejection_note=${params?.rejection_note}&reject_status=1`;
    const postNote = callPostAPI(url, undefined, TokenFromStore?.token);
    return postNote;
  };
  const handleRejectionNote = async () => {
    const params = {
      item_code: data?.name,
      rejection_note: cartProductsData?.rejection_note,
    };
    if (cartProductsData?.rejection_note && cartProductsData?.rejection_note !== '') {
      const postNote = await postRejectionNoteAPI(params);
      if (postNote?.data?.message?.msg === 'success') {
        setReject(false);
        setCartProductsData({ ...cartProductsData, rejection_note: '' });
        toast.success('Product rejected successfully');
        getProductDetailData(data?.name);
      } else {
        toast.error('Failed to Reject Product');
      }
    }
  };
  const handleSizeButtonClick = (size: number) => {
    if (sizeTable[sizeTable.length - 1]?.size || sizeTable?.length === 0) {
      const newRow = { ...initialState, size: size.toString() };
      setSizeTable([...sizeTable, newRow]);
    } else {
      const updatedSizeTable = sizeTable.map((row, i) => (i === sizeTable.length - 1 ? { ...row, size: size.toString() } : row));
      setSizeTable(updatedSizeTable);
    }
  };

  const handleAddToCart = () => {
    const newErrors: { [key: number]: { size?: string; quantity?: string } } = {};
    let valid = true;

    sizeTable.forEach((row, index) => {
      if (!row.size) {
        newErrors[index] = { ...newErrors[index], size: 'Size is required' };
        valid = false;
      }
      if (!row.quantity) {
        newErrors[index] = { ...newErrors[index], quantity: 'Quantity is required' };
        valid = false;
      }
    });

    setErrors(newErrors);

    if (!valid) {
      return;
    }

    const addToCartParams = {
      item_code: data?.name,
      party_name: party_name,
      purity: purity,
      cust_name: cust_name,
      colour: colour,
      // wastage: cartProductsData.wastage,
      qty_size_list: sizeTable,
      remark: cartProductsData.remark,
      user: user,
    };
    if (cust_name !== '' && cust_name !== null) {
      setCustomerError('');
      addToCartItem(addToCartParams);
      setSizeTable([initialState]);
    } else {
      setCustomerError('Customer name is empty!');
    }
    setCartProductsData({
      wastage: '',
      remark: '',
      rejection_note: '',
    });
  };
  const isVariantInCart = (variant_code: any) => {
    return cartList?.length > 0 && cartList?.some((cartItem: any) => cartItem === variant_code);
  };
  console.log(data?.category_size, 'data111');
  return (
    <div className="w-100">
      <div className="py-2">
        <h6 className={`${styles.productCode} fw-bold mb-0`}>This product is available in below sizes :</h6>
        <div className="d-flex">
          {Array.isArray(data?.category_size) &&
            data?.category_size.length > 0 &&
            [...data.category_size]
              .sort((a: any, b: any) => a - b) // Adjust sorting logic as needed
              .map((size: any, index: number) => {
                const isActive = sizeTable.some((item: any) => item?.size === size.toString());
                return (
                  <button
                    key={index}
                    className={isActive ? productDetailStyles.size_button_active : productDetailStyles.size_button}
                    onClick={() => handleSizeButtonClick(size)}
                  >
                    {size}
                  </button>
                );
              })}
          <button className={`btn btn-link theme-blue ${styles.tableFontSize}`} onClick={handleAddRow}>
            Add Custom Size
          </button>
        </div>
      </div>
      <div className="mb-2">
        <div className={`row mx-1 ${styles.tableRow}`}>
          <div className="col-2 border text-center py-1">Purity</div>
          <div className={`${data?.custom_factory === 'ARC ERP Software' ? 'col-2' : 'col-4'}  border text-center py-1`}>Colour</div>
          {data?.custom_factory === 'ARC ERP Software' && <div className="col-2 border text-center py-1">Weight</div>}
          <div className={`col-3 px-0 border text-center py-1`}>Size(inch)</div>
          <div className={`col-2 border text-center p-0 px-1 py-1`}>Qty</div>
          <div className="col border"></div>
        </div>
        {sizeTable.map((row, index) => (
          <div className="row mx-1" key={index}>
            <div className={`col-2 border text-center py-1  ${styles.tableFontSize}`}>{purity}</div>
            <div className={`${data?.custom_factory === 'ARC ERP Software' ? 'col-2' : 'col-4'} border py-1`}>
              <select
                name="colour"
                value={row.colour || colour}
                onChange={(e) => handleInputChange(index, e)}
                className={`border-0 form-control p-0 text-center ${styles.tableFontSize}`}
              >
                <option value="Yellow">Yellow</option>
                <option value="White">White</option>
                <option value="Pink">Pink</option>
              </select>
            </div>

            {data?.custom_factory === 'ARC ERP Software' && (
              <div className="col-2 border d-flex justify-content-center px-0 py-1 flex-column">
                <input
                  name="weight"
                  className={`${productDetailStyles.qty_input} ${styles.tableFontSize} form-control`}
                  value={Math.floor((data?.weight_per_unit / data?.length) * row.size) || ''}
                />
              </div>
            )}
            <div
              className={`
                col-3 px-0 border d-flex justify-content-center py-1 flex-column`}
            >
              <input
                type="text"
                name="size"
                className={`${productDetailStyles.qty_input} ${styles.tableFontSize} form-control`}
                value={row.size}
                onChange={(e) => handleInputChange(index, e)}
                ref={(el) => (inputRefs.current[index] = el)} // Assign ref dynamically
              />
              {errors[index]?.size && <small className="text-danger">{errors[index].size}</small>}
            </div>
            <div className={`col-2 border d-flex justify-content-center p-0 px-1 py-1 flex-column`}>
              <input
                type="text"
                name="quantity"
                className={`${productDetailStyles.qty_input} form-control p-0 ${styles.tableFontSize}`}
                value={row.quantity}
                onChange={(e) => handleInputChange(index, e)}
              />
              {errors[index]?.quantity && <small className="text-danger">{errors[index].quantity}</small>}
            </div>
            <div className="col text-center border p-1">
              <button
                className="border-0 bg-light p-0 text-center"
                onClick={() => handleDeleteRow(index)}
                onKeyDown={(e) => handleKeyDown(e)}
              >
                <IoClose className={`text-danger ${productDetailStyles.pointerCursor}`} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="">
        {/* <textarea
          name="wastage"
          value={cartProductsData?.wastage}
          placeholder="Wastage"
          className={`p-2 m-1 border w-100 ${styles.tableFontSize}`}
          onChange={(e) => setCartProductsData({ ...cartProductsData, wastage: e.target.value })}
          rows={1}
        ></textarea> */}
        <textarea
          name="remark"
          value={cartProductsData?.remark}
          placeholder="Enter note"
          className={`p-2 m-1 border w-100 ${styles.tableFontSize}`}
          onChange={(e) => setCartProductsData({ ...cartProductsData, remark: e.target.value })}
        ></textarea>
        {reject && (
          <textarea
            name="rejection_note"
            value={cartProductsData?.rejection_note}
            placeholder="Enter rejection note"
            className={`p-2 m-1 border w-100 ${styles.tableFontSize}`}
            onChange={(e) => setCartProductsData({ ...cartProductsData, rejection_note: e.target.value })}
          ></textarea>
        )}
      </div>
      {customerError !== '' && <p className="text-danger">{customerError}</p>}
      <div className="d-flex justify-content-start gap-3 ml-1">
        {isVariantInCart(data?.name) ? (
          <button className={productDetailStyles.cart_add_to_cart_btn} onClick={handleAddToCart}>
            Added
          </button>
        ) : (
          <button className={productDetailStyles.add_to_cart_btn} onClick={handleAddToCart}>
            Add To Cart
          </button>
        )}
        {data?.reject_button_value === 1 ? (
          <button className={`${productDetailStyles.reject_btn} `} disabled>
            Rejected
          </button>
        ) : (
          <button className={`${productDetailStyles.reject_btn} `} onClick={() => (reject ? handleRejectionNote() : setReject(true))}>
            Reject
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetailInfo;
