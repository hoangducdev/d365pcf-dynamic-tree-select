import * as React from "react";
import { useRef, useState, useEffect } from "react";
import CustomTreeComponent from "./TreeSelectComponent";

interface IAppProps {
    context: any
}

const App: React.FunctionComponent<IAppProps> = (props) => {
    const datas: {}[] = [
        {
            value: 'parent 1',
            title: 'parent 1',
            children: [
                {
                    value: 'parent 1-0',
                    title: 'parent 1-0',
                    children: [
                        {
                            value: 'leaf1',
                            title: 'leaf1',
                        },
                        {
                            value: 'leaf2',
                            title: 'leaf2',
                        },
                    ],
                },
                {
                    value: 'parent 1-1',
                    title: 'parent 1-1',
                    children: [
                        {
                            value: 'leaf3',
                            title: <b style={{ color: '#08c' }}>leaf3</b>,
                        },
                    ],
                },
            ],
        },
    ];
    const [stateDatas, setData] = useState(datas);

    const getTextContent = (content: string) => {
        console.log(content);
    }

    const getData = () => {
        const fetchXml = [
            "<fetch>",
            "  <entity name='mypub_country'>",
            "    <attribute name='mypub_name'/>",
            "    <link-entity name='mypub_city' from='mypub_country' to='mypub_countryid'>",
            "      <attribute name='mypub_cityid'/>",
            "      <attribute name='mypub_code'/>",
            "      <attribute name='mypub_name'/>",
            "    </link-entity>",
            "  </entity>",
            "</fetch>"
        ].join("");

        props.context.webAPI.retrieveMultipleRecords("mypub_country", "?fetchXml=" + fetchXml).then((successCallback: any) => {
            debugger;
            if (successCallback.entities.length > 0) {
                let arrayObject: {}[] = [];
                let objectData : any = {};
                objectData['value'] = `${successCallback.entities[0]['mypub_name']}`
                objectData['title'] = `${successCallback.entities[0]['mypub_name']}`
                successCallback.entities.forEach((element: any) => {
                    let obj = {
                        value: `${element['mypub_city1.mypub_name']}`,
                        title: `${element['mypub_city1.mypub_name']}`,
                    }
                    arrayObject.push(obj);
                });
                objectData['children'] = arrayObject;
                setData(preData => [...preData, objectData]);
            }
        }, (errorCallback: any) => {
            debugger;
            setData(preData => [...preData, datas]);
            console.log(errorCallback);
        });

    }

    useEffect(() => getData(), []);

    return (
        <div>
            <CustomTreeComponent treeData={stateDatas} />
        </div>
    )
}

export default App;