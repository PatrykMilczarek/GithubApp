import * as React from "react";
import { Table } from "antd";
import repositoryTableColumns from "./config";
import { IFormatedData } from "../../../types/RepoContent.types";

interface IRepoTableProps {
    data: IFormatedData[],
    selectedRowKeys: number[],
    onSelectChange: Function
}

const RepoTable = (props: IRepoTableProps) => {
    const rowSelection: any = {
      selectedRowKeys: props.selectedRowKeys,
      onChange: props.onSelectChange
    };
  
    return (
      <Table
        rowSelection={rowSelection}
        dataSource={props.data}
        columns={repositoryTableColumns}
        size="small"
        style={{ marginTop: "20px" }}
      />
    );
  };

export default RepoTable;