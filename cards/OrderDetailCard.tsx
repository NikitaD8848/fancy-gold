import React, { useState } from 'react';
import Image from 'next/image';
import { CONSTANTS } from '../services/config/app-config';
import noImage from '../public/assets/images/no_image.png';
import orderDetailStyles from '../styles/components/orderDetail.module.scss';
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';

const OrderDetailCard = ({
  name,
  image,
  weight,
  level_2_category,
  net_weight,
  market_design_name,
  purity,
  order,
  remark,
  totalWeight,
  wastage,
  barcodeimage,
  bom_factory_code,
  status,
  setReviewState,
  callAddReviewAPI,
  callUpdateSalesOrderStatusAPI,
  customerName,
  order_id,
  order_date,
  issue_weight,
  review_value,
  getOrderStatusValueFromURL,
  soisd_item,
  reviewState,
  showButtons,
  handleReadyToDispatch,
  handleDeleteOrder,
}: any) => {
  const [reviewModalToggle, setReviewModalToggle] = useState<boolean>(false);
  const [errMsgforReviewSubmitBtn, setErrMsgforReviewSubmitBtn] = useState<boolean>(false);

  const showReviewModal = () => {
    setReviewModalToggle(!reviewModalToggle);
  };

  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };

  const handleReviewSubmitBtn: any = () => {
    if (Object.keys(reviewState)?.length > 0 || review_value !== null) {
      setErrMsgforReviewSubmitBtn(false);
      callAddReviewAPI(order_id, name, customerName, order_date);
      callUpdateSalesOrderStatusAPI(soisd_item);
      setReviewModalToggle(false);
    } else {
      setErrMsgforReviewSubmitBtn(true);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleReviewSubmitBtn();
    }
  };
  return (
    <>
      <div className="content-prev">
        <div className="col-12">
          <div className="row ">
            <div className="col-7 text-center d-flex flex-column justify-content-center text-center">
              <div className="row align-items-center border">
                <div className="col-2 ">
                  <div className="img-wrap text-center" style={{ height: '110px' }}>
                    <Image
                      loader={imageLoader}
                      className={`d-block w-100`}
                      src={image !== null ? image : noImage}
                      alt="Barcode image"
                      priority
                      width={100}
                      height={100}
                    />
                  </div>
                </div>
                <div className="col-4 text-start">
                  <div className={`${orderDetailStyles.order_detail_block}`}>
                    <Image loader={imageLoader} src={barcodeimage} alt="Barcode image" priority width={180} height={70} />
                    <p className="mb-0">Product code:{name}</p>
                    {bom_factory_code !== null && <p>BOM Factory Code: {bom_factory_code}</p>}
                    {level_2_category === 'BALL CHAINS' && <p>Market Design Name:- {market_design_name}</p>}
                    <p className="mb-0">Weight: {parseInt(weight)} gm</p>
                    {(level_2_category === 'MANGALSUTRA' || level_2_category === 'IMP PREMIUM') && (
                      <p className="mb-2">Net Wt. {parseInt(net_weight)}gm</p>
                    )}
                  </div>
                  {status === 'Pending For Confirmation' && getOrderStatusValueFromURL === null ? (
                    <div className="">
                      <div>
                        <button className={`mt-3 mb-3 ${orderDetailStyles.order_detail_review_btn}`} onClick={showReviewModal}>
                          Add Review
                        </button>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div className={`col-1 ${orderDetailStyles.order_detail_block}`}>
                  <p>{purity}</p>
                </div>
                <div className="col-1 text-start">
                  {/* <p className="text-dark" style={{ fontSize: '14px' }}>
                    Wastage:-{wastage}
                  </p> */}
                  <p className="text-dark" style={{ fontSize: '14px' }}>
                    {remark}
                  </p>
                </div>
                <div className="col-1">
                  <p className="text-dark" style={{ fontSize: '14px' }}>
                    {status}
                  </p>
                </div>
                {showButtons && ['pending', 'Accepted', 'WIP', 'Pending', 'accepted'].includes(status) && (
                  <div className="col-3 text-center">
                    {[
                      {
                        label: 'Ready to Dispatch',
                        className: orderDetailStyles.readyToDispatch,
                        onClick: () => handleReadyToDispatch(name),
                      },
                      { label: 'Delete', className: orderDetailStyles.deletBtn, onClick: () => handleDeleteOrder(name) },
                    ].map(({ label, className, onClick }) => (
                      <div key={label} className="m-2">
                        <button className={className} onClick={onClick}>
                          {label}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="col-5 border p-0">
              <div className={`${orderDetailStyles.order_detail_table}`}>
                <table style={{ height: '100%' }}>
                  <tr>
                    <th>Color</th>
                    <th>Size(Inch)</th>
                    <th>Qty</th>
                    <th>Weight(gm)</th>
                    <th>status</th>
                  </tr>
                  {order.length > 0 &&
                    order.map((data: any, index: any) => {
                      return (
                        <tr key={index}>
                          <td>{data.colour}</td>
                          <td>{data.size} inch</td>
                          <td>{data.qty}</td>
                          <td className="text-right">{data.weight}gm</td>
                          <td className="text-right">{data?.custom_oms_status}</td>
                        </tr>
                      );
                    })}
                  <tr>
                    <td style={{ fontSize: '10px !important' }}>Total Weight:</td>
                    <td className="text-right" colSpan={3}>
                      {totalWeight.toFixed(2)} gm
                    </td>
                  </tr>

                  {issue_weight !== null && issue_weight !== '' && (
                    <tr>
                      <td style={{ fontSize: '10px !important' }}>Issue Weight:</td>
                      <td className="text-right" colSpan={3}>
                        {parseInt(issue_weight)} gm
                      </td>
                    </tr>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12">
              <Modal show={reviewModalToggle} onHide={showReviewModal} contentClassName="modal" className="">
                <ModalHeader closeButton>
                  <ModalTitle>
                    <h2>Add Review for this Item</h2>
                  </ModalTitle>
                </ModalHeader>
                <ModalBody>
                  <div>
                    <textarea rows={10} cols={80} onChange={(e: any) => setReviewState(e.target.value)} onKeyDown={handleKeyDown}>
                      {review_value && review_value}
                    </textarea>
                  </div>
                </ModalBody>
                {errMsgforReviewSubmitBtn && <span className="text-danger ps-3">Please Add Review for this item</span>}
                <ModalFooter>
                  <button className="order_detail_review_btn" onClick={handleReviewSubmitBtn}>
                    Submit
                  </button>
                </ModalFooter>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailCard;
