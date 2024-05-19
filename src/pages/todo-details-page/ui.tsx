import { Result, Row } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TaskCard, taskModel } from '../../entities/task';
import { ToggleTask } from '../../features/toggle-task';

export const TodoDetailsPage = observer(() => {
  const {
    store: { getTask, task, isLoading, taskError },
  } = taskModel;

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      getTask(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Row justify="center" align="middle">
      {taskError ? (
        <Result title={taskError} />
      ) : (
        <TaskCard
          title={`Task#${task?.id}`}
          text={task?.title || ''}
          loading={isLoading}
          actions={task ? [<ToggleTask todo={task} />] : undefined}
        />
      )}
    </Row>
  );
});
