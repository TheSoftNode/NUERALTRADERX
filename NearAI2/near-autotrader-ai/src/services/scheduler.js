class Scheduler {
  constructor() {
    this.tasks = {};
    console.log('Scheduler service initialized');
  }

  scheduleTask(taskId, callback, interval) {
    console.log(`Scheduling task: ${taskId} to run every ${interval}ms`);

    // Clear existing task if it exists
    if (this.tasks[taskId]) {
      this.clearTask(taskId);
    }

    // Schedule new task
    const intervalId = setInterval(callback, interval);
    this.tasks[taskId] = intervalId;

    console.log(`Task ${taskId} scheduled successfully`);
    return taskId;
  }

  clearTask(taskId) {
    if (this.tasks[taskId]) {
      console.log(`Clearing task: ${taskId}`);
      clearInterval(this.tasks[taskId]);
      delete this.tasks[taskId];
      return true;
    }
    console.log(`Task ${taskId} not found`);
    return false;
  }

  getActiveTaskIds() {
    return Object.keys(this.tasks);
  }
}

module.exports = new Scheduler();