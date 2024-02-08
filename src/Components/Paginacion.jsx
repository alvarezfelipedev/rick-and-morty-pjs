// eslint-disable-next-line react/prop-types
const Paginacion = ({ prev, next, onPrevious, onNext }) => {
  const handlePrevious = () => {
    onPrevious();
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <nav className="ml-5">
      <ul>
        {prev ?
          <button onClick={handlePrevious} className="join-item btn btn-outline mr-3">Previous page</button>
          : null
        }
        {next ?
          <button onClick={handleNext} className="join-item btn btn-outline">Next</button>
          : null
        }
      </ul>
    </nav>
  );
};

export default Paginacion;
