import { memo, Fragment, useState } from "react";
import { SearchFormData } from "../../app/types";

interface SearchFormProps {
  handleSubmit: (data: SearchFormData) => void;
}

const SearchForm = ({ handleSubmit }: SearchFormProps) => {
  const [data, setData] = useState({ query: "" });

  return (
    <Fragment>
      <p>
        Search Pokemon by name:
        <input
          id="query"
          type="text"
          aria-label="query-input"
          aria-required="true"
          name="query"
          value={data.query}
          placeholder="bulbasaur, por ejemplo"
          onChange={(e) => setData({ query: e.target.value })}
        />
      </p>
      <button onClick={() => handleSubmit(data)} disabled={data.query.length === 0}>
        Search
      </button>
    </Fragment>
  );
};

export default memo(SearchForm);
