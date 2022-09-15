import { useRouter } from 'next/router';
import React from 'react';

function Products(props) {
    const router = useRouter();
    console.log(router)
    return (
        <div>
            Products List
        </div>
    );
}

export default Products;