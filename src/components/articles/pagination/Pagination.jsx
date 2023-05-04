import React from 'react';
import {Pagination} from "antd";
import PropTypes from 'prop-types';

import styles from "./Pagination.module.scss";

function PaginationBlock (props) {
    const {
        current,
        onChange,
        total,
    } = props;

    return (
        <div className={styles.pagination}>
            <Pagination
                current={current}
                onChange={onChange}
                total={total}
                hideOnSinglePage
                pageSize="5"
                size="small"
                showSizeChanger={false}
            />
        </div>
    )
}

PaginationBlock.propTypes = {
    current: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired,
}

export default PaginationBlock;
