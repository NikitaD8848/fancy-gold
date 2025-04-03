import dynamic from 'next/dynamic';
import Image from 'next/image';
import useOrderListHook from '../../hooks/OrderListHooks/useOrderListHook';
import image from '../../public/assets/images/no-data.png';
import ComponentErrorHandler from '../ComponentErrorHandler';
import OrderReportLoadingSkeleton from '../OrderReport/OrderReportLoadingSkeleton';
const ListingTable = dynamic(() => import('./ListingTable'));

const OrderList = () => {
  const { orderListData, isLoading, errorMessage, handleSelectOrder, deleteBulkOrder }: any = useOrderListHook();
  const headers = [
    { field_name: '', header: '' },
    { field_name: 'transaction_date', header: 'Order Date' },
    { field_name: 'name', header: 'Order Id' },
    { field_name: 'customer_name', header: 'Customer Name' },
    { field_name: 'purity', header: 'Purity' },
    { field_name: 'total_weight', header: 'Total Ordered Weight' },
    { field_name: 'delivery_date', header: 'Due Date' },
    { field_name: 'status', header: 'Status' },
  ];

  const showOrderListingSection: any = () => {
    if (isLoading) {
      return (
        <>
          <div className="container">
            <OrderReportLoadingSkeleton />
          </div>
        </>
      );
    }
    if (errorMessage) {
      return <ComponentErrorHandler error={errorMessage} />;
    }
    if (orderListData) {
      if (orderListData?.length > 0) {
        return (
          <ListingTable
            headers={headers}
            tableData={orderListData}
            handleSelectOrder={handleSelectOrder}
            handleDeleteOrder={deleteBulkOrder}
          />
        );
      }

      if (orderListData?.length === 0) {
        return (
          <div className={`text-center `}>
            <div className="p-3" style={{ fontSize: '40px' }}>
              <Image src={image} width={200} height={200} alt="Error Image" />
            </div>
            <div className="text-center">
              <h2 className="theme-blue">Sorry, No Data Found</h2>
            </div>
          </div>
        );
      }
    }
  };

  return <>{showOrderListingSection()}</>;
};

export default OrderList;
