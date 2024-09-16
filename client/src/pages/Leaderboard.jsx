import React, { useState, useEffect } from 'react';
import { Table, Header } from 'semantic-ui-react';
import "../assets/styles.css";

const Leaderboard = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);

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
                leaderboardData.map((user, index) => (
                  <Table.Row key={user.username}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>${user.lifetimeEarnings.toLocaleString()}</Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table>
        </div>
      );
    };

    export default Leaderboard;