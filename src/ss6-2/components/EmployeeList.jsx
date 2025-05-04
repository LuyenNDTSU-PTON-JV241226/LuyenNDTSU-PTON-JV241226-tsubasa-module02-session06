import React from 'react';
import EmployeeItem from './EmployeeItem';

function EmployeeList({ employees, onEdit, onDelete, onToggleStatus }) {
  if (employees.length === 0) return <p>Không có kết quả tìm kiếm.</p>;
  return (
    <div>
      {employees.map(emp => (
        <EmployeeItem
          key={emp.id}
          employee={emp}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
}

export default EmployeeList;
