import React, { useRef, useState } from 'react';
import { CheckCircleOutlined, ExclamationCircleOutlined, FileExcelOutlined, FilePdfOutlined, SearchOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table,Popconfirm, Tag, Tooltip, DatePicker ,Select  } from 'antd';
import Highlighter from 'react-highlight-words';
import { exportToExcel, exportToPDF } from '../../../utils/exportFunctions';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
const { RangePicker } = DatePicker;



const En = false;
const fieldTranslations = {
    'name': 'الاسم',
    'service': 'نوع الخدمة',
    'resolutionTime': 'وقت التحليل',
    'date': 'التاريخ',
    'rating': 'التقييم',
  };
  
  


const ReportTable = () => {
  const { Option } = Select;
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [tableData, setTableData] = useState([
    {
      key: '1',
      name: En ? 'John Brown' : 'جون براون',
      service: En ? 'Street Light' : 'ضوء الشارع',
      priority: En ? 'High' : 'عالي',
      status: En ? 'In progress' : 'قيد التنفيذ',
      date: '01/01/2023',
    },
    {
      key: '2',
      name: En ? 'Jane Doe' : 'جان دو',
      service: En ? 'Water Leak' : 'تسرب المياة',
      priority: En ? 'Medium' : 'متوسط',
      status: En ? 'Reported' : 'تم الإبلاغ عنه',
      date: '02/02/2023',
    },
    {
      key: '3',
      name: En ? 'Bob Smith' : 'بوب سميث',
      service: En ? 'Electricity Outage' : 'انقطاع الكهرباء',
      priority: En ? 'Low' : 'منخفضة',
      status: En ? 'Resolved' : 'تم الحل',
      date: '03/03/2023',
    },
  ]);
   const [dateRange, setDateRange] = useState([null, null]);
    const [filteredData, setFilteredData] = useState(tableData);
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
  
  const confirmDelete=(record)=>{
    console.log(record);
    const newData=tableData.filter((item) => item.key !== record.key);
    setTableData(newData);
    
  }

  const [showUpdateDiv, setShowUpdateDiv] = useState(false);
  const handleEdit = (record) => {
    setSelectedRowId(record.key); 
    setSelectedStatus(record.status);
    setShowUpdateDiv(true);
  }
  const handleView = (record) => {
    console.log(record);
  }
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
      title: En?'Priority':'الأولوية',
      dataIndex: 'priority',
      key: 'priority',
      //width: '20%',
    },
    {
      title:En?'Status':'الحالة',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color='';
        let icon=null;
        if(status===(En?'In progress':'قيد التنفيذ')){
          color='orange';
          icon = <SyncOutlined />;
        }else if(status===(En?'Reported':'تم الإبلاغ عنه')){
          color='blue';
          icon=<ExclamationCircleOutlined  />;
        }else{
          
          color='green';
          icon=<CheckCircleOutlined  />;
        }
        return <Tag icon={icon} color={color}>{status}</Tag>;
      },
    },
    /*{
      title:En?'Location':'الموقع',
      dataIndex: 'location',
      key: 'location',
      //width: '20%',
    },*/
    {
      title:En?'Date':'التاريخ',
      dataIndex: 'date',
      key: 'date',
      //width: '20%',
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
            onConfirm={() => confirmDelete(record)}
            okText={En?"Yes":"نعم"}
            cancelText={En?"No":"لا"}
          >
            <Button color='danger'variant="filled" >{En?"Delete":"حذف"}</Button>
          </Popconfirm>
          
          <Button color="primary" variant="filled" onClick={() => handleEdit(record)}>{En?"Edit":"تعديل"}</Button>
          <Button color="cyan"    variant="filled"  onClick={() => handleView(record)}>{En?"View":"عرض"}</Button>
        
        </Space>
        
      ),
    },
  ];

  const [setMatchedItems]=useState(tableData); 
  const [selectedRowId, setSelectedRowId] = useState(null); 
  const [selectedStatus, setSelectedStatus] = useState('');

  const updateStatus = () => {
    if (selectedRowId) { 
      setTableData(prevData =>
        prevData.map(row =>
          row.key === selectedRowId 
            ? { ...row, status: selectedStatus }
            : row
        )
      );
      
      setMatchedItems(prevRows =>
        prevRows.map(row =>
          row.key === selectedRowId 
            ? { ...row, status: selectedStatus }
            : row
        )
      );
      setShowUpdateDiv(false);
      setSelectedRowId(null);
    }
  };


  //filter by range picker (date)
    const dateFormat = 'DD/MM/YYYY';
    const handleDateRangeChange = (dates) => {
      if (!dates || dates.length !== 2) {
        setFilteredData(tableData);
        setDateRange([null, null]);
        return;
      }
  
      const [start, end] = dates;
      setDateRange([start, end]);
      const filtered = tableData.filter(item => {
        const itemDate = dayjs(item.date, dateFormat);
        return itemDate.isSameOrAfter(start, 'day') && 
               itemDate.isSameOrBefore(end, 'day');
      });
  
      setFilteredData(filtered);
    };

  return(
    <>
    {showUpdateDiv && (
        <div 
        style={{ 
          position: 'fixed', top: 0,left: 0,bottom: 0,right: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000,
        }} onClick={() => setShowUpdateDiv(false)}
      >
        <div 
          className="bg-white p-4 rounded  text-center" 
          style={{ 
            width: '400px', 
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
          }} onClick={(e) => e.stopPropagation()}
        >
          
          <h3 className="text-lg font-semibold mb-4">{En?"Update Status":"تحديث الحالة"}</h3>
      
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 ms-2">{En?"Select Status ":" حدد الحالة "} : </label>
            <Select 
              className=""
              defaultValue={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)
              }
            >
              <Option value={En?"Reported":"تم الإبلاغ عنه"}>{En?"Reported":"تم الإبلاغ عنه"}</Option>
              <Option value={En?"In progress":"قيد التنفيذ"}>{En?"In Progress":"قيد التنفيذ"}</Option>
              <Option value={En?"Resolved":"تم الحل"}>{En?"Resolved":"تم الحل"}</Option>
            </Select>
          </div>
      
        
          <div className="flex justify-end ">
            <button 
              className="px-4 py-2 btn btn-outline-danger ms-3"
              onClick={() => setShowUpdateDiv(false)}
            >
              Cancel
            </button>
            <button 
              className="px-4 py-2  btn btn-outline-success"
              onClick={updateStatus}
            >
              Save
            </button>
          </div>
        </div>
      </div>
        )}
      <div className='w-100 my-3' >
      <RangePicker
        format={dateFormat}
        onChange={handleDateRangeChange}
        style={{ marginBottom: 16 }}
        placeholder={['تاريخ البداية', 'تاريخ النهاية']}
        allowClear={true}
        showToday={true}
        className='me-2'
      />
      <Space.Compact style={{ marginBottom: 16 }}>
  <Tooltip title={En ? "Export table to Excel" : "تصدير الجدول إلى Excel"} className='mx-2'>
    <Button type="primary" icon={<FileExcelOutlined />} onClick={() => exportToExcel(tableData)}>
      {En ? "Export to Excel" : "تصدير إلى Excel"}
    </Button>
  </Tooltip>

  <Tooltip title={En ? "Export table to PDF" : "تصدير الجدول إلى PDF"} >
    <Button danger icon={<FilePdfOutlined />} onClick={() => exportToPDF(columns, tableData)}>
      {En ? "Export to PDF" : "تصدير إلى PDF"}
    </Button>
  </Tooltip>
</Space.Compact>

      <Table 
        columns={columns} 
        dataSource={tableData} 
        scroll={{ 
          x: 500,
        }} 
        pagination={{
          pageSize: 7,
          position: ['bottomCenter'], 
          className: 'custom-pagination',
        }}    
         
      />
    </div>
    
    </>
  )
  
};
export default ReportTable;