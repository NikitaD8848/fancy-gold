import { useEffect } from 'react';
import horizontalFilterStyles from '../../../styles/components/horizontalFilter.module.scss';

const SortBy = ({ sortBy, handleSortBy }: any) => {
  const colour: any = localStorage.getItem('colour');

  useEffect(() => {
    localStorage.setItem('colour', colour || 'Yellow');
  }, []);
  const setColournInLocalStorage = (value: any) => {
    localStorage.setItem('colour', value);
  };
  return (
    <>
      <div className="d-flex justify-content-center ">
        <select
          className={`form-select form-select ${horizontalFilterStyles.sort_by_select} `}
          defaultValue={colour}
          onChange={(e) => {
            setColournInLocalStorage(e.target.value);
          }}
        >
          <option value="Yellow">Yellow</option>
          <option value="White">White</option>
          <option value="Pink">Pink</option>
        </select>
        <select
          className={`form-select form-select ${horizontalFilterStyles.sort_by_select} `}
          value={sortBy}
          onChange={(e) => handleSortBy(e.target.value)}
        >
          <option value="latest" selected>
            Latest Produts
          </option>
          <option value="oldest">Oldest Products</option>
          <option value="sequence">Sequence</option>
          <option value="weight_range">Weight Range</option>
        </select>
      </div>
    </>
  );
};

export default SortBy;
