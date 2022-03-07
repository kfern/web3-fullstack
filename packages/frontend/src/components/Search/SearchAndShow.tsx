import { memo, Fragment, useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { setStatus } from "../../features/search/slice";
import { LocalStatus } from "../../app/types";

import { useGetPokemonByNameQuery } from "../../app/api";

interface FindAndShowProps {
  query: string;
}

const FindAndShow = ({ query }: FindAndShowProps) => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetPokemonByNameQuery(query);

  useEffect(() => {
    // errors are managed by other component
    error && dispatch(setStatus({ status: LocalStatus.SEARCH_ERROR, params: { error } }));
  }, [error, dispatch]);

  return (
    <Fragment>
      {isLoading && <p>Searching "{query}"...</p>}
      {data && (
        <>
          <h3>{data.species.name}</h3>
          <img src={data.sprites.front_shiny} alt={data.species.name} />
          <button
            onClick={() =>
              dispatch(
                setStatus({
                  status: LocalStatus.SEARCH_INIT,
                })
              )
            }
          >
            New search
          </button>
        </>
      )}
    </Fragment>
  );
};

export default memo(FindAndShow);
