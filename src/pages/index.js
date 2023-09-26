// pages/index.js
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import client from '../../apolloClient'; // Adjust the import path based on your project structure

const GET_COMPANY_INFO = gql`
  query GetCompanyInfo {
    company {
      ceo
      founded
      launch_sites
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_COMPANY_INFO, { client });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { ceo, founded, launch_sites } = data.company;

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-100">
      <div className="bg-white p-8 rounded shadow-lg">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">Company Information</h1>
        <p className="mb-2">
          <strong className="text-indigo-600">CEO:</strong> {ceo}
        </p>
        <p className="mb-2">
          <strong className="text-indigo-600">Founded:</strong> {founded}
        </p>
        <p className="mb-2">
          <strong className="text-indigo-600">Launch Sites:</strong> {launch_sites}
        </p>
      </div>
    </div>
  );
}
