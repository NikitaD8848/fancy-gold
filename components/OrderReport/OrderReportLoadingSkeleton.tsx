import React from 'react';
import { Card, Placeholder, Table } from 'react-bootstrap';
import styles from '../../styles/components/orderReport.module.scss';
const OrderReportLoadingSkeleton = ({ Title }: any) => {
  return (
    <div className="containe-fluid">
      <h2 className="theme-blue text-center mt-4 ">{Title}</h2>
      <div className="mt-4">
        <Table striped bordered hover size="sm" className="m-3">
          <thead>
            <tr>
              {[...Array(7)].map((_, colIndex) => (
                <th key={colIndex} className={styles.skeletontableHeader}></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_, rowIndex) => (
              <tr key={rowIndex}>
                {[...Array(7)].map((_, colIndex) => (
                  <td key={colIndex}>
                    <Placeholder as={Card.Text} animation="glow">
                      <Placeholder xs={8} size="sm" />
                    </Placeholder>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default OrderReportLoadingSkeleton;
