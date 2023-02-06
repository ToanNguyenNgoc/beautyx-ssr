import { useBranches } from 'features/Search/hook';
import { pramsBranchV3 } from 'params-query';
import { ParamBranchV3 } from 'params-query/param.interface';
import style from './search-result.module.css'
import React from 'react';

function TabBranch({ keyword }: { keyword: string }) {
    const PARAMS_BRANCH:ParamBranchV3 = {
        ...pramsBranchV3,
        "keyword":keyword
    }
    const {} = useBranches(PARAMS_BRANCH, true)
    return (
        <div>

        </div>
    );
}

export default TabBranch;