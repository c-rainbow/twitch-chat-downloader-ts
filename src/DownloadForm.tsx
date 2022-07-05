import { FormEvent } from 'react';

export default function DownloadForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
      <form className="download-form" onSubmit={handleSubmit}>
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
          <input type="submit" className="btn btn-primary" value="Download" />
        </div>
      </form>
  );
}
