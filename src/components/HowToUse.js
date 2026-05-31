import { Link } from "react-router-dom";
import { useInViewAnimation } from '../animation';

function HowToUse() {
  useInViewAnimation(".how_to_card");

  const homepageInfo = () => {
    return (
      <div className="how_to_card text-center m-5">
        <div className="p-4 row">
          <div className="col">
            <img src="/homepage.png" alt="" />
          </div>
          <div className="col">
            <h4 className="p-5">Homepage</h4>
            <p className="p-4">
              The homepage displays one goal and your daily tasks. The
              highlighted goal is your recommended focus for the day.
            </p>
            <p className="p-4">
              Each day, tasks reset so they can be completed again. One goal is
              selected for you and is intended to be your primary focus for the
              day.
            </p>
            <p className="p-4">Tasks repeat daily, goals do not.</p>
          </div>
        </div>
      </div>
    );
  };

  const taskInfo = () => {
    return (
      <div className="how_to_card text-center m-5">
        <div className="p-4 row">
          <div className="col">
            <h4 className="p-5">Task Info</h4>
            <p className="p-4">
              Tasks are recurring daily activities, such as brushing your teeth
              or exercising.
            </p>
            <p className="p-4">
              Tasks can be added, updated, or deleted from the corner menu.
            </p>
          </div>
          <div className="col">
            <img src="/task.png" alt="" />
          </div>
        </div>
      </div>
    );
  };

  const goalInfo = () => {
    return (
      <div className="how_to_card text-center m-5">
        <div className="p-4 row">
          <div className="col">
            <img src="/goal.png" alt="" />
          </div>
          <div className="col">
            <h4 className="p-5">Goal Info</h4>
            <p className="p-4">
              Goals are longer-term projects, responsibilities, or improvements
              that help you move forward. Each goal has a priority and can
              optionally include a due date.
            </p>
            <p className="p-4">
              The app uses this information to select one goal as your daily
              focus.
            </p>
            <p className="p-4">
              Due dates help the app identify which goals are becoming
              time-sensitive and should be prioritized sooner.
            </p>
            <p className="p-4">
              Goals can be added, updated, or deleted from the corner menu.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const completedInfo = () => {
    return (
      <div className="how_to_card text-center m-5">
        <div className="p-4 row">
          <div className="col">
            <h4 className="p-5">Completed Info</h4>
            <p className="p-4">
              Once completed, tasks and goals turn to a faded purple color and
              move to the end of the list.
            </p>
            <p className="p-4">
              Tasks reset the next day, and a new goal will be selected from
              your remaining goals.
            </p>
            <p className="p-4">
              The idea is to use this list as a structure for your day. Complete
              tasks as you go and focus on one meaningful goal at a time rather
              than juggling many competing priorities.
            </p>
          </div>
          <div className="col">
            <img src="/completed.png" alt="" />
          </div>
        </div>
      </div>
    );
  };

  const gettingStarted = () => {
    return (
      <div className="how_to_card how_to_card--primary text-center m-5">
        <div className="p-4">
          <h4 className="p-5">Getting Started (Recommended)</h4>
          <p className="p-4">
            Daily tasks are provided automatically, but can be customized if
            needed.
          </p>
          <p className="p-4">
            To get started, focus on adding a small number of goals that are
            important to you right now.
          </p>
          <p className="p-4">
            Avoid trying to plan everything at once. The app works best when it
            helps you focus on today's priorities rather than every project you
            may want to tackle in the future.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="text-center w-75 m-auto">
      <h1>How to Use</h1>

      <h4 className="p-2 pt-4">
        This app is designed to reduce cognitive load by helping you focus on
        daily tasks and one meaningful goal at a time.
      </h4>

      <div className="card-container p-3">
        {homepageInfo()}

        {taskInfo()}

        {goalInfo()}

        {completedInfo()}

        {gettingStarted()}
      </div>

      <div className="how_to_use_button_div w-50 m-auto p-3">
        <Link className="home_login_link" to="/">
          <button className="primary_button m-4">Home</button>
        </Link>
      </div>
    </div>
  );
}

export default HowToUse;
