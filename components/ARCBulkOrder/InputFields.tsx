const InputFields = ({ formData, handleChange, purityList }: any) => {
  return (
    <>
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="fs-14 pt-1">
            Melting<span className="text-danger">*</span>
          </div>
          <select name={`purity`} className={`w-100 form-control form-control-sm px-1`} value={formData?.purity} onChange={handleChange}>
            <option value="" className="px-1">
              Select purity
            </option>
            {purityList?.map((item: any, idx: any) => (
              <option key={idx} value={item?.name} className="px-1">
                {item?.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12 col-md-6">
          <div className="fs-14 pt-1">Customer</div>
          <input
            type="text"
            name="customer"
            className={`w-100 form-control form-control-sm px-1`}
            value={formData?.customer}
            onChange={handleChange}
          />
        </div>
        <div className="col-12 col-md-6">
          <div className="fs-14 pt-1">Description</div>
          <input
            type="text"
            name="description"
            className={`w-100 form-control form-control-sm px-1`}
            value={formData?.description}
            onChange={handleChange}
          />
        </div>

        <div className="col-12 col-md-6">
          <div className="fs-14 pt-1">
            Date<span className="text-danger">*</span>
          </div>
          <input
            type="date"
            name="transaction_date"
            className={`w-100 form-control form-control-sm px-1`}
            value={formData?.transaction_date}
            onChange={handleChange}
          />
        </div>
        <div className="col-12 col-md-6">
          <div className="fs-14 pt-1">
            Colour<span className="text-danger">*</span>
          </div>
          <select name={`color`} className={`w-100 form-control form-control-sm px-1`} value={formData?.color} onChange={handleChange}>
            <option value="" className="px-1">
              Select colour
            </option>
            <option value="Yellow">Yellow</option>
            <option value="Rose">Rose</option>
            <option value="White">White</option>
            <option value="Pink">Pink</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default InputFields;
