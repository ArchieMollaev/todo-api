import React, { useState } from 'react';
import { Button, Input } from 'reactstrap';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../components/Loading';
import { useToDoApi } from '../utils/useToDoApi';
import syntaxHighlight from '../utils/syntaxHighlight';

export const ExternalApiComponent = () => {
  const [response, setResponse] = useState(null);
  const [columnNameInputValue, setColumnNameInputValue] = useState('');

  const [taskTitleInput, setTaskTitleInput] = useState('');
  const [taskDescriptionInput, setTaskDescriptionInput] = useState('');
  const [taskColumnIdInput, setTaskColumnIdInput] = useState('');

  const [taskIdToDelete, setTaskIdToDelete] = useState('');
  const [columnIdToDelete, setColumnIdToDelete] = useState('');

  const todoApi = useToDoApi();

  return (
    <>
      <div className="row mb-5">
        <div className="col mb-4">
          <Button
            color="primary"
            onClick={() => todoApi.getUserData().then(setResponse, setResponse)}
          >
            Get User Data
          </Button>
        </div>

        <div className="col mb-4">
          <Input
            value={columnNameInputValue}
            onChange={(e) => setColumnNameInputValue(e.target.value)}
            placeholder="New column name"
            className="mb-2"
          />
          <Button
            color="success"
            onClick={() => columnNameInputValue
              && todoApi.createColumn(columnNameInputValue).then(setResponse, setResponse)}
          >
            Create Column
          </Button>
        </div>

        <div className="col mb-4">
          <Input
            value={taskTitleInput}
            onChange={(e) => setTaskTitleInput(e.target.value)}
            placeholder="New task title"
            className="mb-2"
          />
          <Input
            value={taskDescriptionInput}
            onChange={(e) => setTaskDescriptionInput(e.target.value)}
            placeholder="New task description"
            className="mb-2"
          />
          <Input
            value={taskColumnIdInput}
            onChange={(e) => setTaskColumnIdInput(e.target.value)}
            placeholder="New column column id"
            className="mb-2"
          />
          <Button
            color="success"
            onClick={() => taskColumnIdInput
              && todoApi.createTask({
                title: taskTitleInput,
                description: taskDescriptionInput,
                columnId: taskColumnIdInput,
              }).then(setResponse, setResponse)}
          >
            Create Task
          </Button>
        </div>

        <div className="col mb-4">
          <Input
            value={taskIdToDelete}
            onChange={(e) => setTaskIdToDelete(e.target.value)}
            placeholder="Task ID"
            className="mb-2"
          />
          <Button
            color="danger"
            onClick={() => taskIdToDelete
              && todoApi.deleteTask(taskIdToDelete).then(setResponse, setResponse)}
          >
            Delete Task
          </Button>
        </div>

        <div className="col mb-4">
          <Input
            value={columnIdToDelete}
            onChange={(e) => setColumnIdToDelete(e.target.value)}
            placeholder="Column ID"
            className="mb-2"
          />
          <Button
            color="danger"
            onClick={() => columnIdToDelete
              && todoApi.deleteColumn(columnIdToDelete).then(setResponse, setResponse)}
          >
            Delete Column
          </Button>
        </div>

      </div>

      <div className="result-block-container">
        {response && (
          <div className="result-block">
            <h6 className="muted">Result</h6>
            <pre dangerouslySetInnerHTML={{
              __html: syntaxHighlight(JSON.stringify(response, null, 2)),
            }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default withAuthenticationRequired(ExternalApiComponent, {
  onRedirecting: () => <Loading />,
});
