import { sendTimeReport } from 'common/src/old-api/timer';

const timer = {
};

function getCurrentTime() {
  return Math.floor(new Date().getTime() / 1000)
}

function updateTimer(sendReport = false) {
  const exerciseID = this.getCurrentExerciseID();
  const { lastUpdate } = this.timer
  const currentTime = this.getCurrentTime()
  const spentTimeOneActivity = this.timer[exerciseID] || 0
  if (exerciseID !== -1)
    Object.assign(this.timer,
      {
        lastUpdate: currentTime,
        [exerciseID]: spentTimeOneActivity + (currentTime - lastUpdate)
      }
    )
  if (sendReport) {
    const { accessToken, role } = this.props
    const { activityType, id } = this.state
    const payload = {}
    payload.activityID = id
    payload.activityType = activityType
    payload.timer = []
    const timeOnActivities = { ...this.timer }
    delete timeOnActivities.lastUpdate

    for (let exercise_id in timeOnActivities)
      payload.timer.push({
        exercise_id: parseInt(exercise_id),
        seconds: timeOnActivities[exercise_id]
      })

    sendTimeReport({
      accessToken, role, timer: payload
    })

    this.timer = {
      lastUpdate: currentTime,
    }
  }
}

function startTracking() {
  this.timer = {
    lastUpdate: this.getCurrentTime(),
  }
  this.tracker = setInterval(
    () => this.updateTimer(),
    1000
  )
  this.stopTrackingOnUnload = this.stopTrackingOnUnload.bind(this)
  window.addEventListener("beforeunload", this.stopTrackingOnUnload);
}

function stopTrackingOnUnload() {
  this.stopTracking();
}

function stopTracking() {
  window.removeEventListener("beforeunload", this.stopTrackingOnUnload);
  clearInterval(this.tracker);
  this.updateTimer(true);
}

const Timer = {
  timer,
  getCurrentTime,
  updateTimer,
  startTracking,
  stopTracking,
  stopTrackingOnUnload,
}
export default Timer;