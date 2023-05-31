import React, { ReactElement } from 'react';
import Skeleton from 'react-loading-skeleton';
import "./style.css"

interface LoadGridProp {
    grid?: number,
    item_count?: number
}

export function LoadGrid(props: LoadGridProp) {
    const { grid, item_count } = props;
    const item = item_count ?? 12
    const renderGridChild = () => {
        let GridChildElement: ReactElement[] = []
        for (var i = 0; i < item; i++) {
            const newChild =
                <li style={grid === 1 ? {
                    height: "116px",
                    padding: "8px 0px"
                } : {}}
                    key={i} className="load_grid_list_item">
                    <div style={grid === 1 ? {
                        height: "100px",
                    } : {}} className="load_grid_list_item_img">
                        <Skeleton width={"100%"} height={"100%"} />
                    </div>
                    <div style={grid === 1 ? {
                        display: "none"
                    } : {}}
                        className="load_grid_list_item_detail">
                        <div className="name">
                            <Skeleton width={"100%"} height={"100%"} />
                        </div>
                        <div className="address">
                            <Skeleton width={"100%"} height={"100%"} />
                        </div>
                    </div>
                </li>
            GridChildElement.push(newChild)
        }
        return GridChildElement
    }
    return (
        <div>
            <ul
                style={grid ? { gridTemplateColumns: `repeat(${grid}, 1fr)` } : {}}
                className="load_grid_list"
            >
                {renderGridChild()}
            </ul>
        </div>
    );
}

export default LoadGrid;