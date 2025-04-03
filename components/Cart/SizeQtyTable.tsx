import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import styles from '../../styles/components/cartProductDetail.module.scss';

const SizeQtyTable = ({ data, onQtyChange, onDelete }: any) => {
  const handleIncrement = (sizeIndex: number, itemData: any) => {
    const newQty = data.order[sizeIndex].qty + 1;
    onQtyChange(sizeIndex, newQty, itemData);
  };

  const handleDecrement = (sizeIndex: number, itemData: any) => {
    const newQty = data.order[sizeIndex].qty - 1;
    onQtyChange(sizeIndex, newQty, itemData);
  };
  const handleQtyChange = (sizeIndex: number, itemData: any, e: any) => {
    const newQty = e.target.value;
    onQtyChange(sizeIndex, newQty, itemData);
  };
  const handleDelete = (sizeIndex: number) => {
    onDelete(sizeIndex, data);
  };
  return (
    <>
      <div className={`row ${styles.font_12} text-center`}>
        <div className="col-lg-2 col-2 border py-1">Colour</div>
        <div className="col-lg-3 col-3 border py-1">Size(inch)</div>
        <div className="col-lg-3 col-3 border py-1">Qty</div>
        <div className="col-lg-3 col-3 border py-1">Weight</div>
        <div className="col-lg-1 col-1 border py-1"></div>
      </div>
      {data?.order?.length > 0 &&
        data?.order?.map((item: any, index: number) => (
          <div className={`row ${styles.font_12} text-center `} key={index}>
            <div className="col-lg-2 col-2 border py-1">{item?.colour}</div>
            <div className="col-lg-3 col-3 border py-1">{item?.size}</div>
            <div className="col-lg-3 col-3 border p-0 py-1">
              <span
                onClick={() => {
                  handleDecrement(index, data);
                }}
              >
                <FaMinus className="px-1 fs-2" />
              </span>
              <input
                type="text"
                className={styles?.qty_input}
                value={item?.qty}
                onChange={(e) => {
                  handleQtyChange(index, data, e);
                }}
              />
              <span onClick={() => handleIncrement(index, data)}>
                <FaPlus className="px-1 fs-2 " />
              </span>
            </div>
            <div className="col-lg-3 col-3 border py-1">{item?.weight}gm</div>
            <div className="col-lg-1 col-1 border py-1 cursor-pointer">
              <RxCross2 onClick={() => onDelete(data.item_code, item.size)} />
            </div>
          </div>
        ))}
      <div className={`row ${styles.font_12} text-center `}>
        <div className="col-lg-5 border py-2">Total weight</div>
        <div className="col-lg-7 border py-2 text-end">{Number(data?.total_weight).toFixed(3)}gm</div>
      </div>
    </>
  );
};

export default SizeQtyTable;
