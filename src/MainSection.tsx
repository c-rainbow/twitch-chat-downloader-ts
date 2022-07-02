export default function MainSection() {
  return (
    <div className="hero bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Twitch VOD Chat Downloader</h1>
          <p className="py-6">Download chats from Twitch VOD</p>
          <form>
            <div className="form-control">
              <div className="input-group justify-center">
                <input
                  type="text"
                  placeholder="VOD ID here"
                  className="input input-bordered w-72"
                />
                <button className="btn btn-square">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>
          <form>
            <div className="m-3"></div>
            <div className="m-3">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Text</span>
                  <input
                    type="radio"
                    name="radio-6"
                    className="radio checked:bg-red-500"
                    checked
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">JSON</span>
                  <input
                    type="radio"
                    name="radio-6"
                    className="radio checked:bg-blue-500"
                    checked
                  />
                </label>
              </div>
            </div>
            <div className="m-3">
              <input
                type="submit"
                className="btn btn-primary"
                value="Download"
              />
            </div>
          </form>
          <progress
            className="progress progress-info w-80 h-4"
            value="40"
            max="100"
          ></progress>
          <div>Progress: 40% (0:25:08 of 3:00:22)</div>
        </div>
      </div>
    </div>
  );
}
