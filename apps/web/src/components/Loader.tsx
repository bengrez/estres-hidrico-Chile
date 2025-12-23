const Loader = ({ label }: { label: string }) => {
  return <div className="loader" role="status">{label}</div>;
};

export default Loader;
