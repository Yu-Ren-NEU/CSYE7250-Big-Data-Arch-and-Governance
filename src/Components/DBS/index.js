import React, { useState, useEffect } from 'react';
import './index.css';
import { Select, Button, Modal, message, Table, Space, Tooltip } from 'antd';
import { getDatabaseListRequest, getBusinessTermsRequest, getNodesRequest, getRelationshipsRequest, getPropertiesRequest } from './api';
const { Option } = Select;

function DBS() {

    const [dbName, setDbName] = useState('');
    const [domainName, setDomainName] = useState('');
    const [databaseList, setDatabaseList] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isNodeModalVisible, setIsNodeModalVisible] = useState(false);
    const [isRelModalVisible, setIsRelModalVisible] = useState(false);
    const [isProModalVisible, setIsProModalVisible] = useState(false);
    const [businessTerms, setBusinessTerms] = useState(null);
    const [nodeName, setNodeName] = useState('');
    const [NodeModalContent, setNodeModalContent] = useState(null);
    const [RelModalContent, setRelModalContent] = useState(null);
    const [ProModalContent, setProModalContent] = useState(null);

    // handle the modal for showing business terms
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // handle the modal for showing node
    const showNodeModal = () => {
        setIsNodeModalVisible(true);
    };

    const handleNodeOk = () => {
        setIsNodeModalVisible(false);
    };

    const handleNodeCancel = () => {
        setIsNodeModalVisible(false);
    };

    // handle the modal for showing relationship
    const showRelModal = () => {
        setIsRelModalVisible(true);
    };

    const handleRelOk = () => {
        setIsRelModalVisible(false);
    };

    const handleRelCancel = () => {
        setIsRelModalVisible(false);
    };

    // handle the modal for showing property
    const showProModal = () => {
        setIsProModalVisible(true);
    };

    const handleProOk = () => {
        setIsProModalVisible(false);
    };

    const handleProCancel = () => {
        setIsProModalVisible(false);
    };

    // change value while value changed
    const onChange = value => {
        const e = JSON.parse(value);
        setDbName(e.DBName);
        setDomainName(e.DomainName);
    }

    // get database list info
    const getDatabaseList = () => {
        getDatabaseListRequest().then(response => {
            console.log("********database list********");
            console.log(response.data.text);
            console.log("********database list********");
            let databaseList = [];
            response.data.text.forEach((e, i) => {
                databaseList.push({
                    key: `${i}`,
                    DBName: e.DBName,
                    DomainName: e.DomainName,
                })
            });
            setDatabaseList(databaseList);
        }).catch(err => {
            message.error('Network is unstable.')
        })
    }

    // search all of the business terms
    const searchInformation = () => {
        setBusinessTerms(null);
        showModal();
        // get business metadata from database
        getBusinessTermsRequest().then(response => {
            console.log("********business terms information********");
            console.log(response.data.text);
            console.log("********business terms information********");
            let businessTerms = [];
            response.data.text.forEach((e, i) => {
                businessTerms.push({
                    key: `${i}`,
                    businessTerm: e.DomainName,
                    businessDesc: e.BusinessDesc,
                    businessType: e.BusType,
                    propertyId: e.PropertyId
                });
            });
            setBusinessTerms(businessTerms);
        }).catch(err => {
            message.error('Network is unstable.')
        })
    }

    // search all nodes about the chosen database
    const searchNodeInformation = () => {
        if (domainName && domainName !== '') {
            setNodeModalContent(null);
            showNodeModal();
            // get nodes information from database
            getNodesRequest(domainName).then(response => {
                console.log("********nodes information********");
                console.log(response.data.text);
                console.log("********nodes information********");
                let NodeModalContent = [];
                response.data.text.forEach((e, i) => {
                    NodeModalContent.push({
                        key: `${i}`,
                        label: e.Label,
                        counts: e.Counts,
                        nodeId: e.NodeId,
                    });
                });
                setNodeModalContent(NodeModalContent);
            }).catch(err => {
                message.error('Network is unstable.')
            })
        } else {
            message.error('Value is empty!');
        }
    }

    // search relationship about the node
    const searchRelationship = (nodeId, nodeName) => {
        setRelModalContent(null);
        setNodeName(nodeName)
        showRelModal();
        // get relationship of the node from database
        getRelationshipsRequest(nodeId).then(response => {
            console.log("********relationships information********");
            console.log(response.data.text);
            console.log("********relationships information********");
            let RelModalContent = [];
            response.data.text.forEach((e, i) => {
                RelModalContent.push({
                    key: `${i}`,
                    childNode: e.ChildNode,
                    relDesc: e.RelDesc,
                });
            });
            setRelModalContent(RelModalContent);
        }).catch(err => {
            message.error('Network is unstable.')
        })
    }

    // search property about the node
    const searchProperty = (nodeId, nodeName) => {
        setProModalContent(null);
        setNodeName(nodeName)
        showProModal();
        // get properties of the node from database
        getPropertiesRequest(nodeId).then(response => {
            console.log("********properties information********");
            console.log(response.data.text);
            console.log("********properties information********");
            let ProModalContent = [];
            response.data.text.forEach((e, i) => {
                ProModalContent.push({
                    key: `${i}`,
                    techTerm: e.TechTerm,
                    uniqCons: e.UniqueConstraint,
                    existCons: e.ExistingConstraint,
                });
            });
            setProModalContent(ProModalContent);
        }).catch(err => {
            message.error('Network is unstable.')
        })
    }

    // Init => Get database list
    useEffect(() => {
        getDatabaseList();
    }, []);

    // Column for business terms
    const businessTermsColumn = [
        {
            title: 'Business Term',
            dataIndex: 'businessTerm',
            key: 'businessTerm',
            width: 150,
        },
        {
            title: 'Business Description',
            dataIndex: 'businessDesc',
            key: 'businessDesc',
            render: (text, record) => (
                <Tooltip title={record.businessDesc}>
                    <span className="ellipsis">{record.businessDesc}</span>
                </Tooltip>
            ),
        },
        {
            title: 'Business Type',
            dataIndex: 'businessType',
            key: 'businessType',
            width: 150,
        },
        {
            title: 'Technical Term',
            dataIndex: 'technicalTerm',
            key: 'technicalTerm',
            width: 150,
        },
        {
            title: 'Technical Description',
            dataIndex: 'technicalDesc',
            key: 'technicalDesc',
            width: 180,
        },
    ];

    // Columns for nodes
    const nodeModalColumn = [
        {
            title: 'Label',
            dataIndex: 'label',
            key: 'label',
        },
        {
            title: 'Counts',
            dataIndex: 'counts',
            key: 'counts',
        },
        {
            title: 'Action',
            key: 'action',
            width: 250,
            render: (text, record) => (
                <Space size="middle">
                    <Button type='primary' shape='round' onClick={() => searchRelationship(record.nodeId, record.label)}>
                        Relationships
                    </Button>
                    <Button type='primary' shape='round' onClick={() => searchProperty(record.nodeId, record.label)}>
                        Properties
                    </Button>
                </Space>
            ),
        },
    ];

    // Columns for relationship
    const relModalColumn = [
        {
            title: 'Child Node',
            dataIndex: 'childNode',
            key: 'childNode',
        },
        {
            title: 'Relationship Description',
            dataIndex: 'relDesc',
            key: 'relDesc',
        },
    ];

    // Columns for property
    const proModalColumn = [
        {
            title: 'Technical Term',
            dataIndex: 'techTerm',
            key: 'techTerm',
        },
        {
            title: 'Unique Constraint',
            dataIndex: 'uniqCons',
            key: 'uniqCons',
        },
        {
            title: 'Existing Constraint',
            dataIndex: 'existCons',
            key: 'existCons',
        },
    ];

    return (
        <div className="container">
            <Button type="primary" shape="round" style={{ width: 350 }} onClick={searchInformation}>
                Browse Metadata
            </Button>
            <br />
            <br />
            <br />
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
                    <Option key={index} value={JSON.stringify(element)}>{element.DBName}</Option>
                )}
            </Select>
            <Button type="primary" shape="round" style={{ marginLeft: '15px' }} onClick={searchNodeInformation}>
                Browse Nodes
            </Button>
            <br />
            <br />
            <br />
            <br />
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Domain"
                optionFilterProp="children"
                onChange={onChange}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {/* {databaseList.map((element, index) =>
                    <Option key={index} value={JSON.stringify(element)}>{element.DBName}</Option>
                )} */}
                <Option key="1" value="example1">example1</Option>
                <Option key="2" value="example2">example2</Option>
                <Option key="3" value="example3">example3</Option>
                <Option key="4" value="example4">example4</Option>
                <Option key="5" value="example5">example5</Option>
            </Select>
            <Select
                showSearch
                style={{ width: 200, marginLeft: 20 }}
                placeholder="Database"
                optionFilterProp="children"
                onChange={onChange}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {/* {databaseList.map((element, index) =>
                    <Option key={index} value={JSON.stringify(element)}>{element.DBName}</Option>
                )} */}
                <Option key="1" value="example1">example1</Option>
                <Option key="2" value="example2">example2</Option>
                <Option key="3" value="example3">example3</Option>
                <Option key="4" value="example4">example4</Option>
                <Option key="5" value="example5">example5</Option>
            </Select>
            <br />
            <br />
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Business Term"
                optionFilterProp="children"
                onChange={onChange}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {/* {databaseList.map((element, index) =>
                    <Option key={index} value={JSON.stringify(element)}>{element.DBName}</Option>
                )} */}
                <Option key="1" value="example1">example1</Option>
                <Option key="2" value="example2">example2</Option>
                <Option key="3" value="example3">example3</Option>
                <Option key="4" value="example4">example4</Option>
                <Option key="5" value="example5">example5</Option>
            </Select>
            <Select
                showSearch
                style={{ width: 200, marginLeft: 20 }}
                placeholder="Parameter"
                optionFilterProp="children"
                onChange={onChange}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {/* {databaseList.map((element, index) =>
                    <Option key={index} value={JSON.stringify(element)}>{element.DBName}</Option>
                )} */}
                <Option key="1" value="example1">example1</Option>
                <Option key="2" value="example2">example2</Option>
                <Option key="3" value="example3">example3</Option>
                <Option key="4" value="example4">example4</Option>
                <Option key="5" value="example5">example5</Option>
            </Select>
            <br />
            <br />
            <Button type="primary" shape="round">
                DELETE
            </Button>
            <Button type="primary" shape="round" style={{ marginLeft: '15px' }}>
                ADD
            </Button>

            {/* modal for showing Business Terms */}
            <Modal title="Business Terms" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} maskClosable={false} width={1000}>
                <Table columns={businessTermsColumn} dataSource={businessTerms} pagination={{ pageSize: 5 }} />
            </Modal>

            {/* modal for showing nodes */}
            <Modal title={dbName} visible={isNodeModalVisible} onOk={handleNodeOk} onCancel={handleNodeCancel} maskClosable={false} width={600}>
                <Table columns={nodeModalColumn} dataSource={NodeModalContent} pagination={{ pageSize: 5 }} />
            </Modal>

            {/* modal for showing relationship */}
            <Modal title={nodeName} visible={isRelModalVisible} onOk={handleRelOk} onCancel={handleRelCancel} maskClosable={false} width={600}>
                <Table columns={relModalColumn} dataSource={RelModalContent} pagination={{ pageSize: 5 }} />
            </Modal>

            {/* modal for showing property */}
            <Modal title={nodeName} visible={isProModalVisible} onOk={handleProOk} onCancel={handleProCancel} maskClosable={false} width={600}>
                <Table columns={proModalColumn} dataSource={ProModalContent} pagination={{ pageSize: 5 }} />
            </Modal>
        </div>
    );
}

export default DBS;
