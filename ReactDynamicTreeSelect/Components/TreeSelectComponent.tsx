import * as React from "react";
import { useState } from 'react';
import { TreeSelect } from 'antd';

interface ITreeSelectSampleProps {
    treeData: {}[]
}

const CustomTreeComponent: React.FunctionComponent<ITreeSelectSampleProps> = (props) => {
    const [value, setValue] = useState<string>();

    const onChange = (newValue: string) => {
        setValue(newValue);
    };

    return (
        <TreeSelect
            showSearch
            style={{ width: '100%' }}
            value={value}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Please select"
            allowClear
            treeDefaultExpandAll
            onChange={onChange}
            treeData={props.treeData}
        />
    );
}

export default CustomTreeComponent;