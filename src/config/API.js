exports.BaseUrl = "http://localhost:5000/api/v1";
exports.url = "http://localhost:5000";
const token = window.localStorage.getItem("token");
exports.headerAutorization = { Authorization: `Bearer ${token}` };
