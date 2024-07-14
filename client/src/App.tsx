import { useEffect, useState } from "react";

export interface Patient {
  id: string;
  name: string;
  gender: string;
  medical_history: string;
  phone: string;
}

export default function App() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [editPatient, setEditPatient] = useState<Partial<Patient>>({
    id: "",
    name: "",
    gender: "",
    medical_history: "",
    phone: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetch("http://localhost:8080/api/patient")
      .then((response) => response.json())
      .then((patients) => setPatients(patients));
  }, []);

  function handleDelete(id: string) {
    fetch(`http://localhost:8080/api/patient/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        setPatients(patients.filter((patient) => patient.id !== id));
      }
    });
  }

  function handleEdit() {
    fetch("http://localhost:8080/api/patient", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editPatient),
    })
      .then((response) => response.json())
      .then((patient) => {
        setPatients(patients.map((p) => (p.id === patient.id ? patient : p)));
        setEditPatient({
          id: "",
          name: "",
          gender: "",
          medical_history: "",
          phone: "",
        });
      });
  }

  function handleAdd() {
    fetch("http://localhost:8080/api/patient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editPatient),
    })
      .then((response) => response.json())
      .then((newPatient) => {
        setPatients([...patients, newPatient]);
        setEditPatient({
          id: "",
          name: "",
          gender: "",
          medical_history: "",
          phone: "",
        });
      });
  }

  const filteredPatients = patients
    .filter((patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  return (
    <div className="min-h-screen bg-blue-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center"> Hospital Management System</h1>
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="mb-4 text-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            Sort by Name ({sortOrder === "asc" ? "Ascending" : "Descending"})
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <form
            className="bg-white p-6 rounded-lg shadow-md"
            onSubmit={(e) => {
              e.preventDefault();
              if (editPatient.id) {
                handleEdit();
              } else {
                handleAdd();
              }
            }}
          >
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Name
                <input
                  type="text"
                  className="mt-1 p-2 w-full border rounded"
                  value={editPatient.name}
                  onChange={(e) => {
                    setEditPatient({
                      ...editPatient,
                      name: e.target.value,
                    });
                  }}
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Gender
                <input
                  type="text"
                  className="mt-1 p-2 w-full border rounded"
                  value={editPatient.gender}
                  onChange={(e) => {
                    setEditPatient({
                      ...editPatient,
                      gender: e.target.value,
                    });
                  }}
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Medical History
                <input
                  type="text"
                  className="mt-1 p-2 w-full border rounded"
                  value={editPatient.medical_history}
                  onChange={(e) => {
                    setEditPatient({
                      ...editPatient,
                      medical_history: e.target.value,
                    });
                  }}
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Phone
                <input
                  type="text"
                  className="mt-1 p-2 w-full border rounded"
                  value={editPatient.phone}
                  onChange={(e) => {
                    setEditPatient({
                      ...editPatient,
                      phone: e.target.value,
                    });
                  }}
                />
              </label>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </form>

          <div className="grid grid-cols-1 gap-6">
            {filteredPatients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                handleDelete={handleDelete}
                setEditPatient={setEditPatient}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PatientCard({
  patient,
  handleDelete,
  setEditPatient,
}: {
  patient: Patient;
  handleDelete: (id: string) => void;
  setEditPatient: (patient: Partial<Patient>) => void;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-start gap-4">
      <h1 className="text-xl font-bold text-gray-800">{patient.name}</h1>
      <p className="text-gray-600">Gender: {patient.gender}</p>
      <p className="text-gray-600">Medical History: {patient.medical_history}</p>
      <p className="text-gray-600">Phone: {patient.phone}</p>
      <div className="flex gap-2 mt-4">
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setEditPatient(patient);
          }}
        >
          Update
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleDelete(patient.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}



