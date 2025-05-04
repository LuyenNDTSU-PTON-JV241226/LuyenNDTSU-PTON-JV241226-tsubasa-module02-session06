export const validateEmployee = (data) => {
    const errors = {};
    if (!data.fullname.trim()) errors.fullname = "Họ tên không được để trống.";
    if (!data.email.trim()) errors.email = "Email không được để trống.";
    else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = "Email không đúng định dạng.";
    if (!data.birthday) errors.birthday = "Ngày sinh không được để trống.";
    else if (new Date(data.birthday) > new Date()) errors.birthday = "Ngày sinh không hợp lệ.";
    return errors;
  };
  