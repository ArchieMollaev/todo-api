import React, { useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import getConfig from '../config';

const ToDoApiContext = React.createContext({});

export const ToDoApiProvider = (props) => {
  const { apiOrigin = 'http://localhost:3001' } = getConfig();
  const {
    getAccessTokenSilently,
  } = useAuth0();

  const getUserData = async () => {
    const token = await getAccessTokenSilently();

    const { data } = await axios.get(`${apiOrigin}/api/columns?_embed=tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  };

  const createColumn = async (title) => {
    const token = await getAccessTokenSilently();
    const { data } = await axios.post(`${apiOrigin}/api/columns`, { title }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  };

  const updateColumn = async (title) => {
    const token = await getAccessTokenSilently();
    const { data } = await axios.patch(`${apiOrigin}/api/columns`, { title }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  };

  const createTask = async ({
    title,
    description,
    columnId,
  }) => {
    const token = await getAccessTokenSilently();
    const { data } = await axios.post(`${apiOrigin}/api/tasks`, {
      title,
      description,
      columnId,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  };

  const updateTask = async ({
    title,
    description,
    columnId,
  }) => {
    const token = await getAccessTokenSilently();
    const { data } = await axios.patch(`${apiOrigin}/api/tasks`, {
      title,
      description,
      columnId,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  };

  const deleteTask = async (taskId) => {
    const token = await getAccessTokenSilently();
    const { data } = await axios.delete(`${apiOrigin}/api/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  };

  const deleteColumn = async (columnId) => {
    const token = await getAccessTokenSilently();
    const { data } = await axios.delete(`${apiOrigin}/api/columns/${columnId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  };

  return (
    <ToDoApiContext.Provider value={{
      getUserData,
      createColumn,
      updateColumn,
      deleteColumn,
      createTask,
      updateTask,
      deleteTask,
    }}
    >
      {props.children}
    </ToDoApiContext.Provider>
  );
};

export const useToDoApi = () => useContext(ToDoApiContext);
