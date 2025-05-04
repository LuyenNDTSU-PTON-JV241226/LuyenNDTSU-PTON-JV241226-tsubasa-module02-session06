import React, { useState, useEffect } from 'react';
import { validateEmployee } from '../utils/validation';

function EmployeeForm({ onClose, onSubmit, defaultData }) {
  const [form, setForm] = useState({
    fullname: '',
    email: '',
    birthday: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (defaultData) {
      setForm(defaultData);
    }
  }, [defaultData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const errs = validateEmployee(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onSubmit(form);
  };

  return (
    <div className="bg-white shadow p-4 rounded mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2>{defaultData ? "Chỉnh sửa nhân viên" : "Thêm mới nhân viên"}</h2>
        <button onClick={onClose}>✖</button>
      </div>
      <input name="fullname" placeholder="Họ và tên" value={form.fullname} onChange={handleChange} className="input" />
      {errors.fullname && <p className="text-red-500">{errors.fullname}</p>}

      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="input" />
      {errors.email && <p className="text-red-500">{errors.email}</p>}

      <input name="birthday" type="date" value={form.birthday} onChange={handleChange} className="input" />
      {errors.birthday && <p className="text-red-500">{errors.birthday}</p>}

      <button onClick={handleSubmit} className="btn btn-success mt-4">
        {defaultData ? "Cập nhật" : "Thêm mới"}
      </button>
    </div>
  );
}

export default EmployeeForm;
