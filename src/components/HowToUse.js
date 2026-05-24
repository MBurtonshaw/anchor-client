import { Link } from "react-router-dom";

function HowToUse() {
      const loginInfo = () => {
    return (
      <div className="card text-center m-5">
        <div className="p-4 row">
          <div className="col">
            <h4 className='p-5'>Login</h4>
            <p className='p-4'>The first step in using this app is to login. If you don't have an account already, click the "register" button and create one.</p>
            <p className='p-4'>An account is necessary to save your personalized to-do list and goals.</p>
            <p className='p-4'>Once logged in, you'll be redirected to the homepage.</p>
          </div>
          <div className="col">
            <img src="/login.png" alt="" />
          </div>
        </div>
      </div>
    );
  };

  const homepageInfo = () => {
    return (
      <div className="card text-center m-5">
        <div className="p-4 row">
          <div className="col">
            <img src="/homepage.png" alt="" />
          </div>
          <div className="col">
            <h4 className='p-5'>Homepage</h4>
            <p className='p-4'>On the homepage, you'll see a list of tasks and one goal. The goal will be first, it's the shaded box, and the tasks are the rest of the list.</p>
            <p className='p-4'>Each day tasks will reset so you can complete them again. Soon, there will also be one goal to complete per day that does not repeat.</p>
            <p className='p-4'>Tasks repeat, goals do not.</p>
          </div>
        </div>
      </div>
    );
  };

  const taskInfo = () => {
    return (
      <div className="card text-center m-5">
        <div className="p-4 row">
          <div className="col">
            <h4 className='p-5'>Task Info</h4>
            <p className='p-4'>Tasks are the things that you do daily, like brushing your teeth or exercising.</p>
            <p className='p-4'>Tasks can be updated to suit what your day actually looks like, and new tasks can be added or old tasks deleted.</p>
            <p className='p-4'>This can all be accessed in the corner menu icon.</p>
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
      <div className="card text-center m-5">
        <div className="p-4 row">
          <div className="col">
            <img src="/goal.png" alt="" />
          </div>
          <div className="col">
            <h4 className='p-5'>Goal Info</h4>
            <p className='p-4'>Goals are added by you and must have a title and priority number. Goals are returned by importance based on a calculated score.</p>
            <p className='p-4'>Goals can be added, updated, and deleted just like tasks can - but will not be added automatically like tasks are.</p>
            <p className='p-4'>This is also accessed in the corner menu icon.</p>
          </div>
        </div>
      </div>
    );
  };

  const completedInfo = () => {
    return (
      <div className="card text-center m-5">
        <div className="p-4 row">
          <div className="col">
            <h4 className='p-5'>Completed Info</h4>
            <p className='p-4'>Once completed, tasks and goals turn to a faded purple color and move to the end of the list.</p>
            <p className='p-4'>Tasks will reset the next day, and a new goal will be returned as long as there is a list of goals that have been added.</p>
            <p className='p-4'>The idea is to use this list as a structure for your day. Mark tasks complete as you go, and focus on one goal to mark complete per day.</p>
          </div>
          <div className="col">
            <img src="/completed.png" alt="" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="text-center w-75 m-auto">
      <h1>How to Use</h1>

      <h4 className='p-2 pt-4'>This app is designed to reduce cognitive load by helping you focus on recurring daily tasks and one important long-term goal at a time.</h4>

      <div className="card-container p-3">
        {loginInfo()}

        {homepageInfo()}

        {taskInfo()}

        {goalInfo()}

        {completedInfo()}
      </div>

      <div className="how_to_use_button_div w-50 m-auto p-3">
        <Link className="home_login_link" to="/login">
          <button className="primary_button m-4">Login</button>
        </Link>
        <Link className="home_login_link" to="/">
          <button className="secondary_button m-4">Home</button>
        </Link>
      </div>
    </div>
  );
}

export default HowToUse;
