
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
    const scheduleChecker = new CoursesScheduleChecker();
    return scheduleChecker.canScheduleCourses(numCourses, prerequisites);
};

class CoursesScheduleChecker {
    constructor() {
        this.scheduledCourses = 0;
        this.adjacencyList = [];
        this.nodeStatus = [];
        this.NOT_VISITED = 0;
        this.VISITED = 1;
        this.ACYCLIC = 2;
    }

    /**
     * @param {number} numCourses
     * @param {number[][]} prerequisites
     * @return {boolean}
     */
    canScheduleCourses(numCourses, prerequisites) {

        this.initialize_adjacencyList(numCourses, prerequisites);
        this.nodeStatus = new Array(numCourses).fill(0);

        for (let node = 0; node < numCourses; node++) {
            if (this.nodeStatus[node] === this.NOT_VISITED) {
                this.depthFirstSearch(node);
            }
        }
        return this.scheduledCourses === numCourses;
    }

    /**
     * @param {number} node
     */
    depthFirstSearch(node) {

        this.nodeStatus[node] = this.VISITED;
        let nextCourses = this.adjacencyList[node];

        for (let course of nextCourses) {
            if (this.nodeStatus[course] === this.NOT_VISITED) {
                this.depthFirstSearch(course);
            } else if (this.nodeStatus[course] === this.VISITED) {
                return;
            }
        }
        this.scheduledCourses++;
        this.nodeStatus[node] = this.ACYCLIC;
    }

    /**
     * @param {number} numCourses
     * @param {number[][]} prerequisites
     */
    initialize_adjacencyList(numCourses, prerequisites) {

        for (let i = 0; i < numCourses; i++) {
            this.adjacencyList[i] = new Set();
        }

        let size = prerequisites.length;
        for (let i = 0; i < size; i++) {
            let from = prerequisites[i][1];
            let to = prerequisites[i][0];
            this.adjacencyList[from].add(to);
        }
    }
}
