import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import fetchProductDetailData from '../../../services/api/product-detail-page-apis/get-product-detail';
import fetchProductVariant from '../../../services/api/product-detail-page-apis/get-product-variants';
import { CONSTANTS } from '../../../services/config/app-config';
import { get_access_token } from '../../../store/slices/auth/token-login-slice';
import NoDataFound from '../../NoDataFound';
import ProductCode from '../ProductDetails/ProductCode';
import ProductVariants from '../ProductDetails/ProductVariants';
import DrawerSkeleton from './DrawerSkeleton';
import ImageSkeleton from './ImageSkeleton';
import ProductDetailInfo from './ProductDetailInfo';

const ProductDetailDrawer = ({ show, handleClose, data }: any) => {
  const TokenFromStore: any = useSelector(get_access_token);
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const [productDetail, setProductDetail] = useState<any>({});
  const [variantsData, setVariantsData] = useState<any>([]);
  const [errorMessage, setErrorMessageMsg] = useState('');
  const [attributesData, setAttributesData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [detailLoading, setDetailLoading] = useState(false);
  const getVariantsData = async () => {
    if (data?.variantOf !== null) {
      setLoading(true); // Set loading to true when API call starts
      try {
        const variantDataAPI = await fetchProductVariant(SUMMIT_APP_CONFIG, data?.variantOf, TokenFromStore?.token);
        if (variantDataAPI?.status === 200 && variantDataAPI?.data?.message?.msg === 'success') {
          setErrorMessageMsg('');
          setVariantsData(variantDataAPI?.data?.message?.data?.variants || []);
          setAttributesData(variantDataAPI?.data?.message?.data?.attributes || []);
        } else {
          setErrorMessageMsg('Error fetching variants');
          setVariantsData([]);
        }
      } catch (error) {
        setErrorMessageMsg('Error fetching variants');
        setVariantsData([]);
      } finally {
        setLoading(false); // Set loading to false after API call completes
      }
    } else {
      setVariantsData([]);
    }
  };
  const getProductDetailData = async (productName: string) => {
    const requestParams = {
      item: productName,
      currency: 'INR',
    };
    setDetailLoading(true);
    const productDetailData = await fetchProductDetailData(SUMMIT_APP_CONFIG, requestParams, TokenFromStore?.token);
    if (productDetailData?.data?.message?.msg === 'Success') {
      if (productDetailData?.data?.message?.data?.length !== 0) {
        setProductDetail(productDetailData?.data?.message?.data[0]);
        setDetailLoading(false);
      } else {
        setProductDetail({});
        setDetailLoading(false);
      }
    }
    setDetailLoading(false);
  };
  const onHide = () => {
    handleClose();
    setErrorMessageMsg('');
    setTimeout(() => {
      setProductDetail({});
      setVariantsData([]);
    }, 400);
  };
  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };
  useEffect(() => {
    if (data?.productName) {
      getProductDetailData(data?.productName);
    }
    if (data?.variantOf) {
      getVariantsData();
    } else {
      setVariantsData([]);
    }
  }, [data]);

  return (
    <Offcanvas show={show} placement="end" onHide={onHide} backdrop backdropClassName="offcanvas-backdrop">
      <Offcanvas.Header closeButton />
      <Offcanvas.Body>
        {detailLoading ? (
          <>
            <DrawerSkeleton />
            <ImageSkeleton />
          </>
        ) : Object?.keys(productDetail).length !== 0 ? (
          <>
            <ProductCode data={productDetail} />
            <ProductVariants
              productDetail={productDetail}
              variantsData={variantsData}
              attributesData={attributesData}
              getProductDetailData={getProductDetailData}
              errorMessage={errorMessage}
              loading={loading}
            />
            <ProductDetailInfo data={productDetail} getProductDetailData={getProductDetailData} />
            <div className="mt-2">
              <Image
                src={productDetail?.image}
                alt="product-image"
                className="w-100 img-fluid"
                width={100}
                height={100}
                loader={imageLoader}
              />
            </div>
          </>
        ) : (
          <NoDataFound title="Details Not Found!" message="Sorry for inconvenience. Please try again later." />
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ProductDetailDrawer;
