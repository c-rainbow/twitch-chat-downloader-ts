import { FormEvent } from 'react';

export default function DownloadForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className="download-form form-control flex items-center" onSubmit={handleSubmit}>
      <div className="w-60">
        <label className="label cursor-pointer">
          <span className="label-text">Text</span>
          <input
            type="radio"
            name="radio-6"
            className="radio checked:bg-red-500"
            checked
          />
        </label>
        <label className="label cursor-pointer">
          <span className="label-text">JSON</span>
          <input
            type="radio"
            name="radio-6"
            className="radio checked:bg-blue-500"
            checked
          />
        </label>
        <input type="submit" className="btn btn-primary mt-3" value="Download" />
      </div>
    </form>
  );
}
