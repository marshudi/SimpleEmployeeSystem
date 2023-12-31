import mongoose from "mongoose";
const EmployeeSchema = mongoose.Schema({
    eID: { type: String, required: true, },
    eName: { type: String, required: false, },
    phone: { type: String, required: false, },
    salary: { type: Number, required: false, },

});
const EmployeeModel = mongoose.model("employee_table", EmployeeSchema);
export default EmployeeModel;