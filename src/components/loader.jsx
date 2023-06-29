import ClipLoader from "react-spinners/ClipLoader";

export default function ReactLoader() {
  return (
    <ClipLoader
      color="#00000059"
      loading
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}