import React from 'react';

function EmployeeItem({ employee, onEdit, onDelete, onToggleStatus }) {
  return (
    <div className="border p-3 flex justify-between items-center mb-2">
      <div>
        <h3 className="font-semibold">{employee.fullname}</h3>
        <p>{employee.email}</p>
        <p>Ngày sinh: {employee.birthday}</p>
        <p>Trạng thái: {employee.status ? 'Đang hoạt động' : 'Đã chặn'}</p>
      </div>
      <div className="flex gap-2">
        <button onClick={() => onToggleStatus(employee)} className="btn btn-warning">
          {employee.status ? "Chặn" : "Bỏ chặn"}
        </button>
        <button onClick={() => onEdit(employee)} className="btn btn-primary">Sửa</button>
        <button onClick={() => onDelete(employee)} className="btn btn-danger">Xoá</button>
      </div>
    </div>
  );
}

export default EmployeeItem;
