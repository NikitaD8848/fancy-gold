import Image from 'next/image';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FaEye } from 'react-icons/fa6';
import { CONSTANTS } from '../../services/config/app-config';
import styles from '../../styles/components/cartProductDetail.module.scss';

const CartProductDetail = ({ data, handleEditWastage, onEditWastage }: any) => {
  const [editWastage, setEsditWastage] = useState(false);
  const [imagePreview, setImagePreview] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handlePreviewModal = () => {
    console.log('data111');
    setImagePreview(true);
  };

  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <div className={`row ${styles?.font_12}`}>
      <div className="col-lg-4 p-3 text-center  ">
        <div
          className="d-inline-block position-relative cursor-pointer"
          style={{ width: '100px', height: '100px' }}
          onClick={() => handlePreviewModal()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image loader={imageLoader} src={data?.image !== null && data?.image} width={100} height={100} sizes="100vw" alt="Item Image" />
          {isHovered && (
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center">
              <FaEye size={24} className="text-white" />
            </div>
          )}
        </div>
      </div>
      <div className="col-lg-4 d-flex justify-content-center">
        <div className="mt-2">
          <Image
            loader={imageLoader}
            src={data?.bar_code_image !== null && data?.bar_code_image}
            width={100}
            height={30}
            sizes="100vw"
            alt="Item Image"
          />
          <p>
            Product Code : <br />
            {data?.item_code}
            <br />
            <span className={styles.bom_factory_code}>BOM Factory Code : {data?.bom_factory_code}</span>
            <br />
            Weight :{data?.weight_per_unit} gm
          </p>
        </div>
      </div>
      <div className="col-lg-4 d-flex justify-content-center">
        {/* <div className="text-center mt-2">
          Wastage :
          {editWastage ? (
            <textarea
              className="w-75"
              value={data?.wastage}
              onChange={(e) => {
                onEditWastage(e.target.value);
              }}
              rows={1}
            />
          ) : (
            <p className="m-0">{data?.wastage}</p>
          )}
          {editWastage ? (
            <button
              className={`btn btn-link ${styles.edit_btn}`}
              onClick={() => {
                handleEditWastage(data), setEsditWastage(false);
              }}
            >
              Update wastage
            </button>
          ) : (
            <button className={`btn btn-link ${styles.edit_btn}`} onClick={() => setEsditWastage(true)}>
              Edit Message
            </button>
          )}
        </div> */}
        <div className="d-flex justify-content-center align-items-center">{data?.remark}</div>;
      </div>
      <Modal show={imagePreview} onHide={() => setImagePreview(false)} centered size="lg">
        <Modal.Header closeButton />
        <Modal.Body className="d-flex justify-content-center align-items-center">
          <Image
            loader={imageLoader}
            src={data?.image !== null && data?.image}
            width={500} // Adjust as needed
            height={500}
            sizes="100vw"
            alt="Item-Image-Preview"
            className="w-100 img-fluid"
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CartProductDetail;
