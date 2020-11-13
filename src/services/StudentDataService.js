import http from "../http-common";

class StudentDataService {
  getAll() {
    return http.get("/students");
  }

  get(academicRegister) {
    return http.get(`/students/${academicRegister}`);
  }

  create(data) {
    return http.post("/students", data);
  }

  update(academicRegister, data) {
    return http.put(`/students/${academicRegister}`, data);
  }

  delete(academicRegister) {
    return http.delete(`/students/${academicRegister}`);
  }

  findByName(name) {
    return http.get(`/students?name=${name}`); 
  }
}

export default new StudentDataService();