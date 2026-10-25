import { useEffect, useMemo, useState } from 'react';

import {
  Link,
  NavLink,
  Routes,
  Route,
  useParams,
  useLocation,
} from 'react-router-dom';

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const API = 'https://rickandmortyapi.com/api/character';

const COLORS = {
  Alive: '#98f1b5',
  Dead: '#ff9c9c',
  unknown: '#b9a5ff',
};

function Sidebar() {
  return (
    <aside className="sidebar">
      <h3>EXPLORE</h3>

      <nav>
        <NavLink to="/" end>
          ◫ Dashboard
        </NavLink>

        <Link to="/#insights">
          ◈ Data Insights
        </Link>

        <Link to="/#characters">
          ☷ Characters
        </Link>
      </nav>

      <div className="sidebar-info">
        <span className="live-dot" />
        LIVE API DATA

        <p>
          Explore characters, analyze their status,
          and discover their stories across the multiverse.
        </p>
      </div>
    </aside>
  );
}

function StatCard({ title, value, description }) {
  return (
    <article className="stat-card">
      <span>{title}</span>
      <strong>{value}</strong>
      <small>{description}</small>
    </article>
  );
}

function StatusBadge({ status }) {
  return (
    <span className={`status ${status.toLowerCase()}`}>
      ● {status}
    </span>
  );
}

