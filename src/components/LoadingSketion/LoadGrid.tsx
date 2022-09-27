import React from 'react';
import Skeleton from 'react-loading-skeleton';
import "./style.css"

interface LoadGridProp {
    grid?: number
}

export function LoadGrid(props: LoadGridProp) {
    const { grid } = props;
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    return (
        <div>
            <ul
                style={grid ? { gridTemplateColumns: `repeat(${grid}, 1fr)` } : {}}
                className="load_grid_list"
            >
                {
                    arr.map(i => (
                        <li key={i} className="load_grid_list_item">
                            <div className="load_grid_list_item_img">
                                <Skeleton width={"100%"} height={"100%"} />
                            </div>
                            <div className="load_grid_list_item_detail">
                                <div className="name">
                                    <Skeleton width={"100%"} height={"100%"} />
                                </div>
                                <div className="address">
                                    <Skeleton width={"100%"} height={"100%"} />
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default LoadGrid;