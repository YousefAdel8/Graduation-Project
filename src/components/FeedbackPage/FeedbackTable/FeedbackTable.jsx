import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table,Rate } from 'antd';
import Highlighter from 'react-highlight-words';

const En = false;
const fieldTranslations = {
    'name': 'الاسم',
    'service': 'نوع الخدمة',
    'resolutionTime': 'وقت التحليل',
    'date': 'التاريخ',
    'rating': 'التقييم',
  };
  const tableData = [
    {
      key: '1',
      name: En ? 'John Brown' : 'جون براون',
      service: En ? 'Street Light' : 'ضوء الشارع',
      resolutionTime: En ? '1 hour' : 'ساعة واحدة',
      date: '01/01/2023',
      rating: '3',
    },
    {
      key: '2',
      name: En ? 'Alice Smith' : 'أليس سميث',
      service: En ? 'Water Leakage' : 'تسرب المياه',
      resolutionTime: En ? '2 hours' : 'ساعتين',
      date: '03/02/2023',
      rating: '4',
    },
    {
      key: '3',
      name: En ? 'Michael Johnson' : 'مايكل جونسون',
      service: En ? 'Road Repair' : 'إصلاح الطرق',
      resolutionTime: En ? '5 hours' : 'خمس ساعات',
      date: '15/02/2023',
      rating: '5',
    },
    {
      key: '4',
      name: En ? 'Sara Connor' : 'سارة كونور',
      service: En ? 'Electricity Outage' : 'انقطاع الكهرباء',
      resolutionTime: En ? '3 hours' : 'ثلاث ساعات',
      date: '20/03/2023',
      rating: '2',
    },
    {
      key: '5',
      name: En ? 'James Wilson' : 'جيمس ويلسون',
      service: En ? 'Garbage Collection' : 'جمع القمامة',
      resolutionTime: En ? '6 hours' : 'ست ساعات',
      date: '10/04/2023',
      rating: '4',
    },
    {
      key: '6',
      name: En ? 'Emma Watson' : 'إيما واتسون',
      service: En ? 'Tree Trimming' : 'تقليم الأشجار',
      resolutionTime: En ? '4 hours' : 'أربع ساعات',
      date: '25/04/2023',
      rating: '5',
    },
    {
      key: '7',
      name: En ? 'Liam Miller' : 'ليام ميلر',
      service: En ? 'Sewer Blockage' : 'انسداد المجاري',
      resolutionTime: En ? '8 hours' : 'ثماني ساعات',
      date: '05/05/2023',
      rating: '3',
    },
    {
      key: '8',
      name: En ? 'Olivia Davis' : 'أوليفيا ديفيس',
      service: En ? 'Pothole Repair' : 'إصلاح الحفر',
      resolutionTime: En ? '7 hours' : 'سبع ساعات',
      date: '12/06/2023',
      rating: '4',
    },
    {
      key: '9',
      name: En ? 'Noah Carter' : 'نوح كارتر',
      service: En ? 'Gas Leak' : 'تسرب الغاز',
      resolutionTime: En ? '30 minutes' : '30 دقيقة',
      date: '20/07/2023',
      rating: '5',
    },
    {
      key: '10',
      name: En ? 'Sophia White' : 'صوفيا وايت',
      service: En ? 'Internet Issue' : 'مشكلة الإنترنت',
      resolutionTime: En ? '2 hours' : 'ساعتين',
      date: '03/08/2023',
      rating: '2',
    },
    {
      key: '11',
      name: En ? 'Benjamin Harris' : 'بنيامين هاريس',
      service: En ? 'Street Cleaning' : 'تنظيف الشوارع',
      resolutionTime: En ? '5 hours' : 'خمس ساعات',
      date: '14/09/2023',
      rating: '4',
    },
    {
      key: '12',
      name: En ? 'Charlotte Brown' : 'شارلوت براون',
      service: En ? 'Park Maintenance' : 'صيانة الحدائق',
      resolutionTime: En ? '6 hours' : 'ست ساعات',
      date: '27/10/2023',
      rating: '5',
    },
    {
      key: '13',
      name: En ? 'Ethan Martinez' : 'إيثان مارتينيز',
      service: En ? 'Traffic Signal Repair' : 'إصلاح إشارات المرور',
      resolutionTime: En ? '3 hours' : 'ثلاث ساعات',
      date: '05/11/2023',
      rating: '3',
    },
  ];
  

const confirmDelete=(e)=>{
  console.log("delete");
}
const cancelDelete=(e)=>{
  console.log("cancel");
}
const FeedbackTable = () => {
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
      title: En?'User Name':'اسم المستخدم',
      dataIndex: 'name',
      key: 'name',
      //width: '30%',
      ...getColumnSearchProps('name'),
      //sorter: (a, b) => a.address.length - b.address.length,
      //sortDirections: ['descend', 'ascend'],
    },
    {
      title: En?'Service Type':'نوع الخدمة',
      dataIndex: 'service',
      key: 'service',
      //width: '20%',
      ...getColumnSearchProps('service'),
    },
    {
      title: En?'Resolution Time':'وقت الحل',
      dataIndex: 'resolutionTime',
      key: 'resolutionTime',
      //width: '20%',
    },
    {
      title:En?'Date Submitted':'تاريخ الاضافة',
      dataIndex: 'date',
      key: 'date',
      //width: '20%',
    },
    {
      title: En?'Rate':'تقييم المستخدم',
      dataIndex: 'rate',
      key: 'rate',
      //width: '20%',
      
      render: (_, record) => (
        <space style={{whiteSpace:'nowrap'}}> 
        <Rate disabled defaultValue={record.rating} />
        </space>
      ),
    },
    
    /*{
      title: En?'Comment':'التعليق',
      dataIndex: 'comment',
      key: 'comment',
      //width: '20%',
    },*/
    /*{
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
    },*/
  ];
  
  return(
    <div className='w-100 mb-3' >
      <Table 
        columns={columns} 
        dataSource={tableData} 
        scroll={{ 
          x: 500,
        }} 
        pagination={{
          pageSize: 7,
          position: ['bottomCenter'], 
          className: 'custom-pagination'
        }}    
      />
    </div>
  )
  
};
export default FeedbackTable;