function Charts({ characters, loading }) {
  const [chartView, setChartView] = useState('episodes');

  const statusData = useMemo(() => {
    return ['Alive', 'Dead', 'unknown'].map((status) => ({
      name: status,
      value: characters.filter(
        (character) => character.status === status
      ).length,
    })).filter((item) => item.value > 0);
  }, [characters]);

  const episodeData = useMemo(() => {
    return [...characters]
      .sort(
        (a, b) => b.episode.length - a.episode.length
      )
      .slice(0, 6)
      .map((character) => ({
        name: character.name,
        value: character.episode.length,
      }));
  }, [characters]);

  const speciesData = useMemo(() => {
    const counts = {};

    characters.forEach((character) => {
      counts[character.species] =
        (counts[character.species] || 0) + 1;
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, value]) => ({
        name,
        value,
      }));
  }, [characters]);

  const barData =
    chartView === 'episodes' ? episodeData : speciesData;

  const aliveCount = characters.filter(
    (character) => character.status === 'Alive'
  ).length;

  const alivePercentage = characters.length
    ? Math.round((aliveCount / characters.length) * 100)
    : 0;

  return (
    <section id="insights" className="insights-section">
      <p className="eyebrow">THE DATA STORY</p>
      <h2>Across the Multiverse</h2>

      <p className="section-description">
        Discover patterns in the characters matching your filters.
      </p>

      {loading ? (
        <div className="empty-state">
          Loading chart data...
        </div>
      ) : (
        <div className="charts-grid">
          <article className="chart-card">
            <p className="eyebrow">01 / SURVIVAL</p>
            <h3>Character Status</h3>

            {characters.length > 0 ? (
              <>
                <div className="chart-area">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={105}
                        paddingAngle={3}
                      >
                        {statusData.map((item) => (
                          <Cell
                            key={item.name}
                            fill={COLORS[item.name]}
                          />
                        ))}
                      </Pie>

                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="chart-legend">
                  {statusData.map((item) => (
                    <span key={item.name}>
                      <i
                        style={{
                          backgroundColor: COLORS[item.name],
                        }}
                      />
                      {item.name}: {item.value}
                    </span>
                  ))}
                </div>

                <p className="chart-note">
                  <strong>{alivePercentage}%</strong> of the
                  selected characters are alive.
                </p>
              </>
            ) : (
              <div className="empty-state">
                No matching data.
              </div>
            )}
          </article>

          <article className="chart-card">
            <p className="eyebrow">02 / DISCOVERY</p>

            <div className="chart-heading">
              <h3>
                {chartView === 'episodes'
                  ? 'Most Appearances'
                  : 'Species Distribution'}
              </h3>

              <div className="chart-toggle">
                <button
                  className={
                    chartView === 'episodes' ? 'active' : ''
                  }
                  onClick={() => setChartView('episodes')}
                >
                  Episodes
                </button>

                <button
                  className={
                    chartView === 'species' ? 'active' : ''
                  }
                  onClick={() => setChartView('species')}
                >
                  Species
                </button>
              </div>
            </div>

            {characters.length > 0 ? (
              <>
                <div className="chart-area">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={barData}
                      layout="vertical"
                      margin={{
                        top: 10,
                        right: 15,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#2d3c50"
                        horizontal={false}
                      />

                      <XAxis
                        type="number"
                        allowDecimals={false}
                        stroke="#8ca3bb"
                      />

                      <YAxis
                        dataKey="name"
                        type="category"
                        width={105}
                        stroke="#8ca3bb"
                        tick={{ fontSize: 11 }}
                      />

                      <Tooltip />

                      <Bar
                        dataKey="value"
                        fill="#98f1b5"
                        radius={[0, 6, 6, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <p className="chart-note">
                  {chartView === 'episodes'
                    ? 'Characters with the highest number of episode appearances.'
                    : 'Most frequently represented species in the selected data.'}
                </p>
              </>
            ) : (
              <div className="empty-state">
                No matching data.
              </div>
            )}
          </article>
        </div>
      )}
    </section>
  );
}

function Dashboard() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);

  const [search, setSearch] = useState('');
  const [species, setSpecies] = useState('All');
  const [status, setStatus] = useState('All');
  const [minEpisodes, setMinEpisodes] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCharacters() {
      setLoading(true);
      setError('');

      try {
        const requests = [1, 2, 3].map(async (page) => {
          const response = await fetch(
            `${API}?page=${page}`,
            { signal: controller.signal }
          );

          if (!response.ok) {
            throw new Error('Failed to fetch characters');
          }

          return response.json();
        });

        const pages = await Promise.all(requests);

        if (!controller.signal.aborted) {
          setCharacters(
            pages.flatMap((page) => page.results)
          );
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Unable to load characters.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchCharacters();

    return () => controller.abort();
  }, [retry]);

  const speciesOptions = useMemo(() => {
    return [
      ...new Set(
        characters.map((character) => character.species)
      ),
    ].sort();
  }, [characters]);

  const maxEpisodes = Math.max(
    0,
    ...characters.map(
      (character) => character.episode.length
    )
  );

  const filteredCharacters = useMemo(() => {
    return characters.filter((character) => {
      const matchName = character.name
        .toLowerCase()
        .includes(search.toLowerCase().trim());

      const matchSpecies =
        species === 'All' ||
        character.species === species;

      const matchStatus =
        status === 'All' ||
        character.status === status;

      const matchEpisodes =
        character.episode.length >= minEpisodes;

      return (
        matchName &&
        matchSpecies &&
        matchStatus &&
        matchEpisodes
      );
    });
  }, [characters, search, species, status, minEpisodes]);

  const aliveCount = characters.filter(
    (character) => character.status === 'Alive'
  ).length;

  const uniqueSpecies = new Set(
    characters.map((character) => character.species)
  ).size;

  const averageEpisodes = characters.length
    ? (
        characters.reduce(
          (sum, character) =>
            sum + character.episode.length,
          0
        ) / characters.length
      ).toFixed(1)
    : '0.0';

  function resetFilters() {
    setSearch('');
    setSpecies('All');
    setStatus('All');
    setMinEpisodes(0);
  }

  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">
            <span className="live-dot" />
            EXPLORING THE MULTIVERSE
          </p>

          <h1>
            Every universe.
            <br />
            <em>Every character.</em>
          </h1>

          <p>
            Explore characters from Rick and Morty,
            compare their fates, and discover their
            stories across the multiverse.
          </p>
        </div>

        <div className="portal">
          <span>R&amp;M</span>
        </div>
      </section>

      <section className="statistics">
        <StatCard
          title="Characters Loaded"
          value={characters.length}
          description="From three API pages"
        />

        <StatCard
          title="Alive Characters"
          value={aliveCount}
          description="In the loaded sample"
        />

        <StatCard
          title="Unique Species"
          value={uniqueSpecies}
          description="Species represented"
        />

        <StatCard
          title="Average Appearances"
          value={averageEpisodes}
          description="Episodes per character"
        />
      </section>

      <section id="characters" className="directory-section">
        <p className="eyebrow">
          THE CHARACTER DATABASE
        </p>

        <div className="section-heading">
          <div>
            <h2>Character Directory</h2>
            <p>
              Search, filter, and select a character
              to view more details.
            </p>
          </div>

          <span className="count-tag">
            {filteredCharacters.length} results
          </span>
        </div>

        <div className="filters">
          <label>
            Search by name

            <input
              type="search"
              placeholder="Rick, Morty, Summer..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </label>

          <label>
            Species

            <select
              value={species}
              onChange={(event) =>
                setSpecies(event.target.value)
              }
            >
              <option value="All">All species</option>

              {speciesOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label>
            Status

            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
            >
              <option value="All">All statuses</option>
              <option value="Alive">Alive</option>
              <option value="Dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>
          </label>

          <label>
            Minimum episodes: {minEpisodes}

            <input
              type="range"
              min="0"
              max={maxEpisodes}
              value={minEpisodes}
              onChange={(event) =>
                setMinEpisodes(Number(event.target.value))
              }
            />
          </label>

          <button
            type="button"
            className="reset-button"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </div>
      </section>

      <Charts
        characters={filteredCharacters}
        loading={loading}
      />

      <section className="character-list-section">
        <h2>Explore Characters</h2>

        <div className="data-panel">
          {loading ? (
            <div className="empty-state">
              Loading characters...
            </div>
          ) : error ? (
            <div className="empty-state">
              <p>{error}</p>

              <button onClick={() => setRetry((n) => n + 1)}>
                Retry
              </button>
            </div>
          ) : filteredCharacters.length === 0 ? (
            <div className="empty-state">
              <p>No characters match your filters.</p>

              <button onClick={resetFilters}>
                Clear Filters
              </button>
            </div>
          ) : (
            filteredCharacters.map((character) => (
              <Link
                key={character.id}
                to={`/character/${character.id}`}
                className="character-row"
              >
                <img
                  src={character.image}
                  alt={character.name}
                  loading="lazy"
                />

                <div className="character-info">
                  <h3>{character.name} ↗</h3>

                  <small>
                    #{character.id} · {character.gender}
                  </small>
                </div>

                <span className="species">
                  {character.species}
                </span>

                <StatusBadge status={character.status} />

                <span className="episodes">
                  {character.episode.length} episodes
                </span>

                <span className="location">
                  {character.origin.name}
                </span>
              </Link>
            ))
          )}
        </div>

        <p className="footnote">
          Dashboard statistics use the first three API pages,
          not the complete Rick and Morty database.
        </p>
      </section>
    </>
  );
}

function CharacterDetail() {
  const { id } = useParams();

  const [retry, setRetry] = useState(0);

  const [result, setResult] = useState({
    id: null,
    character: null,
    firstEpisode: null,
    lastEpisode: null,
    error: '',
  });

  useEffect(() => {
    const controller = new AbortController();

    async function fetchDetails() {
      try {
        const response = await fetch(`${API}/${id}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Character not found.');
        }

        const character = await response.json();

        const episodeURLs = [
          character.episode[0],
          character.episode.at(-1),
        ].filter(Boolean);

        const episodes = await Promise.all(
          episodeURLs.map(async (url) => {
            try {
              const res = await fetch(url, {
                signal: controller.signal,
              });

              return res.ok ? await res.json() : null;
            } catch (error) {
              if (error.name === 'AbortError') {
                throw error;
              }

              return null;
            }
          })
        );

        if (!controller.signal.aborted) {
          setResult({
            id,
            character,
            firstEpisode: episodes[0] || null,
            lastEpisode: episodes.at(-1) || null,
            error: '',
          });
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setResult({
            id,
            character: null,
            firstEpisode: null,
            lastEpisode: null,
            error: error.message,
          });
        }
      }
    }

    fetchDetails();

    return () => controller.abort();
  }, [id, retry]);

  if (result.id !== id) {
    return (
      <div className="empty-state">
        Loading character profile...
      </div>
    );
  }

  if (result.error) {
    return (
      <div className="empty-state">
        <h2>{result.error}</h2>

        <button
          onClick={() => {
            setResult((previous) => ({
              ...previous,
              id: null,
            }));

            setRetry((n) => n + 1);
          }}
        >
          Retry
        </button>

        <Link to="/">Back to Dashboard</Link>
      </div>
    );
  }

  const {
    character,
    firstEpisode,
    lastEpisode,
  } = result;

  return (
    <div className="detail-page">
      <Link to="/" className="back-link">
        ← Back to Dashboard
      </Link>

      <p className="eyebrow">
        CHARACTER ARCHIVE / #{character.id}
      </p>

      <section className="detail-hero">
        <img
          src={character.image}
          alt={character.name}
          className="detail-image"
        />

        <div>
          <StatusBadge status={character.status} />

          <h1>{character.name}</h1>

          <p>
            Explore this character's identity,
            origin, location, and episode history.
          </p>

          <div className="detail-tags">
            <span>{character.species}</span>
            <span>{character.gender}</span>
            <span>
              {character.episode.length} episodes
            </span>
          </div>
        </div>
      </section>

      <div className="detail-grid">
        <section className="detail-card">
          <p className="eyebrow">IDENTITY FILE</p>
          <h2>Character Details</h2>

          <div className="detail-item">
            <span>ID</span>
            <strong>{character.id}</strong>
          </div>

          <div className="detail-item">
            <span>Species</span>
            <strong>{character.species}</strong>
          </div>

          <div className="detail-item">
            <span>Type</span>
            <strong>
              {character.type || 'Not specified'}
            </strong>
          </div>

          <div className="detail-item">
            <span>Gender</span>
            <strong>{character.gender}</strong>
          </div>

          <div className="detail-item">
            <span>Origin</span>
            <strong>{character.origin.name}</strong>
          </div>

          <div className="detail-item">
            <span>Last Known Location</span>
            <strong>{character.location.name}</strong>
          </div>

          <div className="detail-item">
            <span>Added to API</span>
            <strong>
              {new Date(character.created).toLocaleDateString()}
            </strong>
          </div>
        </section>

        <section className="detail-card">
          <p className="eyebrow">EPISODE HISTORY</p>
          <h2>On-Screen Appearances</h2>

          <div className="episode-total">
            {character.episode.length}
          </div>

          <p>Listed episode appearances</p>

          <div className="episode-record">
            <span>FIRST APPEARANCE</span>

            <strong>
              {firstEpisode?.name || 'Not available'}
            </strong>

            <small>
              {firstEpisode?.episode || ''}
              {' · '}
              {firstEpisode?.air_date || ''}
            </small>
          </div>

          <div className="episode-record">
            <span>LATEST LISTED APPEARANCE</span>

            <strong>
              {lastEpisode?.name || 'Not available'}
            </strong>

            <small>
              {lastEpisode?.episode || ''}
              {' · '}
              {lastEpisode?.air_date || ''}
            </small>
          </div>
        </section>
      </div>
    </div>
  );
}

function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(
        hash.substring(1)
      );

      target?.scrollIntoView({
        behavior: 'smooth',
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <div className="app-shell">
      <ScrollHandler />

      <header className="topbar">
        <Link to="/" className="brand">
          <span className="brand-logo">✳</span>
          MULTIVERSE<span>EXPLORER</span>
        </Link>

        <span className="top-label">
          DATA DASHBOARD · PART 2
        </span>
      </header>

      <div className="app-layout">
        <Sidebar />

        <main>
          <Routes>
            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/character/:id"
              element={<CharacterDetail />}
            />

            <Route
              path="*"
              element={
                <div className="empty-state">
                  <h2>Page not found</h2>
                  <Link to="/">Return to Dashboard</Link>
                </div>
              }
            />
          </Routes>
        </main>
      </div>

      <footer>
        Multiverse Explorer · React + React Router + Recharts
        <br />

        Data provided by{' '}
        <a
          href="https://rickandmortyapi.com/"
          target="_blank"
          rel="noreferrer"
        >
          The Rick and Morty API
        </a>
      </footer>
    </div>
  );
}