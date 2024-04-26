import { Table } from 'antd'
import React from 'react'

const NotificationList = () => {
  const collumns = [
    {
      key:'notName',
      dataIndex: 'notName',
      title: "Notification name"
    },
    {
      key:'notTime',
      dataIndex: 'notTime',
      title: "Appear time"
    },
    {
      key:'camera',
      dataIndex: 'camera',
      title: "Camera"
    },
    {
      key:'image',
      dataIndex: 'image',
      title: "Notification image"
    },
    {
      key:'management',
      dataIndex: 'management',
      title: "Notification management"
    },
  ]
  return (
    <div>
      <Table columns={collumns}/>
    </div>
  )
}

export default NotificationList