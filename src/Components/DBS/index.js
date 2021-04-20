import React, { useState, useEffect } from 'react';
import './index.css';
import { Select, Button, Modal, message, Table, Space } from 'antd';
const { Option } = Select;

function DBS() {

    const [teamValue, setTeamValue] = useState('');
    const [databaseList, setDatabaseList] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isTechModalVisible, setIsTechModalVisible] = useState(false);
    const [businessMetadataContent, setBusinessMetadataContent] = useState(null);
    const [businessTerm, setBusinessTerm] = useState('');
    const [technicalMetadataContent, setTechnicalMetadataContent] = useState(null);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showTechModal = () => {
        setIsTechModalVisible(true);
    };

    const handleTechOk = () => {
        setIsTechModalVisible(false);
    };

    const handleTechCancel = () => {
        setIsTechModalVisible(false);
    };

    // change value while value changed
    const onChange = value => {
        setTeamValue(value);
    }

    // get database list info
    const getDatabaseList = () => {
        setDatabaseList([
            {
                value: 'team1',
            },
            {
                value: 'team2',
            },
            {
                value: 'team3',
            },
            {
                value: 'team4',
            },
            {
                value: 'team5',
            },
        ]);
        console.log("1111");
    }

    // search business terms about the chosen database
    const searchInformation = () => {
        if (teamValue && teamValue !== '') {
            setBusinessMetadataContent(null);
            showModal();
            // get business metadata from database
            setBusinessMetadataContent([
                {
                    key: '1',
                    businessTerm: 'Business Term1',
                    businessDesc: 'Business Desc1',
                    businessType: 'Business Type1',
                    propertyId: '1',
                },
                {
                    key: '2',
                    businessTerm: 'Business Term2',
                    businessDesc: 'Business Desc2',
                    businessType: 'Business Type2',
                    propertyId: '2',
                },
                {
                    key: '3',
                    businessTerm: 'Business Term3',
                    businessDesc: 'Business Desc3',
                    businessType: 'Business Type3',
                    propertyId: '3',
                },
                {
                    key: '4',
                    businessTerm: 'Business Term4',
                    businessDesc: 'Business Desc4',
                    businessType: 'Business Type4',
                    propertyId: '4',
                },
                {
                    key: '5',
                    businessTerm: 'Business Term5',
                    businessDesc: 'Business Desc5',
                    businessType: 'Business Type5',
                    propertyId: '5',
                },
                {
                    key: '6',
                    businessTerm: 'Business Term6',
                    businessDesc: 'Business Desc6',
                    businessType: 'Business Type6',
                    propertyId: '6',
                },
                {
                    key: '7',
                    businessTerm: 'Business Term7',
                    businessDesc: 'Business Desc7',
                    businessType: 'Business Type7',
                    propertyId: '7',
                },
            ]);
        } else {
            message.error('Value is empty!');
        }
    }

    // search technical term about the business term
    const searchTechnicalTerm = (propertyId, businessTerm) => {
        setTechnicalMetadataContent(null);
        setBusinessTerm(businessTerm)
        showTechModal();
        // get technical metadata from database
        setTechnicalMetadataContent([
            {
                key: '1',
                technicalTerm: 'Technical Term1',
                technicalDesc: 'Technical Desc1',
                technicalType: 'Technical Type1',
            },
        ]);
    }

    useEffect(() => {
        getDatabaseList();
    }, []);

    const businessMetadataColumn = [
        {
            title: 'Business Term',
            dataIndex: 'businessTerm',
            key: 'businessTerm',
        },
        {
            title: 'Business Description',
            dataIndex: 'businessDesc',
            key: 'businessDesc',
        },
        {
            title: 'Business Type',
            dataIndex: 'businessType',
            key: 'businessType',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type='primary' shape='round' onClick={() => searchTechnicalTerm(record.propertyId, record.businessTerm)}>
                        View Associated Tech Term
                    </Button>
                </Space>
            ),
        },
    ];

    const technicalMetadataColumn = [
        {
            title: 'Technical Term',
            dataIndex: 'technicalTerm',
            key: 'technicalTerm',
        },
        {
            title: 'Technical Description',
            dataIndex: 'technicalDesc',
            key: 'technicalDesc',
        },
        {
            title: 'Technical Type',
            dataIndex: 'technicalType',
            key: 'technicalType',
        },
    ];

    return (
        <div className="container">
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Choose DB"
                optionFilterProp="children"
                onChange={onChange}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {databaseList.map((element, index) =>
                    <Option value={element.value}>{element.value}</Option>
                )}
            </Select>
            <br />
            <br />
            <br />
            <Button type="primary" shape="round" onClick={searchInformation}>
                Browse Business Terms
            </Button>
            <Button type="primary" shape="round" style={{ marginLeft: '10px' }}>
                Add Business Terms
            </Button>

            <Modal title={teamValue} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} maskClosable={false} width={800}>
                <Table columns={businessMetadataColumn} dataSource={businessMetadataContent} pagination={{ pageSize: 5 }} />
            </Modal>

            <Modal title={businessTerm} visible={isTechModalVisible} onOk={handleTechOk} onCancel={handleTechCancel} maskClosable={false} width={600}>
                <Table columns={technicalMetadataColumn} dataSource={technicalMetadataContent} pagination={false} />
            </Modal>
        </div>
    );
}

export default DBS;
