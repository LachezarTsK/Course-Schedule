
#include<vector>
using namespace std;

class Solution {
public:

    int scheduledCourses;
    vector<vector<int>> adjacencyList;
    vector<int> nodeStatus;
    const int NOT_VISITED = 0;
    const int VISITED = 1;
    const int ACYCLIC = 2;

    bool canFinish(int numCourses, vector<vector<int>>&prerequisites) {

        initialize_adjacencyList(numCourses, prerequisites);
        initialize_nodeStatus(numCourses);
        scheduledCourses = 0;

        for (int node = 0; node < numCourses; node++) {
            if (nodeStatus[node] == NOT_VISITED) {
                depthFirstSearch(node);
            }
        }

        return scheduledCourses == numCourses;
    }

    void depthFirstSearch(int node) {

        nodeStatus[node] = VISITED;
        vector<int> nextCourses = adjacencyList[node];

        for (auto& course : nextCourses) {
            if (nodeStatus[course] == NOT_VISITED) {
                depthFirstSearch(course);
            } else if (nodeStatus[course] == VISITED) {
                return;
            }
        }
        scheduledCourses++;
        nodeStatus[node] = ACYCLIC;
    }

    void initialize_nodeStatus(int numCourses) {
        for (int i = 0; i < numCourses; i++) {
            nodeStatus.push_back(NOT_VISITED);
        }
    }

    void initialize_adjacencyList(int numCourses, vector<vector<int>>&prerequisites) {

        size_t size = prerequisites.size();

        for (int i = 0; i < numCourses; i++) {
            vector<int> v;
            adjacencyList.push_back(v);
        }

        for (int i = 0; i < size; i++) {
            int from = prerequisites[i][1];
            int to = prerequisites[i][0];
            adjacencyList[from].push_back(to);
        }
    }
};
