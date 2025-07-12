const Footer = () => {
  const handleSubscribtion = (e) => {
    e.preventDefault();
  };

  return (
    <footer className="footer bg-base-200 text-base-content p-10 flex flex-wrap justify-between items-start gap-10 border-t border-base-300 w-full">
      <nav className="min-w-[100px]">
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Chat</a>
        <a className="link link-hover">Video Call</a>
        <a className="link link-hover">Learning</a>
        <a className="link link-hover">AI Mock Test</a>
      </nav>

      <nav className="min-w-[100px]">
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>

      <nav className="min-w-[100px]">
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>

      <form className="w-full md:max-w-xs">
        <h6 className="footer-title">Newsletter</h6>
        <fieldset className="form-control w-full">
          <label className="label">
            <span className="label-text">Enter your email address</span>
          </label>
          <div className="join w-full">
            <input
              type="text"
              placeholder="username@site.com"
              className="input input-bordered join-item w-full"
            />
            <button
              onClick={handleSubscribtion}
              className="btn btn-primary join-item"
            >
              Subscribe
            </button>
          </div>
        </fieldset>
      </form>
    </footer>
  );
};

export default Footer;
