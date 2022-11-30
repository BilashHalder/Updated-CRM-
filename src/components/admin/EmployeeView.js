import React from 'react'

export default function EmployeeView(props) {
    const {data}=props;
  return (
    <div>Employee View {data.id}</div>
  )
}
