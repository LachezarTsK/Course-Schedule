
import java.util.Set;
import java.util.HashSet;

public class Solution {

    int scheduledCourses;
    Set<Integer>[] adjacencyList;
    int[] nodeStatus;
    final int NOT_VISITED = 0;
    final int VISITED = 1;
    final int ACYCLIC = 2;

    public boolean canFinish(int numCourses, int[][] prerequisites) {

        initialize_adjacencyList(numCourses, prerequisites);
        nodeStatus = new int[numCourses];

        for (int node = 0; node < numCourses; node++) {
            if (nodeStatus[node] == NOT_VISITED) {
                depthFirstSearch(node);
            }
        }
        return scheduledCourses == numCourses;
    }

    public void depthFirstSearch(int node) {

        nodeStatus[node] = VISITED;
        Set<Integer> nextCourses = adjacencyList[node];

        for (int course : nextCourses) {
            if (nodeStatus[course] == NOT_VISITED) {
                depthFirstSearch(course);
            } else if (nodeStatus[course] == VISITED) {
                return;
            }
        }
        scheduledCourses++;
        nodeStatus[node] = ACYCLIC;
    }

    public void initialize_adjacencyList(int numCourses, int[][] prerequisites) {

        adjacencyList = new Set[numCourses];
        int size = prerequisites.length;

        for (int i = 0; i < numCourses; i++) {
            adjacencyList[i] = new HashSet<>();
        }

        for (int i = 0; i < size; i++) {
            int from = prerequisites[i][1];
            int to = prerequisites[i][0];
            adjacencyList[from].add(to);
        }
    }
}
