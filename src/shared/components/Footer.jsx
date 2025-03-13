const TEAM_MAIL = "snapBug@gmail.com";

function Footer() {
  return (
    <footer className="w-full my-2 py-3 text-center text-sm text-white">
      <a href="https://github.com/snap-bug" target="_blank" className="text-sm">
        <h2 className="m-1 text-center text-sm">
          <p className="text-yellow-500">@snap-bug</p>
        </h2>
      </a>
      <h2 className="m-1 text-center text-sm text-slate-500">
        <a href={`mailto:${TEAM_MAIL}`} className="block">
          Please email to <b className="text-black">{TEAM_MAIL}</b>
        </a>
      </h2>
    </footer>
  );
}

export default Footer;
