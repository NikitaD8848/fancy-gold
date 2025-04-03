import React, { useState } from 'react';
import styles from '../../styles/components/_bulkOrder.module.scss';
import BulkDropdownInput from '../BulkOrder/BulkDropdown';

function CustomerOrderTable({
  formData,
  addCustomMarketOrderRow,
  handleChangeArrayCustom,
  deleteCustomMarketOrderRow,
  errorMsg,
  refCodesList,
}: any) {
  const [inputValues, setInputValues] = useState<string[]>([]);
  const handleInputValueChange = (value: string, index: number) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  return (
    <>
      <div className="row mt-4">
        <div className="col-md-9">
          <p className="fs-14">Custom Market Order Details</p>
        </div>
        <div className="col-md-3 d-flex justify-content-end h-75">
          <button className={styles.btn_save_bulk_order} onClick={addCustomMarketOrderRow}>
            Add More
          </button>
        </div>
      </div>
      <div className={styles.table_container}>
        <div className={styles.table_wrapper}>
          <table className="table ">
            <thead className={styles.fixed_header}>
              <tr>
                <th>
                  Design Name<span className="text-danger">*</span>
                </th>
                <th>
                  Size<span className="text-danger">*</span>
                </th>
                <th>
                  Quantity<span className="text-danger">*</span>
                </th>
                <th>
                  Colour<span className="text-danger">*</span>
                </th>
                <th>
                  Description<span className="text-danger">*</span>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody style={{ position: 'relative' }}>
              {formData?.customMarketOrderDetails?.map((row: any, index: any) => (
                <tr key={index}>
                  <td className={`${styles.search_input_bulk_order}  w-25`} style={{ position: 'relative' }}>
                    <BulkDropdownInput
                      dropdownData={refCodesList?.map((ele: any) => ele?.reference_code)}
                      inputValue={inputValues[index] || ''}
                      setInputValue={(value: string) => handleInputValueChange(value, index)}
                      disabled={''}
                      name={`item_code${index}`}
                      onChange={(e: any) => handleChangeArrayCustom({ target: { value: e } }, index, 'item_code')}
                    />
                  </td>
                  <td>
                    {row.qty.map((item: any, subIndex: number) => (
                      <React.Fragment key={subIndex}>
                        <input
                          type="number"
                          name={`size${index}.${subIndex}`}
                          value={item.size}
                          className={`w-100 ${styles.input_type_number} px-1`}
                          onChange={(e) => handleChangeArrayCustom(e, index, 'size', subIndex)}
                        />
                      </React.Fragment>
                    ))}
                  </td>
                  <td>
                    {row.qty.map((item: any, subIndex: number) => (
                      <React.Fragment key={subIndex}>
                        <input
                          type="number"
                          name={`qty${index}.${subIndex}`}
                          value={item.qty}
                          className={`w-100 ${styles.input_type_number} px-1`}
                          onChange={(e) => handleChangeArrayCustom(e, index, 'qty', subIndex)}
                        />
                      </React.Fragment>
                    ))}
                  </td>
                  <td>
                    <select
                      name={`color${index}`}
                      className={`w-100 ${styles.input_type_number} px-1`}
                      value={row.color}
                      onChange={(e) => handleChangeArrayCustom(e, index, 'color')}
                    >
                      <option value="" className="px-1">
                        Select colour
                      </option>
                      <option value="Yellow">Yellow</option>
                      <option value="Rose">Rose</option>
                      <option value="White">White</option>
                      <option value="Pink">Pink</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      name={`description${index}`}
                      className={`w-100 px-1 ${styles.input_type_number}`}
                      value={row.description}
                      onChange={(e) => handleChangeArrayCustom(e, index, 'description')}
                    />
                  </td>
                  <td className="text-end">
                    <button className={styles.btn_delete_bulk_order} onClick={() => deleteCustomMarketOrderRow(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {errorMsg && (
                <tr>
                  <td colSpan={5} className="w-100 text-danger text-center">
                    {errorMsg}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default CustomerOrderTable;
