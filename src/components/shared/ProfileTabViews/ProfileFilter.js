import React, { useState } from "react";

const ProfileFilter = props => {
    const [sortType, setSortType] = useState("CREATEDAT_ASC");

    const filterOptions = [
        "CREATEDAT_ASC",
        "CREATEDAT_DESC",
        "ALPHABETICAL_ASC",
    ];

    const changeFilter = e => {
        props.filterData(e.target.value);
        setSortType(e.target.value);
    };

    return (
        <select
            key={filterOptions}
            value={sortType}
            onChange={e => changeFilter(e)}
        >
            {filterOptions.map(filter => {
                return (
                    <option key={filter} value={filter}>
                        {filter}
                    </option>
                );
            })}
        </select>
    );
};

export default ProfileFilter;
