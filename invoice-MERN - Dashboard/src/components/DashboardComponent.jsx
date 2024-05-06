import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import { FaChartBar, FaChartSimple, FaDollarSign, FaSeedling } from 'react-icons/fa6'
import { dashboard__Request__API } from '../api/Api';
const DashboardComponent = () => {

    let [data_flow, setData_flow] = useState([])
    let [today_total_sale, setToday_total_sale] = useState([])
    let [today_total_sales_amount, setToday_total_sales_amount] = useState([])
    let [today_total_due_amount, setToday_total_due_amount] = useState([])
    let [today_total_paid_amount, setToday_total_paid_amount] = useState([])
    let [table_data, setTable_data] = useState([])
    let [bar_chat_monthly_report, setBar_chat_monthly_report] = useState([])
    let [bar_chat_monthly_sales, setBar_chat_monthly_sales] = useState([])
    useEffect(() => {
        dashboard__Request__API().then((result) => {
            if (result) {
                console.log(result);
                setData_flow(result?.data_flow[0])
                setTable_data(result?.table_data)
                setBar_chat_monthly_report(result?.bar_chat_monthly_report)
                setBar_chat_monthly_sales(result?.bar_chat_monthly_sales)
                setToday_total_sale(result?.today_total_sale[0]['items'])
                setToday_total_sales_amount(result?.today_total_sales_amount[0]['amount'])
                setToday_total_due_amount(result?.today_total_due_amount[0]['amount'])
                setToday_total_paid_amount(result?.today_total_paid_amount[0]['amount'])
            }
        })
    }, [])


    // console.log(data_flow);
    console.log(today_total_paid_amount);


    const months_report = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ].map(month => ({
        totalDueAmount: 0,
        totalPaymentAmount: 0,
        _id: month
    }));

    // Update months array with values from originalData
    bar_chat_monthly_report.forEach(data => {
        const monthIndex = months_report.findIndex(month => month._id === data._id);
        if (monthIndex !== -1) {
            months_report[monthIndex].totalDueAmount = data.totalDueAmount;
            months_report[monthIndex].totalPaymentAmount = data.totalPaymentAmount;
        }
    });
    let bar_chat_monthly_report_series = [{
        name: 'Total Payment',
        data: [
            months_report[0]['totalPaymentAmount'],
            months_report[1]['totalPaymentAmount'],
            months_report[2]['totalPaymentAmount'],
            months_report[3]['totalPaymentAmount'],
            months_report[4]['totalPaymentAmount'],
            months_report[5]['totalPaymentAmount'],
            months_report[6]['totalPaymentAmount'],
            months_report[7]['totalPaymentAmount'],
            months_report[8]['totalPaymentAmount'],
            months_report[9]['totalPaymentAmount'],
            months_report[10]['totalPaymentAmount'],
            months_report[11]['totalPaymentAmount']],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
        hoverBorderColor: 'rgba(255, 99, 132, 1)',
    }, {
        name: 'Total Due',
        data: [
            months_report[0]['totalDueAmount'],
            months_report[1]['totalDueAmount'],
            months_report[2]['totalDueAmount'],
            months_report[3]['totalDueAmount'],
            months_report[4]['totalDueAmount'],
            months_report[5]['totalDueAmount'],
            months_report[6]['totalDueAmount'],
            months_report[7]['totalDueAmount'],
            months_report[8]['totalDueAmount'],
            months_report[9]['totalDueAmount'],
            months_report[10]['totalDueAmount'],
            months_report[11]['totalDueAmount']]
    }]

    let bar_chat_monthly_report_series_options = {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
                hoverBorderColor: 'rgba(255, 99, 132, 1)',
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: [
                months_report[0]['_id'],
                months_report[1]['_id'],
                months_report[2]['_id'],
                months_report[3]['_id'],
                months_report[4]['_id'],
                months_report[5]['_id'],
                months_report[6]['_id'],
                months_report[7]['_id'],
                months_report[8]['_id'],
                months_report[9]['_id'],
                months_report[10]['_id'],
                months_report[11]['_id']]
        },
        yaxis: {
            title: {
                text: '$ (Sales View)'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$ " + val + " thousands"
                }
            }
        }
    }

    const months_sales = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ].map(month => ({
        totalSalesAmount: 0,
        _id: month
    }));
    // Update months array with values from originalData
    bar_chat_monthly_sales.forEach(data => {
        const monthIndex = months_sales.findIndex(month => month._id === data._id);
        if (monthIndex !== -1) {
            months_sales[monthIndex].totalSalesAmount = data.totalSalesAmount;
        }
    });

    let bar_chat_monthly_sales_series = [{
        name: 'series1',
        data: [months_sales[0]['totalSalesAmount'],
        months_sales[1]['totalSalesAmount'],
        months_sales[2]['totalSalesAmount'],
        months_sales[3]['totalSalesAmount'],
        months_sales[4]['totalSalesAmount'],
        months_sales[5]['totalSalesAmount'],
        months_sales[6]['totalSalesAmount'],
        months_sales[7]['totalSalesAmount'],
        months_sales[8]['totalSalesAmount'],
        months_sales[9]['totalSalesAmount'],
        months_sales[10]['totalSalesAmount'],
        months_sales[11]['totalSalesAmount']]
    }]

    let bar_chat_monthly_sales_series_options = {
        chart: {
            height: 350,
            type: 'area'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: '',
            categories: [
                months_report[0]['_id'],
                months_report[1]['_id'],
                months_report[2]['_id'],
                months_report[3]['_id'],
                months_report[4]['_id'],
                months_report[5]['_id'],
                months_report[6]['_id'],
                months_report[7]['_id'],
                months_report[8]['_id'],
                months_report[9]['_id'],
                months_report[10]['_id'],
                months_report[11]['_id']]
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$ " + val + " thousands"
                }
            }
        }
    }
    return (
        <div>
            <div className="px-[40px] py-[40px]">
                <div className=''>
                    <div className='grid grid-cols-12 gap-[30px]'>
                        <div className='col-span-3 bg-white rounded-md  p-[20px]'>
                            <div className='flex items-center gap-[20px]'>
                                <div className='p-[10px] rounded-lg bg-purple-50 flex justify-center items-center w-[60px] h-[60px]'>
                                    <FaSeedling className='text-purple-500 text-[20px]' />
                                </div>
                                <div>
                                    <p className='text-sm'>Total invoice</p>

                                    <div className='flex gap-1 items-center pt-[6px]'>
                                        <p className='font-semibold text-gray-900 text-[20px]'>{data_flow?.totalCustomerCount}</p><p className='text-sm'>(Items)</p>
                                    </div>
                                    <p className='text-sm'>Today add <span className='bg-green-50 text-green-600 px-[5px] rounded-xl font-medium '>{today_total_sale}</span> new items</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-3 bg-white rounded-md  p-[20px]'>
                            <div className='flex items-center gap-[20px]'>
                                <div className='p-[10px] rounded-lg bg-cyan-50 flex justify-center items-center w-[60px] h-[60px]'>
                                    <FaDollarSign className='text-cyan-500 text-[20px]' />
                                </div>
                                <div>
                                    <p className='text-sm'>Total sale amount</p>

                                    <div className='flex gap-1 items-center pt-[6px]'>
                                        <p className='font-semibold text-gray-900 text-[20px]'>{data_flow?.totalSalesAmount}</p><p className='text-sm'>(Amount)</p>
                                    </div>
                                    <p className='text-sm '>Today sale amount <span className='bg-green-50 text-green-600 px-[5px] rounded-xl font-medium'>{today_total_sales_amount}</span></p>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-3 bg-white rounded-md  p-[20px]'>
                            <div className='flex items-center gap-[20px]'>
                                <div className='p-[10px] rounded-lg bg-orange-50 flex justify-center items-center w-[60px] h-[60px]'>
                                    <FaChartBar className='text-orange-500 text-[20px]' />
                                </div>
                                <div>
                                    <p className='text-sm'>Total due customer</p>

                                    <div className='flex gap-1 items-center pt-[6px]'>
                                        <p className='font-semibold text-gray-900 text-[20px]'>{data_flow?.totalDueCustomer}</p><p className='text-sm'>(Person)</p>
                                    </div>
                                    <p className='text-sm'>Today due amount <span className='bg-red-50 text-red-600 px-[5px] rounded-xl '>{today_total_due_amount}</span></p>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-3 bg-white rounded-md  p-[20px]'>
                            <div className='flex items-center gap-[20px]'>
                                <div className='p-[10px] rounded-lg bg-pink-50 flex justify-center items-center w-[60px] h-[60px]'>
                                    <FaChartSimple className='text-pink-500 text-[20px]' />
                                </div>
                                <div>
                                    <p className='text-sm'>Total full paid customer</p>
                                    <div className='flex gap-1 items-center pt-[6px]'>
                                        <p className='font-semibold text-gray-900 text-[20px]'>{data_flow?.totalFullPaidCustomer}</p><p className='text-sm'>(Person)</p>
                                    </div>
                                    <p className='text-sm'>Today paid amount <span className='bg-green-50 text-green-600 px-[5px] rounded-xl '>{today_total_paid_amount}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-12 gap-[30px]'>
                    <div className='col-span-6 bg-white rounded-md  p-[20px] mt-[30px]'>
                        <h2 className='font-semibold text-gray-700 text-[18px]'>Month Payment & Due Report</h2>
                        <ReactApexChart options={bar_chat_monthly_report_series_options} series={bar_chat_monthly_report_series} type="bar" height={400} />
                    </div>
                    <div className='col-span-6 bg-white rounded-md  p-[20px] mt-[30px]'>
                        <h2 className='font-semibold text-gray-700 text-[18px]'>Month Sales</h2>
                        <ReactApexChart options={bar_chat_monthly_sales_series_options} series={bar_chat_monthly_sales_series} type="area" height={400} />
                    </div>
                </div>
                <div className='bg-white rounded-md  p-[20px] mt-[30px]'>



                    <div className="flex flex-col justify-center h-full">
                        {/* Table */}
                        <div className="w-full  mx-auto bg-white  rounded-sm  ">
                            <header className="px-5 py-4 border-b border-gray-100">
                                <h2 className="font-semibold text-gray-800">Customers</h2>
                            </header>
                            <div className="p-3">
                                <div className="overflow-x-auto">
                                    <table className="table-auto w-full">
                                        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                            <tr>
                                                <th className="p-2 whitespace-nowrap">
                                                    <div className="font-semibold text-left">Name</div>
                                                </th>
                                                <th className="p-2 whitespace-nowrap">
                                                    <div className="font-semibold text-left">Email</div>
                                                </th>
                                                <th className="p-2 whitespace-nowrap">
                                                    <div className="font-semibold text-left">Spent</div>
                                                </th>
                                                <th className="p-2 whitespace-nowrap">
                                                    <div className="font-semibold text-center">Country</div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm divide-y divide-gray-100">
                                            <tr>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                                            <img
                                                                className="rounded-full"
                                                                src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg"
                                                                width={40}
                                                                height={40}
                                                                alt="Alex Shatov"
                                                            />
                                                        </div>
                                                        <div className="font-medium text-gray-800">
                                                            Alex Shatov
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-left">alexshatov@gmail.com</div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-left font-medium text-green-500">
                                                        $2,890.66
                                                    </div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-lg text-center">🇺🇸</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                                            <img
                                                                className="rounded-full"
                                                                src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-06.jpg"
                                                                width={40}
                                                                height={40}
                                                                alt="Philip Harbach"
                                                            />
                                                        </div>
                                                        <div className="font-medium text-gray-800">
                                                            Philip Harbach
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-left">philip.h@gmail.com</div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-left font-medium text-green-500">
                                                        $2,767.04
                                                    </div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-lg text-center">🇩🇪</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                                            <img
                                                                className="rounded-full"
                                                                src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-07.jpg"
                                                                width={40}
                                                                height={40}
                                                                alt="Mirko Fisuk"
                                                            />
                                                        </div>
                                                        <div className="font-medium text-gray-800">
                                                            Mirko Fisuk
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-left">mirkofisuk@gmail.com</div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-left font-medium text-green-500">
                                                        $2,996.00
                                                    </div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-lg text-center">🇫🇷</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                                            <img
                                                                className="rounded-full"
                                                                src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-08.jpg"
                                                                width={40}
                                                                height={40}
                                                                alt="Olga Semklo"
                                                            />
                                                        </div>
                                                        <div className="font-medium text-gray-800">
                                                            Olga Semklo
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-left">olga.s@cool.design</div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-left font-medium text-green-500">
                                                        $1,220.66
                                                    </div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-lg text-center">🇮🇹</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                                            <img
                                                                className="rounded-full"
                                                                src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-09.jpg"
                                                                width={40}
                                                                height={40}
                                                                alt="Burak Long"
                                                            />
                                                        </div>
                                                        <div className="font-medium text-gray-800">
                                                            Burak Long
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-left">longburak@gmail.com</div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-left font-medium text-green-500">
                                                        $1,890.66
                                                    </div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-lg text-center">🇬🇧</div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>





                </div>
            </div>
        </div>
    )
}

export default DashboardComponent