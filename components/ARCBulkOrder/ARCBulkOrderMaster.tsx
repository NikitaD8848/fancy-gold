import useBulkOrder from '../../hooks/BulkOrder/bulk-order-hook';
import styles from '../../styles/components/_bulkOrder.module.scss';
import CustomerOrderTable from './CustomerOrderTable';
import InputFields from './InputFields';

function ARCBulkOrderMaster() {
  const {
    formData,
    handleChange,
    addCustomMarketOrderRow,
    deleteCustomMarketOrderRow,
    handleSaveBtn,
    handleChangeCustomOrder,
    purityValues,
    errMsgCustomOrder,
    refCodesList,
  }: any = useBulkOrder();

  return (
    <>
      <div className="container-lg mb-5 pb-5">
        <div className={styles.bulk_list_cont}>
          <div className="row mt-4">
            <div className="text-center">
              <h1>ARC Casting</h1>
            </div>
            <div className="">
              <InputFields formData={formData} handleChange={handleChange} purityList={purityValues} />
              <CustomerOrderTable
                formData={formData}
                addCustomMarketOrderRow={addCustomMarketOrderRow}
                handleChangeArrayCustom={handleChangeCustomOrder}
                deleteCustomMarketOrderRow={deleteCustomMarketOrderRow}
                errorMsg={errMsgCustomOrder}
                refCodesList={refCodesList}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <button onClick={handleSaveBtn} className={styles.btn_save_bulk_order}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ARCBulkOrderMaster;
