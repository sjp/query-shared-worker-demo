import { Typography, Link } from "@mui/material";
import { useParams, Link as RouterLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetch, { type Character as CharacterData, type Episode as EpisodeData } from "./fetch";

function Episode() {
  const { episodeId } = useParams();
  const { data, status } = useQuery({
    queryKey: ["episode", episodeId],
    queryFn: () => fetch<EpisodeData>(`https://rickandmortyapi.com/api/episode/${episodeId}`),
  });

  if (status === "pending") return <p>Loading...</p>;
  if (status === "error") return <p>Error :(</p>;

  return (
    <div>
      <Typography variant="h2">{data.name}</Typography>
      <Typography variant="body1">{data.air_date}</Typography>
      <br />
      <Typography variant="h4">Characters</Typography>
      {data.characters.map((character) => {
        const characterUrlParts = character.split("/").filter(Boolean);
        const characterId = characterUrlParts[characterUrlParts.length - 1];
        return <Character id={characterId} key={characterId} />;
      })}
    </div>
  );
}

function Character({ id }: { id: string }) {
  const { data, status } = useQuery({
    queryKey: ["character", id],
    queryFn: () => fetch<CharacterData>(`https://rickandmortyapi.com/api/character/${id}`),
  });

  if (status === "pending") return <p>Loading...</p>;
  if (status === "error") return <p>Error :(</p>;

  return (
    <article key={id}>
      <Link component={RouterLink} to={`/characters/${id}`}>
        <Typography variant="h6">{data.name}</Typography>
      </Link>
    </article>
  );
}

export default Episode;
