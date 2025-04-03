import React, { useState } from 'react';
import horizontalFilterStyles from '../../../styles/components/horizontalFilter.module.scss';
import { toast } from 'react-toastify';

const CustomerName = () => {
  const [customerName, setCustomerName] = useState(localStorage.getItem('cust_name') || '');
  const [custNameStatus, setCustNameStatus] = useState(localStorage.getItem('cust_name') !== null ? true : false);
  const handleInput = (data: any) => {
    setCustomerName(data);
  };
  const handleLocalStorage = () => {
    localStorage.setItem('cust_name', customerName);
    toast.success('Customer name added.');
    setCustNameStatus(true);
  };
  return (
    <div className="d-flex mx-2">
      <input
        type="text"
        className={`${horizontalFilterStyles.cust_name_input} form-control`}
        placeholder="Customer Name"
        aria-label="Customer Name"
        value={customerName}
        onChange={(e) => handleInput(e.target.value)}
      />
      <div className="input-group-append">
        <button
          className={custNameStatus ? horizontalFilterStyles.save_btn_active : horizontalFilterStyles.save_btn}
          type="button"
          onClick={handleLocalStorage}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CustomerName;
