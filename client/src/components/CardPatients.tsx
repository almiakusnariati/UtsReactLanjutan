import { Patient } from "../App";

export default function PatientCard({
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
      <p className="text-gray-800">Gender: {patient.gender}</p>
      <p className="text-gray-800">Medical History: {patient.medical_history}</p>
      <p className="text-gray-800">Phone: {patient.phone}</p>
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
