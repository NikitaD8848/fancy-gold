import Link from 'next/link';
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import styles from '../../styles/components/orderReport.module.scss';
import OrderFilters from './OrderFilters';
const OrderReportTableMaster = ({ tableBodyData, title }: any) => {
  const tableHeaderArray = [
    'Sr.No',
    'Transaction Date',
    'Customer Name',
    'Order Id',
    'Product',
    'Item Name',
    'Delivery date',
    'Quantity',
    'Total Weight	',
    'Total Net Weight',
    'Status',
  ];
  const [filters, setFilters] = useState<any>({});
  function getUniqueValues(keys: any) {
    let result = keys.map((key: any) => ({
      label: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),
      key: key,
      options: Array.from(new Set(tableBodyData.map((item: any) => item[key]))),
    }));
    return result;
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const filteredData = tableBodyData?.filter((item: any) => {
    return Object.keys(filters).every((key) => !filters[key] || item[key] === filters[key]);
  });
  return (
    <div className="container-fluid">
      <h2 className="theme-blue text-center mt-4">{title}</h2>
      <div className="mt-3 ">
        <OrderFilters
          data={getUniqueValues(['transaction_date', 'delivery_date', 'customer_name', 'name'])}
          handleFilterChange={handleFilterChange}
        />
      </div>
      <div className="mt-4">
        <Table striped responsive>
          <thead>
            <tr>
              {tableHeaderArray?.map((item: any, i: any) => (
                <th key={i} className={styles.tableHeader}>
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 &&
              filteredData?.map((val: any, i: any) => (
                <tr>
                  <td className={styles.tableFont}>{i + 1}</td>
                  <td className={styles.tableFont}>{val.transaction_date}</td>
                  <td className={styles.tableFont}>{val.customer_name}</td>
                  <td className={styles.tableFont}>
                    <Link href={`/order-detail/${val.name}`} legacyBehavior>
                      <a>{val.name.split('-')[val.name.split('-').length - 1]}</a>
                    </Link>
                  </td>
                  <td className={styles.tableFont}>{val.product}</td>
                  <td className={styles.tableFont}>{val.item_name}</td>
                  <td className={styles.tableFont}>{val.delivery_date}</td>
                  <td className={styles.tableFont}>{val.qty}</td>
                  <td className={styles.tableFont}>{val.total_weight}</td>
                  <td className={styles.tableFont}>{val.total_net_weight}</td>
                  <td className={styles.tableFont}>{val.manufacturing_status}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default OrderReportTableMaster;
