
import * as React from "react";
import { Divider } from 'antd';
import { IFormatedData } from "./index";

export const repositoryTableColumns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: "10%",
    sorter: (a: IFormatedData, b: IFormatedData) => a.name.localeCompare(b.name)
  }, {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    width: "30%"
  }, {
    title: 'Forks',
    dataIndex: 'forks',
    key: 'forks',
    width: "10%",
    sorter: (a: IFormatedData, b: IFormatedData) => a.forks - b.forks,  
  }, {
    title: 'Stars',
    dataIndex: 'stargazers_count',
    key: 'stargazers_count',
    width: "10%",
    sorter: (a: IFormatedData, b: IFormatedData) => a.stargazers_count - b.stargazers_count,
  },
  {
    title: 'Updated at',
    dataIndex: 'updated_at',
    defaultSortOrder: 'descend' as 'descend',
    key: 'updated_at',
    width: "20%",
    sorter: (a: IFormatedData, b: IFormatedData) => a.updated_at.localeCompare(b.updated_at)
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: IFormatedData, record: IFormatedData) => (
      <span>
        <a href={record.html_url} target="_blank">Open </a>
        <Divider type="vertical" />
        <a href="javascript:;" onClick={() => record.hideRow(record.key)}>Hide </a>
      </span>
    ),
    width: "20%"
  }
  
];