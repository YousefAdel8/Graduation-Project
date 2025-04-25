import React, { useEffect, useRef, useState } from 'react';
import { FileExcelOutlined, FilePdfOutlined, PrinterOutlined, SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { Button, Input, Space, Table,Rate, Tooltip,DatePicker } from 'antd';
//import { Print } from "../../../utils/exportFunctions";
import Highlighter from 'react-highlight-words';
import axios from "axios";
import { useLanguage } from '../../../context/LanguageContext';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
const { RangePicker } = DatePicker;



  
  

/*const confirmDelete=(e)=>{
  console.log("delete");
}
const cancelDelete=(e)=>{
  console.log("cancel");
}*/
const FeedbackTable = () => {
  const { isEnglish: En } = useLanguage();
const fieldTranslations = {
    'name': 'الاسم',
    'service': 'نوع الخدمة',
    'resolutionTime': 'وقت التحليل',
    'date': 'التاريخ',
    'rating': 'التقييم',
  };
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState(tableData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      title: En?'User Name':' اسم المستخدم',
      dataIndex: 'mobileUser',
      key: 'mobileUser',
      ...getColumnSearchProps('mobileUser'),
    },
    {
      title: En?'User ID':' معرف المستخدم',
      dataIndex: 'mobileUserId',
      key: 'mobileUserId',
      ...getColumnSearchProps('mobileUserId'),
    },
    {
      title: En ? 'Date Submitted' : 'تاريخ الاضافة',
      dataIndex: 'date',
      key: 'date',
      render: (date) => {
        return new Date(date).toLocaleDateString();
      }
    },
    {
      title: En?'Rate':'تقييم المستخدم',
      dataIndex: 'rateValue',
      key: 'rateValue',
      //width: '20%',
      
      render: (_, record) => (
        <space style={{whiteSpace:'nowrap'}}> 
        <Rate disabled defaultValue={record.rateValue} />
        </space>
      ),
    },
    {
      title: En ? 'Comment' : 'التعليق',
      dataIndex: 'comment',
      key: 'comment',
      ...getColumnSearchProps('comment'),
    },
  ];
  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://cms-reporting.runasp.net/api/Feedback/all"
      );
      console.log("API Response:", data);
      
      const formattedData = data.map((item, index) => ({
        ...item,
        key: item.id || index,
      }));
      
      setTableData(formattedData);
    setFilteredData(formattedData);
      setError(null);
    } catch (err) {
      setError("Failed to load data. Please try again later.");
      setTableData([]);
    } finally {
      setLoading(false);
    }
  };
    useEffect(() => {
      fetchData();
    }, []);
  
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
    <div className="w-100 my-3">
      <RangePicker
        format={dateFormat}
        onChange={handleDateRangeChange}
        style={{ marginBottom: 16 }}
        placeholder={[
          En ? "Start Date" : "تاريخ البداية",
          En ? "End Date" : "تاريخ النهاية",
        ]}
        allowClear={true}
        showToday={true}
        className='me-2'
      />
      {/*<Space.Compact style={{ marginBottom: 16 }}>
  
  <Tooltip title={En ? "Print" : "طباعة"} className='me-2'>
    <Button onClick={() => Print(columns, tableData, En)}  danger icon={<PrinterOutlined />} >
      {En ? "Print" : "طباعة"}
    </Button>
  </Tooltip>
</Space.Compact>*/}

<div >
{error && <div style={{ color: 'red', marginBottom: '16px' }}>{error}</div>}
      
      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        scroll={{ x: 500 }}
        pagination={{
          pageSize: 7,
          position: ["bottomCenter"],
          className: "custom-pagination",
        }}
      />
      
      </div>
    </div>
  )
  
};
export default FeedbackTable;