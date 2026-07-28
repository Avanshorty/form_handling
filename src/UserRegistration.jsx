import { useRef, useState } from "react";
import "./UserRegistration.css";

const hobbies = [
  {
    value: "music",
    name: "Music",
  },
  {
    value: "movie",
    name: "Movies",
  },
  {
    value: "plastic-model",
    name: "Plastic Model",
  },
];

const genders = [
  {
    value: "male",
    name: "Male",
  },
  {
    value: "female",
    name: "Female",
  },
  {
    value: "others",
    name: "Others",
  },
];

const departments = [
  {
    value: "accounting",
    name: "Accounting",
    positions: ["Accountant", "Senior Accountant", "Payroll Officer"],
  },
  {
    value: "information-technology",
    name: "Information Technology",
    positions: ["Developer", "System Analyst", "Network Administrator"],
  },
  {
    value: "human-resources",
    name: "Human Resources",
    positions: ["HR Officer", "Recruiter", "Training Officer"],
  },
];

const initialFormData = {
  username: "",
  firstname: "",
  lastname: "",
  gender: "",
  hobbies: [],
  department: "",
  jobPosition: "",
};

function UserRegistration() {
  const formRef = useRef(null);

  const [formData, setFormData] = useState(initialFormData);
  const [submittedData, setSubmittedData] = useState(null);

  const selectedDepartment = departments.find(
    (department) => department.value === formData.department
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleDepartmentChange = (event) => {
    const departmentValue = event.target.value;

    const department = departments.find(
      (item) => item.value === departmentValue
    );

    setFormData((previousData) => ({
      ...previousData,
      department: departmentValue,
      jobPosition: department ? department.positions[0] : "",
    }));
  };

  const handleHobbyChange = (event) => {
    const { value, checked } = event.target;

    setFormData((previousData) => {
      const updatedHobbies = checked
        ? [...previousData.hobbies, value]
        : previousData.hobbies.filter((hobby) => hobby !== value);

      return {
        ...previousData,
        hobbies: updatedHobbies,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSubmittedData({
      ...formData,
      hobbies: [...formData.hobbies],
    });
  };

  const handleReset = () => {
    formRef.current?.reset();
    setFormData(initialFormData);
    setSubmittedData(null);
  };

  const getGenderName = (genderValue) => {
    return (
      genders.find((gender) => gender.value === genderValue)?.name || "None"
    );
  };

  const getDepartmentName = (departmentValue) => {
    return (
      departments.find(
        (department) => department.value === departmentValue
      )?.name || "None"
    );
  };

  const getHobbyNames = (selectedHobbies) => {
    return selectedHobbies
      .map((selectedHobby) => {
        return hobbies.find((hobby) => hobby.value === selectedHobby)?.name;
      })
      .filter(Boolean);
  };

  return (
    <main className="registration-page">
      <section className="registration-card">
        <h1>User Registration</h1>

        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="form-content">
            <div className="form-row">
              <label htmlFor="username">Username</label>

              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="firstname">Firstname</label>

              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="lastname">Lastname</label>

              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-row">
              <span className="field-label">Gender</span>

              <div className="options">
                {genders.map((gender, index) => (
                  <label key={gender.value} htmlFor={`gender-${index + 1}`}>
                    <input
                      type="radio"
                      id={`gender-${index + 1}`}
                      name="gender"
                      value={gender.value}
                      checked={formData.gender === gender.value}
                      onChange={handleInputChange}
                      required
                    />

                    {gender.name}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-row">
              <span className="field-label">Hobbies</span>

              <div className="options">
                {hobbies.map((hobby, index) => (
                  <label key={hobby.value} htmlFor={`hobby-${index + 1}`}>
                    <input
                      type="checkbox"
                      id={`hobby-${index + 1}`}
                      name="hobbies"
                      value={hobby.value}
                      checked={formData.hobbies.includes(hobby.value)}
                      onChange={handleHobbyChange}
                    />

                    {hobby.name}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-row">
              <label htmlFor="department">Department</label>

              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleDepartmentChange}
                required
              >
                <option value="">-- Select Department --</option>

                {departments.map((department) => (
                  <option key={department.value} value={department.value}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <label htmlFor="jobPosition">Job Position</label>

              <select
                id="jobPosition"
                name="jobPosition"
                value={formData.jobPosition}
                onChange={handleInputChange}
                disabled={!selectedDepartment}
                required
              >
                <option value="">-- Select Job Position --</option>

                {selectedDepartment?.positions.map((position) => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="button-area">
            <button
              type="button"
              className="reset-button"
              onClick={handleReset}
            >
              Reset
            </button>

            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </section>

      {submittedData && (
        <section className="result-card">
          <h2>Submitted Data</h2>

          <div className="result-grid">
            <strong>Username:</strong>
            <span>{submittedData.username}</span>

            <strong>Firstname:</strong>
            <span>{submittedData.firstname}</span>

            <strong>Lastname:</strong>
            <span>{submittedData.lastname}</span>

            <strong>Gender:</strong>
            <span>{getGenderName(submittedData.gender)}</span>

            <strong>Hobbies:</strong>
            <span>
              {submittedData.hobbies.length > 0
                ? getHobbyNames(submittedData.hobbies).join(", ")
                : "None"}
            </span>

            <strong>Department:</strong>
            <span>{getDepartmentName(submittedData.department)}</span>

            <strong>Job Position:</strong>
            <span>{submittedData.jobPosition}</span>
          </div>
        </section>
      )}
    </main>
  );
}

export default UserRegistration;