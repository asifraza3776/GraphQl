// components/SpaceXLaunches.js
import { useEffect, useState } from 'react';

const SpaceXLaunches = () => {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define your GraphQL query
    const query = `
      query {
        launchesPast(limit: 5) {
          mission_name
          launch_date_local
          launch_site {
            site_name_long
          }
        }
      }
    `;

    // Define your GraphQL API endpoint URL
    const apiUrl = 'https://api.spacex.land/graphql/';

    // Fetch data from the GraphQL API
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })
      .then((response) => response.json())
      .then((result) => {
        setLaunches(result.data.launchesPast);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Recent SpaceX Launches:</h2>
      <ul>
        {launches.map((launch) => (
          <li key={launch.mission_name}>
            <strong>Mission Name:</strong> {launch.mission_name}<br />
            <strong>Launch Date:</strong> {launch.launch_date_local}<br />
            <strong>Launch Site:</strong> {launch.launch_site.site_name_long}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpaceXLaunches;
