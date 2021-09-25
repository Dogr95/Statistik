class Graph {
    points = []

    x = [];
    y = [];

    constructor(points) {
        this.points = points;

        for(const vector of points) {
            this.x.push(vector.x);
            this.y.push(vector.y)
        }
    }

    push(point) {
        this.points.push(point);
        this.x.push(point.x);
        this.y.push(point.y);
    }
}

module.exports = Graph;