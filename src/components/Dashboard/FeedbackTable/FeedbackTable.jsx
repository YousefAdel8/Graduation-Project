import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table,Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import styles from './FeedbackTable.module.css'

const En = true;
const fieldTranslations = {
    'name': 'الاسم',
    'age': 'العمر',
    'address': 'العنوان'
  };
const tableData = [
  {
    key: '1',
    name: En?'John Brown':'جون برون',
    age: 32,
    address: En?'New York No. 1 Lake Park':'نيويورك نو. 1 ليك بارك',
  },
  {
    key: '2',
    name: En?'Joe Black':'جوي بلاك',
    age: 42,
    address: En?'London No. 1 Lake Park':'لندن نو. 1 ليك بارك',
  },
  {
    key: '3',
    name: En?'Jim Green':'جيم جرين',
    age: 32,
    address: En?'Sydney No. 1 Lake Park':'سيدن نو. 1 ليك بارك',
  },
  {
    key: '4',
    name: En?'Jim Red':'جيم ريد',
    age: 32,
    address: En?'London No. 2 Lake Park':'لندن نو. 2 ليك بارك',
  },
  {
    key: '5',
    name: En?'Jim Red':'جيم ريد',
    age: 32,
    address: En?'London No. 2 Lake Park':'لندن نو. 2 ليك بارك',
  },
  {
    key: '6',
    name: En?'Jim Red':'جيم ريد',
    age: 32,
    address: En?'London No. 2 Lake Park':'لندن نو. 2 ليك بارك',
  },
  {
    key: '7',
    name: En?'Jim Red':'جيم ريد',
    age: 32,
    address: En?'London No. 2 Lake Park':'لندن نو. 2 ليك بارك',
  },
  {
    key: '8',
    name: En?'Jim Red':'جيم ريد',
    age: 32,
    address: En?'London No. 2 Lake Park':'لندن نو. 2 ليك بارك',
  },    
  {
    key: '9',
    name: En?'Jim Red':'جيم ريد',
    age: 32,
    address: En?'London No. 2 Lake Park':'لندن نو. 2 ليك بارك',
  },
  {
    key: '10',
    name: En?'Jim Red':'جيم ريد',
    age: 32,
    address: En?'London No. 2 Lake Park':'لندن نو. 2 ليك بارك',
  },
  {
    key: '11',
    name: En?'Jim Red':'جيم ريد',
    age: 32,
    address: En?'London No. 2 Lake Park':'لندن نو. 2 ليك بارك',
  },
  {
    key: '12',
    name: En?'Jim Red':'جيم ريد',
    age: 32,
    address: En?'London No. 2 Lake Park':'لندن نو. 2 ليك بارك',
  },
  {
    key: '13',
    name: En?'Jim Red':'جيم ريد',
    age: 32,
    address: En?'London No. 2 Lake Park':'لندن نو. 2 ليك بارك',
  },
  
];

const confirmDelete=(e)=>{
  console.log("delete");
}
const cancelDelete=(e)=>{
  console.log("cancel");
}
const TableSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={En?`Search ${dataIndex}`:`بحث عن ${fieldTranslations[dataIndex]}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            {En?"Search":"بحث"}
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            {En?"Reset":"اعادة تعيين"}
          </Button>
         
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            {En?"close":"اغلاق"}
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: En?'Name':'الاسم',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: En?'Age':'العمر',
      dataIndex: 'age',
      key: 'age',
      width: '20%',
      ...getColumnSearchProps('age'),
    },
    {
      title: En?'Address':'العنوان',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'),
      
    },
    {
      title: En?'Action':'العمليات',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title={En?"Delete the report?":"حذف التقرير؟"}
            description={En?"Are you sure to delete this report?":"هل انت متاكد من حذف هذا التقرير؟"}
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
            okText={En?"Yes":"نعم"}
            cancelText={En?"No":"لا"}
          >
            <Button danger>{En?"Delete":"حذف"}</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  
  return(
    <div className='w-100 mb-5' style={{    height: '450px',  }}>
      <Table 
        columns={columns} 
        dataSource={tableData} 
        scroll={{ 
          x: 500,
        }} 
        pagination={{
          pageSize: 5,
          position: ['bottomCenter'], 
          className: 'custom-pagination'
        }}
        className={`w-100 ${styles.tableFeedback}`} 
        style={{    height: '450px',  }}      
      />
    </div>
  )
  
};
export default TableSearch;