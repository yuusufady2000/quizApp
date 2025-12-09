

const Filter = ({filter, onFilterChange}) => {
    return ( <div>
         <input type="text" value={filter} placeholder="Filter quiz by name " 
        onChange={(e) => onFilterChange(e.target.value)}/>
    </div> );
}
 
export default Filter;