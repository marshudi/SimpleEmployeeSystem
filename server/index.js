import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import EmployeeModel from "./Models/empModel.js";


const app = express();

app.use(express.json());
app.use(cors());

const conStr =
  "mongodb+srv://Marshudi:admin@project.ludeoui.mongodb.net/empDB?retryWrites=true&w=majority";

mongoose.connect(conStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(3001, () => {
  console.log("Server is connected...");
});

// for add

app.post("/addEmployee", async (req, res) => {
  const eID = req.body.eID;
  const eName = req.body.eName;
  const phone = req.body.phone;
  const salary = req.body.salary;

  const employee = new EmployeeModel({
    eID: eID,
    eName: eName,
    phone: phone,
    salary: salary,
  });

  await employee.save();
  res.send("Record Successfully Added!");
});

app.get("/display", async (req, res) => {
  try {
    const employees = await EmployeeModel.find({});
    const countEmployees = await EmployeeModel.countDocuments({});
    res.send({
      employees,
      count: countEmployees,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Internal server error",
    });
  }
});

//for delete

// app.delete("/delete/:id", async (req, res) => {
//   const id = req.params.id;
//   await EmployeeModel.findByIdAndRemove(id).exec();
//   const countEmployees = await EmployeeModel.countDocuments({});
//   res.send({
//     msg: "Item Deleted",
//     count: countEmployees,
//   });
// });


app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const deletedEmployee = await EmployeeModel.findByIdAndDelete(id).exec();
  
      if (!deletedEmployee) {
        res.status(404).send({
          error: "Employee not found",
        });
        return;
      }
  
      const countEmployees = await EmployeeModel.countDocuments({});
      res.send({
        msg: "Item Deleted",
        count: countEmployees,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        error: "Internal server error",
      });
    }
  });
  
  


//express GET route for the selected record

app.get("/getEmployee/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await EmployeeModel.findById(id);
    const count = await EmployeeModel.countDocuments();
    res.status(200).send({
      result,
      count,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error: "Internal server error",
    });
  }
});


// for update

app.put("/update", async (req, res) => {
  const eID = req.body.eID;
  const eName = req.body.eName;
  const phone = req.body.phone;
  const salary = req.body.salary;

  try {
    const employeeToUpdate = await EmployeeModel.findOne({
      eID: eID,
    });

    if (!employeeToUpdate) {
      res.status(404).send({
        error: "Employee not found",
      });
      return;
    }

    employeeToUpdate.eID = String(eID);
    employeeToUpdate.eName = String(eName);
    employeeToUpdate.phone = String(phone);
    employeeToUpdate.salary = String(salary);

    await employeeToUpdate.save();
    res.send({
      msg: "Record Updated",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error: "Failed to update Employee record",
    });
  }
});



// for total salary


app.get("/totalSalary", async (req, res) => {
    try {
      const totalSalaryResult = await EmployeeModel.aggregate([
        {
          $group: {
            _id: null,
            totalSalary: { $sum: "$salary" },
          },
        },
      ]);
  
      const totalSalary = totalSalaryResult.length > 0 ? totalSalaryResult[0].totalSalary : 0;
  
      res.status(200).send({
        totalSalary,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        error: "Internal server error",
      });
    }
  });



// to get the last employee detail


// i want to get the total index - 1 
// so to get the last inserted details in the data base
app.get("/lastEmployee", async (req, res) => {
    try {
      const totalDocuments = await EmployeeModel.countDocuments({});
      const lastIndex = totalDocuments - 1;

      const lastEmployeeResult = await EmployeeModel.findOne({}, {}, { sort: { 'index': -1 }, skip: lastIndex, limit: 1 });
  
      res.status(200).send({
        result: lastEmployeeResult,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        error: "Internal server error",
      });
    }
});
