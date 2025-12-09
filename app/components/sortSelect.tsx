

const SortSelect = ({sortBy, onChange}) => {
    return ( <div>
        <select value={sortBy} id="sort" onChange={(e) => onSortChange(e.target.value)}>
            <option value=""></option>
        </select>
    </div> );
}
 
export default SortSelect;