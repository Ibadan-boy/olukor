function DeleteConfirmation({ onConfirm, onCancel }) {
  
  

  return (
    <div className="text-2xl">
      <h2>Are you sure?</h2>
      <p>Do you really want to delete this student?</p>
      <div className ="flex gap-8 m-3">
        <button onClick={onCancel} className="py-2 px-4 bg-rose-600 rounded-lg hover:bg-rose-700">
          No
        </button>
        <button onClick={onConfirm} className="bg-rose-600 px-4 py-2 rounded-lg hover:bg-rose-700">
          Yes
        </button>
      </div>
      
    </div>
  );
}

export default DeleteConfirmation;