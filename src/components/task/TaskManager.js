import { useTask } from "../../contexts/TaskContext";
import TaskCardAlt from "../task/TaskCardAlt";
import { Link } from 'react-router-dom';

function TaskManager() {
  const { tasks } = useTask();

  const taskMapper = () => {
    return tasks.map((mission, i) => 
      <TaskCardAlt key={i} task={mission} />
    );
  };

  return (
    <div className="text-center">
      <h1>Tasks</h1>
      <Link to='/tasks/add'><button className='button primary_button my-4'>Add Task</button></Link>
      <div className="collection_container row">{taskMapper()}</div>
    </div>
  );
}

export default TaskManager;
