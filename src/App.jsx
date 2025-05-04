import Todolist from './ss6-1/components/Todolist';
import React, { useState, useEffect } from 'react';
import EmployeeForm from './ss6-2/components/EmployeeForm';
import EmployeeList from './ss6-2/components/EmployeeList';
import Modal from './ss6-2/components/Modal';

function App() {
  const [employees, setEmployees] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(data);
  }, []);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const handleAdd = (employee) => {
    if (editingEmployee) {
      setEmployees(prev =>
        prev.map(emp => emp.id === editingEmployee.id ? { ...employee, id: editingEmployee.id } : emp)
      );
      setEditingEmployee(null);
    } else {
      setEmployees(prev => [...prev, { ...employee, id: Date.now(), status: true }]);
    }
    setFormVisible(false);
  };

  const handleEdit = (emp) => {
    setEditingEmployee(emp);
    setFormVisible(true);
  };

  const handleDelete = (id) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
    setModalData(null);
  };

  const toggleStatus = (id) => {
    setEmployees(prev =>
      prev.map(emp => emp.id === id ? { ...emp, status: !emp.status } : emp)
    );
    setModalData(null);
  };

  const filtered = employees.filter(emp =>
    emp.email.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
    {/* ss06-1 */}
      <Todolist/>
    {/* ss06-2 */}
      <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Quản lý nhân viên</h1>

      <div className="flex gap-4 mb-4">
        <button onClick={() => { setFormVisible(true); setEditingEmployee(null); }} className="btn btn-primary">
          Thêm mới nhân viên
        </button>
        <input
          type="text"
          placeholder="Tìm kiếm theo email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2 flex-1"
        />
      </div>

      {isFormVisible && (
        <EmployeeForm
          onClose={() => { setFormVisible(false); setEditingEmployee(null); }}
          onSubmit={handleAdd}
          defaultData={editingEmployee}
        />
      )}

      <EmployeeList
        employees={filtered}
        onEdit={handleEdit}
        onDelete={(emp) => setModalData({ type: "delete", emp })}
        onToggleStatus={(emp) => setModalData({ type: emp.status ? "block" : "unblock", emp })}
      />

      {modalData && (
        <Modal
          title={
            modalData.type === "delete"
              ? "Xác nhận xoá"
              : modalData.type === "block"
              ? "Xác nhận chặn"
              : "Xác nhận bỏ chặn"
          }
          onClose={() => setModalData(null)}
          onConfirm={() => {
            modalData.type === "delete"
              ? handleDelete(modalData.emp.id)
              : toggleStatus(modalData.emp.id);
          }}
        >
          <p>Bạn có chắc chắn muốn {modalData.type === "delete" ? "xoá" : modalData.type === "block" ? "chặn" : "bỏ chặn"} nhân viên <strong>{modalData.emp.fullname}</strong> không?</p>
        </Modal>
      )}
    </div>
    </>
    
  );
}

export default App;

