import { DateRangePicker } from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const FilterComponent = ({ total, endDate, startDate, sortBy, handleFilter, ...props }) => {

    const selectionRange = {
        startDate,
        endDate,
        key: 'selection',
        color: 'orange',
        autofocus: false,
    }

    const handleSortChange = params => {
        handleFilter({ 'sortBy': params.target.value });
        params.preventDefault();
        params.stopPropagation();
    }
    const handleDateButtonClick = params => {
        props.setHideDate(!props.hideDate);
        params.stopPropagation();
    }
    const handleSelect = ({ selection }) => {
        const newFilter = { endDate, startDate };
        if (startDate !== selection.startDate || endDate !== selection.endDate) {
            newFilter.startDate = selection.startDate;
            newFilter.endDate = selection.endDate;
            handleFilter({ ...newFilter });
        }
    }

    return (
        <div className="filter">
            <div className="sort-order menu">
                Sort By:
                <select name="sort" onChange={handleSortChange} defaultValue={sortBy}>
                    <option value="relevancy">Relevant</option>
                    <option value="popularity">Popular</option>
                    <option value="publishedAt">Publish Date</option>
                </select>
            </div>
            <div className="result-count menu">
                Total Number: {total}
            </div>
            <div className="calendar-wrapper menu">
                Date:
                <button className="date-open" type="click" onClick={handleDateButtonClick}>
                   {(props.hideDate && 
                     `${(selectionRange.startDate).toDateString()} to ${(selectionRange.endDate).toDateString()}`)
                    ||'Close Calendar'     
                   }
                </button>
                <DateRangePicker
                    className={`calendar ${props.hideDate && 'hide' || ''}`}
                    ranges={[selectionRange]}
                    color="orange"
                    onChange={handleSelect}
                    onShownDateChange={e=>{console.log(e,'te'); debugger}}
                    inputRanges={[]}
                    staticRanges={[]}
                />
            </div>

        </div>
    )
}

export default FilterComponent;