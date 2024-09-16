import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/Queries.js';
import { Table, Header } from 'semantic-ui-react';
import "../assets/styles.css";

const Leaderboard = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const { loading, data } = useQuery(QUERY_USER);
    const getUser = data ?.getUser || {};

    return (
        <div>
          <img className='crown' src='/images/set/crown.png' alt='crown' />
          <Header as='h2' textAlign='center'>
            Top Earners
          </Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Rank</Table.HeaderCell>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>Lifetime Earnings</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
    
            <Table.Body>
              {leaderboardData.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan="3" textAlign='center'>
                    No data available
                  </Table.Cell>
                </Table.Row>
              ) : (
                leaderboardData.map((getUser, index) => (
                  <Table.Row key={getUser.username}>
                    <Table.Cell>{getUser + 1}</Table.Cell>
                    <Table.Cell>{getUser.username}</Table.Cell>
                    <Table.Cell>${getUser.currency.toLocaleString()}</Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table>
        </div>
      );
    };

    export default Leaderboard;