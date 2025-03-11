import PropTypes from "prop-types";

function Error({ heading, paragraph, button }) {
  return (
    <main className="flex flex-col items-center dark:text-white">
      <h1 className="text-2xl">{heading}</h1>
      {paragraph && <p className="m-4">{paragraph}</p>}
      {button}
    </main>
  );
}

Error.propTypes = {
  heading: PropTypes.string,
  paragraph: PropTypes.string,
  button: PropTypes.any,
};

export default Error;
