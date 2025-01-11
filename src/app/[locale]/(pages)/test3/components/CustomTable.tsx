import React, { useState } from "react"
import { Button, Col, Flex, Row, Space, Table, Typography } from "antd"
import type { PaginationProps, TableColumnsType, TableProps } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/lib/store"
import {
  deleteMultiplePersonInfo,
  deletePersonInfo,
  // openEditMode,
  PersonalFormStateIn,
  setSelectedPerson,
} from "@/lib/slices/personalFormSlice"

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"]

const CustomTable: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const { personData } = useSelector(
    (state: RootState) => state.personalFormSlice
  )
  const dispatch = useDispatch()

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection: TableRowSelection<PersonalFormStateIn> = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const handleSelectAll = () => {
    if (selectedRowKeys.length === personData.length) {
      setSelectedRowKeys([]) // Deselect all if already selected
    } else {
      setSelectedRowKeys(personData.map((item) => item.id)) // Select all
    }
  }

  const handleDeleteSelected = () => {
    dispatch(deleteMultiplePersonInfo(selectedRowKeys as string[]))
    setSelectedRowKeys([])
  }
  const handleDelete = (id: string) => {
    dispatch(deletePersonInfo(id))
  }

  const handleEdit = (id: string) => {
    dispatch(setSelectedPerson(id))
  }

  const columns: TableColumnsType<PersonalFormStateIn> = [
    {
      title: "Name",
      dataIndex: "firstName",
      sorter: true,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      sorter: true,
    },
    {
      title: "Mobile Phone",
      dataIndex: "mobilePhone",
      render: (_, record) =>
        `${record.mobilePhone.areaCode}${record.mobilePhone.phoneNumber}`,
      sorter: true,
    },
    {
      title: "Nationality",
      dataIndex: "nationality",
      sorter: true,
    },
    {
      title: "Action",
      width: 150,
      fixed: "right",
      render: (test, record) => (
        <Space>
          <Typography.Link onClick={() => handleEdit(record.id)}>
            Edit
          </Typography.Link>
          <Typography.Link onClick={() => handleDelete(record.id)}>
            Delete
          </Typography.Link>
        </Space>
      ),
    },
  ]

  const itemRender: PaginationProps["itemRender"] = (
    _,
    type,
    originalElement
  ) => {
    if (type === "prev") {
      return <a>Previous</a>
    }
    if (type === "next") {
      return <a>Next</a>
    }
    return originalElement
  }

  return (
    <>
      <Row style={{ width: "100%", padding: "0px 20px" }}>
        <Space>
          <Button
            onClick={handleSelectAll}
            style={{
              marginBottom: 16,
              backgroundColor: `${
                selectedRowKeys.length === personData.length ? "whitesmoke" : ""
              }`,
            }}
          >
            {selectedRowKeys.length !== 0 &&
            selectedRowKeys.length === personData.length
              ? "Deselect All"
              : "Select All"}
          </Button>

          <Button onClick={handleDeleteSelected} style={{ marginBottom: 16 }}>
            Delete
          </Button>
        </Space>
      </Row>

      <Table<PersonalFormStateIn>
        rowSelection={rowSelection}
        columns={columns}
        dataSource={personData}
        pagination={{ position: ["topRight"], itemRender: itemRender }}
        rowKey="id"
        style={{ width: "100%", padding: "0px 20px" }}
      />
    </>
  )
}

export default CustomTable
